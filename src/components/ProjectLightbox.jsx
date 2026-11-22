import { useCallback, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../LanguageContext.jsx";
import SmartImage from "./SmartImage.jsx";

const SWIPE_THRESHOLD = 50;
const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

// Visionneuse plein écran : clavier (← → Échap), swipe, focus piégé dans la boîte
// de dialogue puis rendu à l'élément d'origine à la fermeture.
export default function ProjectLightbox({ item, index, setIndex, onClose }) {
  const { t } = useLanguage();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const touchStartX = useRef(0);
  const images = item.images;
  const total = images.length;

  const goToNext = useCallback(() => setIndex((current) => (current + 1) % total), [setIndex, total]);
  const goToPrev = useCallback(() => setIndex((current) => (current - 1 + total) % total), [setIndex, total]);

  // Blocage du défilement + restitution du focus : une seule fois par ouverture.
  useEffect(() => {
    // On mémorise l’élément actif AVANT de déplacer le focus dans la boîte de dialogue.
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") goToNext();
      else if (event.key === "ArrowLeft") goToPrev();
      else if (event.key === "Escape") onClose();
      else if (event.key === "Tab" && dialogRef.current) {
        const focusables = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter(
          (element) => element.offsetParent !== null,
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, onClose]);

  if (total === 0) return null;

  const image = images[index];

  const handleTouchEnd = (event) => {
    const delta = touchStartX.current - event.changedTouches[0].clientX;
    if (delta > SWIPE_THRESHOLD) goToNext();
    if (delta < -SWIPE_THRESHOLD) goToPrev();
  };

  return (
    <div
      ref={dialogRef}
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
      <span className="lightbox-counter" aria-live="polite">
        {index + 1} / {total}
      </span>

      <button className="lightbox-close" type="button" aria-label={t.ui.close} onClick={onClose} ref={closeButtonRef}>
        ×
      </button>

      {total > 1 && (
        <button
          className="lightbox-arrow lightbox-arrow-prev"
          type="button"
          aria-label={t.ui.previousImage}
          onClick={(event) => {
            event.stopPropagation();
            goToPrev();
          }}
        >
          <ArrowLeft size={22} aria-hidden="true" />
        </button>
      )}

      <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
        <div className="lightbox-image-container">
          <SmartImage
            className="lightbox-image"
            key={image}
            src={image}
            alt={`${item.title} - ${t.ui.projectImage} ${index + 1}`}
            draggable="false"
          />
        </div>

        <div className="lightbox-project-info">
          <h3 id="lightbox-project-title">{item.title}</h3>
          {item.tech?.length > 0 && (
            <div className="lightbox-tech-list">
              {item.tech.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          )}
        </div>

        {total > 1 && (
          <div className="lightbox-thumbnails" role="group" aria-label={t.projects.projectImages}>
            {images.map((thumbnail, thumbnailIndex) => (
              <button
                className={thumbnailIndex === index ? "lightbox-thumbnail active" : "lightbox-thumbnail"}
                type="button"
                key={thumbnail}
                aria-label={`${t.ui.viewImage} ${thumbnailIndex + 1} — ${item.title}`}
                aria-current={thumbnailIndex === index ? "true" : undefined}
                onClick={() => setIndex(thumbnailIndex)}
              >
                <SmartImage src={thumbnail} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {total > 1 && (
        <button
          className="lightbox-arrow lightbox-arrow-next"
          type="button"
          aria-label={t.ui.nextImage}
          onClick={(event) => {
            event.stopPropagation();
            goToNext();
          }}
        >
          <ArrowRight size={22} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
