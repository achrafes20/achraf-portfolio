import { useEffect, useMemo, useState } from "react";
import {
  ArrowUp,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Code2,
  Container,
  Copy,
  Database,
  Download,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  BrainCircuit,
  Network,
  Phone,
  School,
  Send,
  Server,
  Sun,
  Smartphone,
  ZoomIn,
  X,
} from "lucide-react";
import HexGrid, { TECHNOLOGIES_COUNT } from "./components/HexGrid.jsx";
import ProjectLightbox from "./components/ProjectLightbox.jsx";
import { useLanguage } from "./LanguageContext.jsx";
import {
  CONFIG,
  filters,
  profile,
  projects,
  skills,
  timeline,
} from "./data/portfolio.js";

const skillIcons = {
  development: Code2,
  web: Layers3,
  database: Database,
  infrastructure: Server,
  mobile: Smartphone,
  ai: BrainCircuit,
  systems: Network,
};

const timelineIcons = {
  formation: GraduationCap,
  work: BriefcaseBusiness,
  school: School,
};

const navItems = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "experience", href: "#experience" },
  { key: "contact", href: "#contact" },
];

function App() {
  const { lang, t } = useLanguage();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [slideMap, setSlideMap] = useState({});
  const [toast, setToast] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [lightboxProject, setLightboxProject] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const translatedProjects = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        ...t.projects.items[project.id],
      })),
    [t],
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return translatedProjects;
    return translatedProjects.filter((project) => project.category === activeFilter);
  }, [activeFilter, translatedProjects]);

  const heroStats = [`${projects.length}+`, `${TECHNOLOGIES_COUNT}+`, "2+"].map((value, index) => ({
    value,
    label: t.hero.stats[index],
  }));

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.body.style.transition = "opacity 150ms ease";
    document.body.style.opacity = "0.6";
    const timer = window.setTimeout(() => {
      document.body.style.opacity = "1";
    }, 150);
    return () => window.clearTimeout(timer);
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 620);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = (message, type = "info") => setToast({ message, type });

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = CONFIG.cvUrl;
    link.download = "ES-SERRAR-ACHRAF-CV.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    notify(t.ui.downloadStarted, "info");
  };

  const copyToClipboard = async (value, message) => {
    try {
      await navigator.clipboard.writeText(value);
      notify(message, "success");
    } catch {
      notify(t.contact.copyUnavailable, "error");
    }
  };

  const setProjectSlide = (projectId, direction, total) => {
    setSlideMap((current) => {
      const active = current[projectId] || 0;
      const next =
        direction === "next" ? (active + 1) % total : (active - 1 + total) % total;
      return { ...current, [projectId]: next };
    });
  };

  const goToSlide = (projectId, index) => {
    setSlideMap((current) => ({ ...current, [projectId]: index }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("website")) return;

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      source: "react_portfolio",
      created_at: new Date().toISOString(),
    };

    setIsSending(true);
    setFormStatus({ type: "info", message: t.contact.form.sendingStatus });

    let messageSaved = false;

    try {
      const response = await fetch(
        `${CONFIG.supabase.url}/rest/v1/${CONFIG.supabase.table}`,
        {
          method: "POST",
          headers: {
            apikey: CONFIG.supabase.anonKey,
            Authorization: `Bearer ${CONFIG.supabase.anonKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(t.contact.form.savedError);
      }

      messageSaved = true;

      const emailResponse = await fetch(
        `${CONFIG.supabase.url}/functions/v1/${CONFIG.supabase.contactEmailFunction}`,
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

      if (!emailResponse.ok) {
        const emailError = await emailResponse.json().catch(() => null);
        throw new Error(
          emailError?.providerMessage ||
            emailError?.error ||
            t.contact.form.resendError,
        );
      }

      form.reset();
      setFormStatus({
        type: "success",
        message: t.contact.form.success,
      });
      notify(t.contact.form.successToast, "success");
    } catch (error) {
      const reason = error instanceof Error ? error.message : t.contact.form.unknownError;
      setFormStatus({
        type: "error",
        message: messageSaved
          ? `${t.contact.form.emailNotSent} ${reason}`
          : reason,
      });
      notify(t.contact.form.errorToast, "error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`app-shell ${theme}`}>
      <NavBar
        theme={theme}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setTheme={setTheme}
      />

      <main>
        <section id="home" className="hero-section">
          <svg
            className="hero-grid-overlay"
            aria-hidden="true"
            preserveAspectRatio="none"
            viewBox="0 0 1600 400"
          >
            <defs>
              <pattern id="hero-isometric-grid" width="80" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M0 20 40 0 80 20 40 40ZM40 0V40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
              <linearGradient id="hero-grid-fade" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="white" />
                <stop offset="60%" stopColor="black" />
              </linearGradient>
              <mask id="hero-grid-mask">
                <rect width="100%" height="100%" fill="url(#hero-grid-fade)" />
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#hero-isometric-grid)"
              mask="url(#hero-grid-mask)"
            />
          </svg>
          <svg className="hero-grain" aria-hidden="true" width="100%" height="100%">
            <filter id="hero-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#hero-noise)" />
          </svg>

          <div className="hero-inner">
            <div className="hero-content">
              
              <h1 className="hero-title">
                <span className="hero-greeting">{t.hero.greeting}</span>
                <span className="hero-first-name">Achraf</span>
                <span className="hero-last-name">Es-serrar</span>
              </h1>
              <p className="hero-role">{t.hero.subtitle}</p>
              <p className="hero-tagline">{t.hero.description}</p>

              <div className="hero-actions">
                <a className="btn primary" href="#projects" onClick={() => setMenuOpen(false)}>
                  <Code2 size={18} />
                  {t.hero.projectsButton}
                </a>
                <button className="btn secondary" type="button" onClick={downloadCV}>
                  <Download size={18} />
                  {t.hero.cvButton}
                </button>
              </div>

              <div className="hero-stats" aria-label={t.hero.statsLabel}>
                {heroStats.map((stat) => (
                  <div className="stat-tile" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visual">
              <HexGrid />
            </div>
          </div>
        </section>

        <SectionHeader
          id="about"
          title={t.about.title}
          subtitle={t.about.subtitle}
        />
        <section className="about-layout" aria-label={t.about.sectionLabel}>
          <div className="about-copy">
            {t.about.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="skills-grid">
            {skills.map((skill) => {
              const Icon = skillIcons[skill.key];
              return (
                <article className="skill-card" key={skill.title}>
                  <div className="icon-box">
                    <Icon size={22} />
                  </div>
                  <h3>{t.about.skillTitles[skill.key]}</h3>
                  <p>{skill.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <SectionHeader
          id="projects"
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />
        <section className="projects-section" aria-label={t.projects.sectionLabel}>
          <div className="project-filters" role="tablist" aria-label={t.projects.filterLabel}>
            {filters.map((filter) => (
              <button
                className={activeFilter === filter.id ? "filter-btn active" : "filter-btn"}
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
              >
                {t.projects.filters[filter.id]}
              </button>
            ))}
          </div>

          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                activeIndex={slideMap[project.id] || 0}
                setProjectSlide={setProjectSlide}
                goToSlide={goToSlide}
                text={t.projects}
                onOpenLightbox={() => {
                  setLightboxProject(project);
                  setLightboxIndex(slideMap[project.id] || 0);
                }}
              />
            ))}
          </div>

          <div className="projects-count">
            <Code2 size={20} />
            <span>
              <strong>
                {translatedProjects.length} {t.projects.countLabel}
              </strong>{" "}
              {t.projects.countText}
            </span>
          </div>
        </section>

        <SectionHeader
          id="experience"
          title={t.experience.title}
          subtitle={t.experience.subtitle}
        />
        <section className="timeline-section" aria-label={t.experience.sectionLabel}>
          {timeline.map((item) => {
            const Icon = timelineIcons[item.type];
            const itemText = t.experience.items[item.type];
            return (
              <article className="timeline-item" key={item.type}>
                <div className="timeline-marker">
                  <Icon size={23} />
                </div>
                <div className="timeline-content">
                  <span className="timeline-date">{itemText.date}</span>
                  <h3>{itemText.title}</h3>
                  <p className="timeline-place">{itemText.place}</p>
                  <p>{itemText.description}</p>
                  {item.tech.length > 0 && (
                    <div className="timeline-tech-block">
                      {item.techLabel && <span>{t.experience.technicalEnvironment}</span>}
                      <div className="tech-stack">
                        {(itemText.tech || item.tech).map((tech) => (
                          <span className="tech-chip" key={tech}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        <SectionHeader
          id="contact"
          title={t.contact.headerTitle}
          subtitle={t.contact.headerSubtitle}
        />
        <section className="contact-section" aria-label={t.contact.sectionLabel}>
          <div className="contact-list">
            <button
              className="contact-item"
              type="button"
              onClick={() => copyToClipboard(profile.email, t.contact.emailCopied)}
            >
              <span className="contact-icon">
                <Mail size={22} />
              </span>
              <span>
                <strong>{t.contact.email}</strong>
                <small>{profile.email}</small>
                <em>{t.contact.copy}</em>
              </span>
              <Copy size={18} />
            </button>

            <button
              className="contact-item"
              type="button"
              onClick={() => copyToClipboard(profile.phoneRaw, t.contact.phoneCopied)}
            >
              <span className="contact-icon">
                <Phone size={22} />
              </span>
              <span>
                <strong>{t.contact.phone}</strong>
                <small>{profile.phone}</small>
                <em>{t.contact.copy}</em>
              </span>
              <Copy size={18} />
            </button>

            <div className="contact-item static">
              <span className="contact-icon">
                <MapPin size={22} />
              </span>
              <span>
                <strong>{t.contact.location}</strong>
                <small>{t.contact.locationValue}</small>
              </span>
            </div>

            <div className="social-grid">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Linkedin size={19} />
                <strong>LinkedIn</strong>
                <span>{profile.linkedinHandle}</span>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Github size={19} />
                <strong>GitHub</strong>
                <span>{profile.githubHandle}</span>
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-badge">{t.contact.badge}</div>
            <h3>{t.contact.title}</h3>
            <p className="contact-form-subtitle">{t.contact.subtitle}</p>
            <input
              type="text"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              hidden
            />

            <div className="form-grid">
              <label>
                <span>{t.contact.form.nameLabel}</span>
                <input
                  name="name"
                  type="text"
                  placeholder={t.contact.form.namePlaceholder}
                  minLength={2}
                  maxLength={100}
                  required
                />
              </label>
              <label>
                <span>{t.contact.form.emailLabel}</span>
                <input
                  name="email"
                  type="email"
                  placeholder={t.contact.form.emailPlaceholder}
                  maxLength={254}
                  required
                />
              </label>
            </div>
            <label>
              <span>{t.contact.form.subjectLabel}</span>
              <input
                name="subject"
                type="text"
                placeholder={t.contact.form.subjectPlaceholder}
                minLength={2}
                maxLength={160}
                required
              />
            </label>
            <label>
              <span>{t.contact.form.messageLabel}</span>
              <textarea
                name="message"
                placeholder={t.contact.form.messagePlaceholder}
                minLength={5}
                maxLength={5000}
                required
              />
            </label>

            {formStatus.message && (
              <p className={`form-status ${formStatus.type}`}>{formStatus.message}</p>
            )}

            <div className="contact-actions">
              <button className="btn primary" type="submit" disabled={isSending}>
                <Send size={18} />
                {isSending ? t.contact.form.sending : t.contact.form.submit}
              </button>
              <button className="btn secondary" type="button" onClick={downloadCV}>
                <Download size={18} />
                {t.contact.form.cv}
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />

      {lightboxProject && (
        <ProjectLightbox
          project={
            translatedProjects.find((project) => project.id === lightboxProject.id) ||
            lightboxProject
          }
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
          onClose={() => setLightboxProject(null)}
        />
      )}

      {showTop && (
        <button
          className="scroll-top"
          type="button"
          aria-label={t.ui.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={21} />
        </button>
      )}

      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
}

function NavBar({ theme, menuOpen, setMenuOpen, setTheme }) {
  const { lang, t, toggleLanguage } = useLanguage();

  return (
    <header className="site-nav">
      <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
        <img src={theme === "dark" ? "/logo_claire.png" : "/logo_sombre.png"} alt="Logo" />
        <span>{profile.name}</span>
      </a>

      <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Navigation">
        {navItems.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {t.nav[link.key]}
          </a>
        ))}
      </nav>

      <div className="nav-actions">
        <button
          className="icon-btn"
          type="button"
          aria-label={t.ui.changeTheme}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <button
          className="language-toggle"
          type="button"
          aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
          onClick={toggleLanguage}
        >
          {lang === "fr" ? "EN" : "FR"}
        </button>
        <button
          className="icon-btn menu-btn"
          type="button"
          aria-label={t.ui.menu}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function SectionHeader({ id, title, subtitle }) {
  return (
    <section id={id} className="section-header">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </section>
  );
}

function ProjectCard({ project, activeIndex, setProjectSlide, goToSlide, onOpenLightbox, text }) {
  const activeImage = project.images[activeIndex] || project.images[0];
  const hasMultipleImages = project.images.length > 1;
  const LinkIcon = project.linkType === "docker" ? Container : Github;

  return (
    <article className="project-card">
      <div className="project-media">
        {activeImage ? (
          <img
            src={activeImage}
            alt={project.title}
            loading="lazy"
            role="button"
            tabIndex="0"
            onClick={onOpenLightbox}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") onOpenLightbox();
            }}
          />
        ) : (
          <div
            className="project-image-placeholder"
            role="button"
            tabIndex="0"
            onClick={onOpenLightbox}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") onOpenLightbox();
            }}
          >
            {project.title}
          </div>
        )}
        <span className="project-zoom-icon" aria-hidden="true">
          <ZoomIn size={18} />
        </span>
        <span className="project-badge">{project.badge}</span>
        {hasMultipleImages && (
          <>
            <div className="carousel-controls">
              <button
                type="button"
                aria-label={text.previousImage}
                onClick={() => setProjectSlide(project.id, "prev", project.images.length)}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label={text.nextImage}
                onClick={() => setProjectSlide(project.id, "next", project.images.length)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="carousel-dots" aria-label={text.projectImages}>
              {project.images.map((image, index) => (
                <button
                  type="button"
                  aria-label={`${text.image} ${index + 1}`}
                  className={index === activeIndex ? "active" : ""}
                  key={image}
                  onClick={() => goToSlide(project.id, index)}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tech-stack">
          {project.tech.map((tech) => (
            <span className="tech-chip" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        {project.repo && (
          <a className="btn compact primary" href={project.repo} target="_blank" rel="noreferrer">
            <LinkIcon size={17} />
            {project.linkType === "docker" ? text.dockerHub : text.sourceCode}
          </a>
        )}
      </div>
    </article>
  );
}

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div>
        <h2>{profile.name}</h2>
        <p>{t.footer.description}</p>
        <div className="footer-socials">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={20} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail size={20} />
          </a>
        </div>
      </div>
      <nav aria-label={t.ui.footerNavigation}>
        <h3>{t.footer.navigation}</h3>
        {navItems.map((link) => (
          <a href={link.href} key={link.href}>
            {t.nav[link.key]}
          </a>
        ))}
      </nav>
      <p className="footer-bottom">© 2026 Achraf Es-serrar. {t.footer.rights}</p>
    </footer>
  );
}

export default App;
