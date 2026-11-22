import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise = null;

const loadTurnstile = () => {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.turnstile);
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Turnstile indisponible"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
};

// Widget anti-robot Cloudflare Turnstile (gratuit, sans traçage publicitaire).
// Affiché uniquement si VITE_TURNSTILE_SITE_KEY est défini.
export default function Turnstile({ siteKey, lang, theme, onToken, resetKey }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onTokenRef = useRef(onToken);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          language: lang,
          theme,
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(""),
          "error-callback": () => onTokenRef.current(""),
        });
      })
      .catch(() => onTokenRef.current(""));

    return () => {
      cancelled = true;
      if (widgetIdRef.current !== null) window.turnstile?.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [siteKey, lang, theme]);

  useEffect(() => {
    if (resetKey > 0 && widgetIdRef.current !== null) window.turnstile?.reset(widgetIdRef.current);
  }, [resetKey]);

  return <div className="turnstile-box" ref={containerRef} />;
}
