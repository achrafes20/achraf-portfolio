import { Code2 } from "lucide-react";
import CvDownloadMenu from "../components/CvDownloadMenu.jsx";
import HexGrid, { TECHNOLOGIES_COUNT } from "../components/HexGrid.jsx";
import { useLanguage } from "../LanguageContext.jsx";
import { PROFESSIONAL_EXPERIENCES, projects } from "../data/portfolio.js";

export default function Hero({ onDownloadCv }) {
  const { t } = useLanguage();

  const stats = [
    { key: "projects", value: projects.length },
    { key: "technologies", value: TECHNOLOGIES_COUNT },
    { key: "experiences", value: PROFESSIONAL_EXPERIENCES },
  ];

  return (
    <section id="home" className="hero-section" aria-labelledby="home-title">
      <svg className="hero-grid-overlay" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1600 400">
        <defs>
          <pattern id="hero-isometric-grid" width="80" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 40 0 80 20 40 40ZM40 0V40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <linearGradient id="hero-grid-fade" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="white" />
            <stop offset="60%" stopColor="black" />
          </linearGradient>
          <mask id="hero-grid-mask">
            <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-isometric-grid)" mask="url(#hero-grid-mask)" />
      </svg>
      <svg className="hero-grain" aria-hidden="true" width="100%" height="100%">
        <filter id="hero-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title" id="home-title">
            <span className="hero-greeting">{t.hero.greeting}</span>
            <span className="hero-first-name">Achraf</span>
            <span className="hero-last-name">Es-serrar</span>
          </h1>
          <p className="hero-role">{t.hero.subtitle}</p>
          <p className="hero-tagline">{t.hero.description}</p>

          <div className="hero-actions">
            <a className="btn primary" href="#projects">
              <Code2 size={18} aria-hidden="true" />
              {t.hero.projectsButton}
            </a>
            <CvDownloadMenu label={t.hero.cvButton} onDownload={onDownloadCv} />
          </div>

          <ul className="hero-stats" aria-label={t.hero.statsLabel}>
            {stats.map((stat) => (
              <li className="stat-tile" key={stat.key}>
                <strong>{stat.value}</strong>
                <span>{t.hero.stats[stat.key]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <HexGrid />
        </div>
      </div>
    </section>
  );
}
