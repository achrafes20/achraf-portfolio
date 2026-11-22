import { useEffect } from "react";

const setMeta = (selector, content) => {
  document.querySelector(selector)?.setAttribute("content", content);
};

// Met à jour le titre, la description et la langue Open Graph selon la langue active.
export function useDocumentMeta({ lang, title, description }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[property="og:locale"]', lang === "en" ? "en_US" : "fr_FR");
    setMeta('meta[property="og:locale:alternate"]', lang === "en" ? "fr_FR" : "en_US");
  }, [lang, title, description]);
}
