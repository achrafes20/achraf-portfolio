import { BrainCircuit, Code2, Database, Layers3, Network, Server, Smartphone } from "lucide-react";
import Section from "../components/Section.jsx";
import { useLanguage } from "../LanguageContext.jsx";
import { skills } from "../data/portfolio.js";

const skillIcons = {
  development: Code2,
  web: Layers3,
  database: Database,
  infrastructure: Server,
  mobile: Smartphone,
  ai: BrainCircuit,
  systems: Network,
};

export default function About() {
  const { t } = useLanguage();

  return (
    <Section id="about" title={t.about.title} subtitle={t.about.subtitle} className="about-layout">
      <div className="about-copy">
        {t.about.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <ul className="skills-grid" aria-label={t.about.skillsLabel}>
        {skills.map((skill) => {
          const Icon = skillIcons[skill.key];
          return (
            <li className="skill-card" key={skill.key}>
              <div className="icon-box" aria-hidden="true">
                <Icon size={22} />
              </div>
              <h3>{t.about.skillTitles[skill.key]}</h3>
              <p>{skill.items}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
