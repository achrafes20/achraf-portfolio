import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../LanguageContext.jsx";
import { profile, sectionIds } from "../data/portfolio.js";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div>
        <h2>{profile.name}</h2>
        <p>{t.footer.description}</p>
        <div className="footer-socials">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={20} aria-hidden="true" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} aria-hidden="true" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail size={20} aria-hidden="true" />
          </a>
        </div>
      </div>
      <nav aria-label={t.ui.footerNavigation}>
        <h3>{t.footer.navigation}</h3>
        {sectionIds.map((id) => (
          <a href={`#${id}`} key={id}>
            {t.nav[id]}
          </a>
        ))}
      </nav>
      <p className="footer-bottom">
        © {CURRENT_YEAR} {profile.name}. {t.footer.rights}
      </p>
    </footer>
  );
}
