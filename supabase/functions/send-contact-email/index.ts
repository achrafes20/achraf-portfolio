const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
  });

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );

const normalize = (value: unknown) => (typeof value === "string" ? value.trim() : "");

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Méthode non autorisée." }, 405);
  }

  try {
    const payload = await request.json();
    const name = normalize(payload.name);
    const email = normalize(payload.email);
    const subject = normalize(payload.subject);
    const message = normalize(payload.message);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validationErrors = [];

    if (name.length < 2 || name.length > 100) {
      validationErrors.push("Le nom doit contenir entre 2 et 100 caractères.");
    }
    if (email.length > 254 || !emailPattern.test(email)) {
      validationErrors.push("L’adresse email n’est pas valide.");
    }
    if (subject.length < 2 || subject.length > 160) {
      validationErrors.push("Le sujet doit contenir entre 2 et 160 caractères.");
    }
    if (message.length < 5 || message.length > 5000) {
      validationErrors.push("Le message doit contenir entre 5 et 5000 caractères.");
    }

    if (validationErrors.length > 0) {
      return jsonResponse({ error: validationErrors.join(" ") }, 400);
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    const recipient = Deno.env.get("CONTACT_TO_EMAIL") ?? "esserrar.achraf@gmail.com";
    const sender = Deno.env.get("CONTACT_FROM_EMAIL");

    if (!apiKey || !sender) {
      console.error("RESEND_API_KEY or CONTACT_FROM_EMAIL is not configured.");
      return jsonResponse({ error: "Le service d’email n’est pas configuré." }, 503);
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const receivedAt = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Africa/Casablanca",
    }).format(new Date());

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
                  <p style="margin:0"><strong>Sujet :</strong> ${safeSubject}</p>
                </div>
                <div style="font-size:13px;font-weight:700;letter-spacing:.7px;text-transform:uppercase;color:#64748b">Message</div>
                <div style="margin-top:10px;padding:20px;border-left:4px solid #f97316;background:#fff7ed;border-radius:0 10px 10px 0;font-size:16px;line-height:1.7;color:#334155">${safeMessage}</div>
                <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: ${subject}`)}" style="display:inline-block;margin-top:24px;padding:12px 20px;background:#0d9488;border-radius:9px;color:#ffffff;text-decoration:none;font-weight:700">Répondre à ${safeName}</a>
              </div>
              <div style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b">Reçu le ${receivedAt} depuis achraf-portfolio.</div>
            </div>
          </div>
        </body>
      </html>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html,
        text: `Nouveau message depuis le portfolio\n\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\n${message}\n\nReçu le ${receivedAt}`,
      }),
    });

    if (!resendResponse.ok) {
      const providerErrorText = await resendResponse.text();
      let providerMessage = `Erreur Resend ${resendResponse.status}`;
      let providerCode = "resend_error";

      try {
        const providerError = JSON.parse(providerErrorText);
        providerMessage = normalize(providerError.message) || providerMessage;
        providerCode = normalize(providerError.name) || providerCode;
      } catch {
        // Resend répond normalement en JSON. On conserve un message neutre sinon.
      }

      console.error("Resend rejected the email:", providerErrorText);
      return jsonResponse(
        {
          error: "L’email n’a pas pu être envoyé.",
          providerCode,
          providerMessage,
        },
        502,
      );
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Unexpected contact email error:", error);
    return jsonResponse({ error: "Erreur interne du service d’email." }, 500);
  }
});
