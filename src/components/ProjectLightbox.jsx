import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../LanguageContext.jsx";

const SWIPE_THRESHOLD = 50;

export default function ProjectLightbox({ project, lightboxIndex, setLightboxIndex, onClose }) {
  const { t } = useLanguage();
  const touchStartX = useRef(0);
  const images = project.images;
  const totalImages = images.length;

  const goToNext = () => {
    setLightboxIndex((index) => (index === totalImages - 1 ? 0 : index + 1));
  };

  const goToPrev = () => {
    setLightboxIndex((index) => (index === 0 ? totalImages - 1 : index - 1));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") goToNext();
      if (event.key === "ArrowLeft") goToPrev();
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  });

  if (!project || totalImages === 0) return null;

  const image = images[lightboxIndex];
  const technologyPills = project.tech.reduce((pills, technology) => {
    pills.push(<span key={technology}>{technology}</span>);
    return pills;
  }, []);

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const delta = touchStartX.current - touchEndX;
    if (delta > SWIPE_THRESHOLD) goToNext();
    if (delta < -SWIPE_THRESHOLD) goToPrev();
  };

  return (
    <div
      className="project-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
      onClick={onClose}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={handleTouchEnd}
    >
      <span className="lightbox-counter">
        {lightboxIndex + 1} / {totalImages}
      </span>

      <button className="lightbox-close" type="button" aria-label={t.ui.close} onClick={onClose} autoFocus>
        ×
      </button>

      <button
        className="lightbox-arrow lightbox-arrow-prev"
        type="button"
        aria-label={t.ui.previousImage}
        onClick={(event) => {
          event.stopPropagation();
          goToPrev();
        }}
      >
        <ArrowLeft size={22} />
      </button>

      <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
        <div className="lightbox-image-container">
          {image ? (
            <img
              className="lightbox-image"
              key={lightboxIndex}
              src={image}
              alt={`${project.title} - ${t.ui.projectImage} ${lightboxIndex + 1}`}
              draggable="false"
            />
          ) : (
            <div className="lightbox-image-fallback">{project.title}</div>
          )}
        </div>

        <div className="lightbox-project-info">
          <h3 id="lightbox-project-title">{project.title}</h3>
          <div className="lightbox-tech-list">{technologyPills}</div>
        </div>

        <div className="lightbox-thumbnails" aria-label={t.projects.projectImages}>
          {images.map((thumbnail, index) => (
            <button
              className={index === lightboxIndex ? "lightbox-thumbnail active" : "lightbox-thumbnail"}
              type="button"
              key={thumbnail}
              aria-label={`${t.ui.viewImage} ${index + 1} — ${project.title}`}
              onClick={() => setLightboxIndex(index)}
            >
              <img src={thumbnail} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      <button
        className="lightbox-arrow lightbox-arrow-next"
        type="button"
        aria-label={t.ui.nextImage}
        onClick={(event) => {
          event.stopPropagation();
          goToNext();
        }}
      >
        <ArrowRight size={22} />
      </button>
    </div>
  );
}
