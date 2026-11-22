import { useState } from "react";
import { CONFIG } from "../config.js";

const ERROR_CODES = new Set([
  "validation_error",
  "rate_limited",
  "captcha_failed",
  "origin_not_allowed",
  "email_failed",
  "payload_too_large",
  "server_error",
]);

// Envoie le formulaire à la fonction Edge Supabase, qui valide, applique
// l'anti-spam (captcha + limite de fréquence), enregistre le message puis l'envoie par email.
export function useContactForm({ t, lang, notify }) {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaResetKey, setCaptchaResetKey] = useState(0);

  const text = t.contact.form;
  const captchaEnabled = Boolean(CONFIG.turnstileSiteKey);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (captchaEnabled && !captchaToken) {
      setStatus({ type: "error", message: text.errors.captcha_required });
      return;
    }

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
      lang,
      captchaToken,
    };

    setIsSending(true);
    setStatus({ type: "info", message: text.sendingStatus });

    try {
      const response = await fetch(
        `${CONFIG.supabase.url}/functions/v1/${CONFIG.supabase.contactFunction}`,
        {
          method: "POST",
          headers: {
            apikey: CONFIG.supabase.anonKey,
            Authorization: `Bearer ${CONFIG.supabase.anonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const code = ERROR_CODES.has(body?.code) ? body.code : "server_error";
        throw Object.assign(new Error(code), { code });
      }

      form.reset();
      setStatus({ type: "success", message: text.success });
      notify(text.successToast, "success");
    } catch (error) {
      const code = error?.code || "network_error";
      setStatus({ type: "error", message: text.errors[code] || text.errors.server_error });
      notify(text.errorToast, "error");
    } finally {
      setIsSending(false);
      // Un jeton Turnstile n'est valable qu'une fois : on en redemande un.
      setCaptchaToken("");
      setCaptchaResetKey((key) => key + 1);
    }
  };

  return {
    status,
    isSending,
    handleSubmit,
    captchaEnabled,
    setCaptchaToken,
    captchaResetKey,
  };
}
