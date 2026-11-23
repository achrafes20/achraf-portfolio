import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Download, FileText } from "lucide-react";
import { useLanguage } from "../LanguageContext.jsx";
import { CONFIG } from "../config.js";

// Bouton « Télécharger mon CV » qui propose la version française ou anglaise avant le téléchargement.
// Accessible : aria-expanded, Échap et clic extérieur pour fermer, flèches pour naviguer.
// placement="top" ouvre le menu au-dessus du bouton (utile en bas de page).
export default function CvDownloadMenu({ label, onDownload, className = "btn secondary", placement = "bottom" }) {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const menuId = useId();

  // La version de la langue affichée est proposée en premier.
  const options = (lang === "en" ? ["en", "fr"] : ["fr", "en"]).map((key) => ({
    key,
    ...CONFIG.cv[key],
    label: t.ui.cvVersions[key],
  }));

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    // Le focus va sur la première option à l'ouverture.
    wrapperRef.current?.querySelector('[role="menuitem"]')?.focus();
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleMenuKeyDown = (event) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const items = [...wrapperRef.current.querySelectorAll('[role="menuitem"]')];
    const index = items.indexOf(document.activeElement);
    const next = event.key === "ArrowDown" ? (index + 1) % items.length : (index - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  return (
    <div className="cv-menu" ref={wrapperRef}>
      <button
        ref={buttonRef}
        type="button"
        className={className}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <Download size={18} aria-hidden="true" />
        {label}
        <ChevronDown size={16} aria-hidden="true" className={open ? "cv-menu-chevron open" : "cv-menu-chevron"} />
      </button>

      {open && (
        <ul className={placement === "top" ? "cv-menu-list up" : "cv-menu-list"} id={menuId} role="menu" aria-label={t.ui.cvMenuLabel} onKeyDown={handleMenuKeyDown}>
          {options.map((option) => (
            <li key={option.key} role="none">
              <a
                role="menuitem"
                href={option.href}
                download={option.fileName}
                hrefLang={option.key}
                onClick={() => {
                  setOpen(false);
                  onDownload?.();
                }}
              >
                <FileText size={18} aria-hidden="true" />
                <span>{option.label}</span>
                <small>PDF</small>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
