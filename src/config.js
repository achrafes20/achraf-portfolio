// Configuration publique du site. Aucune valeur ici n'est secrète :
// la clé Supabase « publishable » est conçue pour être exposée côté navigateur.
// Les valeurs peuvent être surchargées via des variables d'environnement Vite (voir .env.example).

const env = import.meta.env;

export const CONFIG = {
  siteUrl: "https://esserrar-achraf.vercel.app",
  cv: {
    fr: { href: "/ES-SERRAR-ACHRAF-CV.pdf", fileName: "ES-SERRAR-ACHRAF-CV.pdf" },
    en: { href: "/ES-SERRAR-ACHRAF-CV-ENG.pdf", fileName: "ES-SERRAR-ACHRAF-CV-ENG.pdf" },
  },
  supabase: {
    url: env.VITE_SUPABASE_URL || "https://rsvwqhimmjzzpwyivllj.supabase.co",
    anonKey: env.VITE_SUPABASE_ANON_KEY || "sb_publishable_LVwnRIngVC1kxFsAkuHmAQ__-M9Dc89",
    contactFunction: "send-contact-email",
  },
  // Clé de site Cloudflare Turnstile (anti-robot). Laisser vide pour désactiver le widget.
  turnstileSiteKey: env.VITE_TURNSTILE_SITE_KEY || "",
};
