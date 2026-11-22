// Fonction Edge « send-contact-email »
//
// Seul point d'entrée du formulaire de contact. Dans l'ordre :
//   1. CORS restreint aux origines autorisées (ALLOWED_ORIGINS) ;
//   2. taille de requête limitée, champ piège à robots (honeypot) ;
//   3. validation stricte des champs ;
//   4. vérification Cloudflare Turnstile (si TURNSTILE_SECRET_KEY est défini) ;
//   5. limite de fréquence par IP (hachée) et plafond global journalier ;
//   6. enregistrement en base avec la clé service (la table n'est plus accessible au public) ;
//   7. envoi de l'email via Resend, puis mise à jour du statut d'envoi.
//
// Le client ne reçoit que des codes d'erreur neutres ; le détail reste dans les logs.

import { createClient } from "npm:@supabase/supabase-js@2.49.4";

type ErrorCode =
  | "validation_error"
  | "rate_limited"
  | "captcha_failed"
  | "origin_not_allowed"
  | "email_failed"
  | "payload_too_large"
  | "method_not_allowed"
  | "server_error";

const DEFAULT_ALLOWED_ORIGINS = [
  "https://esserrar-achraf.vercel.app",
  "http://localhost:5173",
  "http://localhost:4173",
];
const MAX_BODY_BYTES = 16_000;
const RATE_LIMIT_PER_IP = Number(Deno.env.get("RATE_LIMIT_PER_IP") ?? 5);
const RATE_LIMIT_WINDOW_MINUTES = Number(Deno.env.get("RATE_LIMIT_WINDOW_MINUTES") ?? 60);
const GLOBAL_DAILY_LIMIT = Number(Deno.env.get("GLOBAL_DAILY_LIMIT") ?? 50);
const TABLE = "contact_messages";

const allowedOrigins = (Deno.env.get("ALLOWED_ORIGINS") ?? DEFAULT_ALLOWED_ORIGINS.join(","))
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

// Autorise aussi les URL de prévisualisation Vercel du projet (esserrar-achraf-*.vercel.app).
const isAllowedOrigin = (origin: string | null) =>
  !!origin &&
  (allowedOrigins.includes(origin) || /^https:\/\/esserrar-achraf(-[a-z0-9-]+)?\.vercel\.app$/.test(origin));

const corsHeaders = (origin: string | null): Record<string, string> => ({
  "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin! : allowedOrigins[0],
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
  Vary: "Origin",
});

const json = (origin: string | null, body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json; charset=utf-8" },
  });

const fail = (origin: string | null, code: ErrorCode, status: number) => json(origin, { error: code, code }, status);

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character,
  );

const normalize = (value: unknown) => (typeof value === "string" ? value.trim() : "");
// Les champs sur une ligne ne doivent pas contenir de retours à la ligne (en-têtes d'email).
const singleLine = (value: string) => value.replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ");

const getClientIp = (request: Request) =>
  request.headers.get("cf-connecting-ip") ??
  request.headers.get("x-real-ip") ??
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
  "unknown";

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function verifyTurnstile(secret: string, token: string, ip: string) {
  if (!token) return false;
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip !== "unknown") body.append("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  if (!response.ok) return false;
  const result = await response.json();
  return result.success === true;
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    return new Response("ok", { status: isAllowedOrigin(origin) ? 200 : 403, headers: corsHeaders(origin) });
  }
  if (request.method !== "POST") return fail(origin, "method_not_allowed", 405);
  if (!isAllowedOrigin(origin)) {
    console.warn("Origine refusée :", origin);
    return fail(origin, "origin_not_allowed", 403);
  }

  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) return fail(origin, "payload_too_large", 413);

    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return fail(origin, "validation_error", 400);
    }

    // Honeypot rempli : on répond « succès » sans rien faire, pour ne pas renseigner le robot.
    if (normalize(payload.website)) {
      console.warn("Honeypot déclenché, message ignoré.");
      return json(origin, { success: true });
    }

    const name = singleLine(normalize(payload.name));
    const email = normalize(payload.email);
    const subject = singleLine(normalize(payload.subject));
    const message = normalize(payload.message);
    const lang = payload.lang === "en" ? "en" : "fr";
    const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;

    const isValid =
      name.length >= 2 && name.length <= 100 &&
      email.length <= 254 && emailPattern.test(email) &&
      subject.length >= 2 && subject.length <= 160 &&
      message.length >= 5 && message.length <= 5000;
    if (!isValid) return fail(origin, "validation_error", 400);

    const ip = getClientIp(request);

    const turnstileSecret = Deno.env.get("TURNSTILE_SECRET_KEY");
    if (turnstileSecret) {
      const human = await verifyTurnstile(turnstileSecret, normalize(payload.captchaToken), ip);
      if (!human) return fail(origin, "captcha_failed", 403);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const sender = Deno.env.get("CONTACT_FROM_EMAIL");
    const recipient = Deno.env.get("CONTACT_TO_EMAIL") ?? "esserrar.achraf@gmail.com";

    if (!supabaseUrl || !serviceKey || !resendKey || !sender) {
      console.error("Configuration incomplète : SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY ou CONTACT_FROM_EMAIL manquant.");
      return fail(origin, "server_error", 503);
    }

    const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
    // Le sel empêche de retrouver une IP à partir de son empreinte.
    const ipHash = await sha256(`${Deno.env.get("IP_HASH_SALT") ?? serviceKey}:${ip}`);

    // Limite de fréquence par IP.
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60_000).toISOString();
    const { count: ipCount, error: ipCountError } = await supabase
      .from(TABLE)
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", windowStart);
    if (ipCountError) throw ipCountError;
    if ((ipCount ?? 0) >= RATE_LIMIT_PER_IP) return fail(origin, "rate_limited", 429);

    // Plafond global : protège la boîte mail et le quota Resend contre un flood multi-IP.
    const dayStart = new Date(Date.now() - 24 * 60 * 60_000).toISOString();
    const { count: dailyCount, error: dailyCountError } = await supabase
      .from(TABLE)
      .select("id", { count: "exact", head: true })
      .gte("created_at", dayStart);
    if (dailyCountError) throw dailyCountError;
    if ((dailyCount ?? 0) >= GLOBAL_DAILY_LIMIT) return fail(origin, "rate_limited", 429);

    const { data: saved, error: insertError } = await supabase
      .from(TABLE)
      .insert({ name, email, subject, message, lang, source: "react_portfolio", ip_hash: ipHash })
      .select("id")
      .single();
    if (insertError) throw insertError;

    const receivedAt = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Africa/Casablanca",
    }).format(new Date());

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;

    const html = `
      <!doctype html>
      <html lang="fr">
        <body style="margin:0;background:#f1f5f9;font-family:Inter,Arial,sans-serif;color:#0f172a">
          <div style="padding:32px 16px">
            <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 12px 35px rgba(15,23,42,.08)">
              <div style="padding:28px 32px;background:linear-gradient(135deg,#0d9488,#0f766e)">
                <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#ccfbf1">Portfolio Achraf Es-serrar</div>
                <h1 style="margin:8px 0 0;font-size:25px;line-height:1.25;color:#ffffff">Nouveau message de contact</h1>
              </div>
              <div style="padding:30px 32px">
                <div style="margin-bottom:24px;padding:18px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px">
                  <p style="margin:0 0 10px"><strong>Nom :</strong> ${safeName}</p>
                  <p style="margin:0 0 10px"><strong>Email :</strong> <a href="mailto:${safeEmail}" style="color:#0d9488">${safeEmail}</a></p>
                  <p style="margin:0 0 10px"><strong>Sujet :</strong> ${safeSubject}</p>
                  <p style="margin:0"><strong>Langue du site :</strong> ${lang.toUpperCase()}</p>
                </div>
                <div style="font-size:13px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:#64748b">Message</div>
                <div style="margin-top:10px;padding:20px;border-left:4px solid #f97316;background:#fff7ed;border-radius:0 10px 10px 0;font-size:16px;line-height:1.7;color:#334155">${safeMessage}</div>
                <a href="${escapeHtml(replyHref)}" style="display:inline-block;margin-top:24px;padding:12px 20px;background:#0d9488;border-radius:9px;color:#ffffff;text-decoration:none;font-weight:700">Répondre à ${safeName}</a>
              </div>
              <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b">Reçu le ${receivedAt} depuis le portfolio (message n° ${saved.id}).</div>
            </div>
          </div>
        </body>
      </html>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html,
        text: `Nouveau message depuis le portfolio\n\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\nLangue: ${lang}\n\n${message}\n\nReçu le ${receivedAt}`,
      }),
    });

    const emailSent = resendResponse.ok;
    if (!emailSent) console.error("Resend a refusé l'email :", resendResponse.status, await resendResponse.text());

    const { error: updateError } = await supabase
      .from(TABLE)
      .update({ email_status: emailSent ? "sent" : "failed" })
      .eq("id", saved.id);
    if (updateError) console.error("Mise à jour du statut impossible :", updateError);

    // Le message est enregistré dans tous les cas : on le signale au visiteur.
    return emailSent ? json(origin, { success: true }) : fail(origin, "email_failed", 502);
  } catch (error) {
    console.error("Erreur inattendue du formulaire de contact :", error);
    return fail(origin, "server_error", 500);
  }
});
