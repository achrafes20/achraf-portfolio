import { useEffect, useState } from "react";
import { readStorage, writeStorage } from "../lib/storage.js";

export const THEME_STORAGE_KEY = "theme";

// Le script inline de index.html applique déjà le thème sur <html> avant le
// premier rendu (pas de flash blanc). On repart de cette valeur.
const getInitialTheme = () => {
  const applied = document.documentElement.dataset.theme;
  if (applied === "dark" || applied === "light") return applied;
  const saved = readStorage(THEME_STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#090d11" : "#f7fafc",
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      // On ne mémorise que les choix explicites : sinon le site suit le système.
      writeStorage(THEME_STORAGE_KEY, next);
      return next;
    });
  };

  return { theme, toggleTheme };
}
