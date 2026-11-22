import { useMemo, useState } from "react";
import { Code2 } from "lucide-react";
import Section from "../components/Section.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import { useLanguage } from "../LanguageContext.jsx";
import { filters } from "../data/portfolio.js";

export default function Projects({ projects, onOpenProject }) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleProjects = useMemo(
    () => (activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)),
    [activeFilter, projects],
  );

  return (
    <Section id="projects" title={t.projects.title} subtitle={t.projects.subtitle} className="projects-section">
      <div className="project-filters" role="group" aria-label={t.projects.filterLabel}>
        {filters.map((filter) => (
          <button
            className={activeFilter === filter ? "filter-btn active" : "filter-btn"}
            key={filter}
            type="button"
            aria-pressed={activeFilter === filter}
            onClick={() => setActiveFilter(filter)}
          >
            {t.projects.filters[filter]}
          </button>
        ))}
      </div>

      <div className="projects-grid" aria-live="polite">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            text={t.projects}
            onOpen={(index) => onOpenProject(project.id, index)}
          />
        ))}
      </div>

      <div className="projects-count">
        <Code2 size={20} aria-hidden="true" />
        <span>
          <strong>
            {projects.length} {t.projects.countLabel}
          </strong>{" "}
          {t.projects.countText}
        </span>
      </div>
    </Section>
  );
}
