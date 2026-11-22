import { useEffect } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useLanguage } from "../LanguageContext.jsx";
import { useActiveSection } from "../hooks/useActiveSection.js";
import { profile, sectionIds } from "../data/portfolio.js";

const NAV_ID = "primary-navigation";

export default function NavBar({ theme, onToggleTheme, menuOpen, setMenuOpen }) {
  const { t, toggleLanguage, lang } = useLanguage();
  const activeId = useActiveSection(sectionIds);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, setMenuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-nav">
      <a className="brand" href="#home" onClick={closeMenu}>
        <img
          src={isDark ? "/logo_claire.png" : "/logo_sombre.png"}
          alt={t.ui.logoAlt}
          width="42"
          height="42"
        />
        <span>{profile.name}</span>
      </a>

      <nav
        id={NAV_ID}
        className={menuOpen ? "nav-links open" : "nav-links"}
        aria-label={t.ui.mainNavigation}
      >
        {sectionIds.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeId === id ? "active" : undefined}
            aria-current={activeId === id ? "location" : undefined}
            onClick={closeMenu}
          >
            {t.nav[id]}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <button
          className="icon-btn"
          type="button"
          aria-label={isDark ? t.ui.changeThemeToLight : t.ui.changeThemeToDark}
          onClick={onToggleTheme}
        >
          {isDark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
        </button>
        <button
          className="language-toggle"
          type="button"
          aria-label={t.ui.switchLanguage}
          lang={lang === "fr" ? "en" : "fr"}
          onClick={toggleLanguage}
        >
          {lang === "fr" ? "EN" : "FR"}
        </button>
        <button
          className="icon-btn menu-btn"
          type="button"
          aria-label={menuOpen ? t.ui.closeMenu : t.ui.menu}
          aria-expanded={menuOpen}
          aria-controls={NAV_ID}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
