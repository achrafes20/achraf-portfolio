import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./translations.js";
import { readStorage, writeStorage } from "./lib/storage.js";

const LANGUAGE_STORAGE_KEY = "portfolio-lang";
const LanguageContext = createContext(null);

// Ordre de priorité : choix mémorisé, puis langue du navigateur, puis français.
const getInitialLanguage = () => {
  const saved = readStorage(LANGUAGE_STORAGE_KEY);
  if (saved === "en" || saved === "fr") return saved;
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      t: translations[lang],
      toggleLanguage: () =>
        setLang((current) => {
          const next = current === "fr" ? "en" : "fr";
          writeStorage(LANGUAGE_STORAGE_KEY, next);
          return next;
        }),
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
