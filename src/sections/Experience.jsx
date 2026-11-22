import { BriefcaseBusiness, GraduationCap, School } from "lucide-react";
import Section from "../components/Section.jsx";
import { useLanguage } from "../LanguageContext.jsx";
import { timeline } from "../data/portfolio.js";

const icons = {
  graduation: GraduationCap,
  briefcase: BriefcaseBusiness,
  school: School,
};

export default function Experience() {
  const { t } = useLanguage();

  return (
    <Section
      id="experience"
      title={t.experience.title}
      subtitle={t.experience.subtitle}
      className="timeline-section"
    >
      <ol className="timeline-list">
        {timeline.map((item) => {
          const Icon = icons[item.icon];
          const itemText = t.experience.items[item.type];
          const tech = itemText.tech || item.tech || [];
          const isProfessional = item.icon === "briefcase";

          return (
            <li className="timeline-item" key={item.type}>
              <div className="timeline-marker" aria-hidden="true">
                <Icon size={23} />
              </div>
              <div className="timeline-content">
                <span className="timeline-date">{itemText.date}</span>
                <h3>{itemText.title}</h3>
                <p className="timeline-place">{itemText.place}</p>
                <p>{itemText.description}</p>
                {tech.length > 0 && (
                  <div className="timeline-tech-block">
                    {isProfessional && <span>{t.experience.technicalEnvironment}</span>}
                    <div className="tech-stack">
                      {tech.map((technology) => (
                        <span className="tech-chip" key={technology}>
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
