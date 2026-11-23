import { useState } from "react";
import { ChevronLeft, ChevronRight, Container, Github, Info, ZoomIn } from "lucide-react";
import SmartImage from "./SmartImage.jsx";

export default function ProjectCard({ project, text, onOpen }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = project.images.length;
  const activeImage = project.images[activeIndex];
  const isDocker = project.linkType === "docker";
  const LinkIcon = isDocker ? Container : Github;

  const showPrevious = () => setActiveIndex((index) => (index - 1 + total) % total);
  const showNext = () => setActiveIndex((index) => (index + 1) % total);

  return (
    <article className="project-card">
      <div className="project-media">
        {activeImage ? (
          <button
            type="button"
            className="project-media-trigger"
            aria-label={`${text.enlarge} — ${project.title}`}
            onClick={() => onOpen(activeIndex)}
          >
            <SmartImage src={activeImage} alt="" loading="lazy" />
            <span className="project-zoom-icon" aria-hidden="true">
              <ZoomIn size={18} />
            </span>
          </button>
        ) : (
          <div className="project-image-placeholder">{project.title}</div>
        )}

        <span className="project-badge">{project.badge}</span>

        {total > 1 && (
          <>
            <div className="carousel-controls">
              <button type="button" aria-label={text.previousImage} onClick={showPrevious}>
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button type="button" aria-label={text.nextImage} onClick={showNext}>
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="carousel-dots" role="group" aria-label={text.projectImages}>
              {project.images.map((image, index) => (
                <button
                  type="button"
                  aria-label={`${text.image} ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  className={index === activeIndex ? "active" : ""}
                  key={image}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="project-body">
        <h3>{project.title}</h3>
        {/* Résumé court sur la carte ; la description complète est dans la visionneuse. */}
        <p>{project.summary || project.description}</p>
        <div className="tech-stack">
          {project.tech.map((tech) => (
            <span className="tech-chip" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <div className="project-actions">
          {project.repo && (
            <a className="btn compact primary" href={project.repo} target="_blank" rel="noreferrer">
              <LinkIcon size={17} aria-hidden="true" />
              {isDocker ? text.dockerHub : text.sourceCode}
            </a>
          )}
          <button
            type="button"
            className="btn compact secondary"
            aria-label={`${text.detailsLabel} — ${project.title}`}
            onClick={() => onOpen(activeIndex)}
          >
            <Info size={17} aria-hidden="true" />
            {text.details}
          </button>
        </div>
      </div>
    </article>
  );
}
