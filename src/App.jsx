import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowUp } from "lucide-react";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import ProjectLightbox from "./components/ProjectLightbox.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Experience from "./sections/Experience.jsx";
import Certifications from "./sections/Certifications.jsx";
import Contact from "./sections/Contact.jsx";
import { useLanguage } from "./LanguageContext.jsx";
import { useTheme } from "./hooks/useTheme.js";
import { useToast } from "./hooks/useToast.js";
import { useDocumentMeta } from "./hooks/useDocumentMeta.js";
import { certifications, projects } from "./data/portfolio.js";

const SCROLL_TOP_THRESHOLD = 620;

function App() {
  const { lang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { toast, notify } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  // Élément affiché dans la visionneuse : { kind: "project" | "certificate", id, index }.
  const [lightbox, setLightbox] = useState(null);

  useDocumentMeta({ lang, title: t.meta.title, description: t.meta.description });

  // Fusion des données structurelles et des textes traduits.
  const translatedProjects = useMemo(
    () =>
      projects.map((project) => {
        const text = t.projects.items[project.id];
        return { ...project, ...text, tech: text.tech || project.tech };
      }),
    [t],
  );

  // Lien direct vers une section (ex. /#projects) : le navigateur cherche l'ancre avant que
  // React ait rendu la page, on fait donc le défilement une fois le contenu monté.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > SCROLL_TOP_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCvDownload = () => notify(t.ui.downloadStarted, "info");

  const lightboxItem = useMemo(() => {
    if (!lightbox) return null;
    if (lightbox.kind === "project") return translatedProjects.find((project) => project.id === lightbox.id);
    const cert = certifications.find((item) => item.id === lightbox.id);
    return cert && { title: cert.title, images: cert.images, tech: cert.skills };
  }, [lightbox, translatedProjects]);

  const setLightboxIndex = useCallback((update) => {
    setLightbox((current) =>
      current && { ...current, index: typeof update === "function" ? update(current.index) : update },
    );
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <div className={`app-shell ${theme}`}>
      <a className="skip-link" href="#main-content">
        {t.ui.skipToContent}
      </a>

      <NavBar theme={theme} onToggleTheme={toggleTheme} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main id="main-content" tabIndex={-1}>
        <Hero onDownloadCv={handleCvDownload} />
        <About />
        <Projects
          projects={translatedProjects}
          onOpenProject={(id, index) => setLightbox({ kind: "project", id, index })}
        />
        <Experience />
        <Certifications onOpenCertificate={(id, index) => setLightbox({ kind: "certificate", id, index })} />
        <Contact onDownloadCv={handleCvDownload} notify={notify} theme={theme} />
      </main>

      <Footer />

      {lightboxItem && (
        <ProjectLightbox
          item={lightboxItem}
          index={lightbox.index}
          setIndex={setLightboxIndex}
          onClose={closeLightbox}
        />
      )}

      {showTop && (
        <button
          className="scroll-top"
          type="button"
          aria-label={t.ui.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={21} aria-hidden="true" />
        </button>
      )}

      <div className="toast-region" role="status" aria-live="polite">
        {toast && (
          <div className={`toast ${toast.type}`} key={toast.id}>
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
