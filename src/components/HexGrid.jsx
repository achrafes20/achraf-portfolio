import { useLanguage } from "../LanguageContext.jsx";

const TECHNOLOGIES = [
  { name: "Java", color: "#F59E0B", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "TypeScript", color: "#3178C6", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "C#", color: "#7C3AED", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "React", color: "#00E5CC", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Spring Boot", color: "#22C55E", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Laravel", color: "#F97316", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "Python", color: "#3B82F6", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Angular", color: "#EF4444", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
  { name: "Node.js", color: "#84CC16", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "ASP.NET", color: "#7C3AED", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg" },
  { name: "MySQL", color: "#F97316", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "MongoDB", color: "#22C55E", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Docker", color: "#2563EB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", color: "#EF4444", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Flutter", color: "#42A5F5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Dart", color: "#0175C2", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { name: "Supabase", color: "#3ECF8E", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
  { name: "XGBoost", color: "#F97316", logo: "/icons/xgboost.svg" },
  { name: "FastAPI", color: "#009688", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Streamlit", color: "#FF4B4B", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg" },
  { name: "JavaFX", color: "#5382A1", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "WebSocket", color: "#64748B", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
].map((technology, index) => ({ ...technology, index }));

export const TECHNOLOGIES_COUNT = TECHNOLOGIES.length;

const ROWS = [
  TECHNOLOGIES.slice(0, 4),
  TECHNOLOGIES.slice(4, 9),
  TECHNOLOGIES.slice(9, 13),
  TECHNOLOGIES.slice(13, 18),
  TECHNOLOGIES.slice(18, 22),
];

export default function HexGrid() {
  const { t } = useLanguage();

  return (
    <div className="hex-grid-shell" aria-label={t.ui.technologiesLabel}>
      <div className="hex-grid">
        {ROWS.map((row, rowIndex) => (
          <div className="hex-row" key={`row-${rowIndex + 1}`}>
            {row.map((technology) => (
              <div
                className="hex-cell"
                key={technology.name}
                role="img"
                aria-label={technology.name}
                tabIndex="0"
                style={{
                  "--brand-color": technology.color,
                  "--brand-bg": `${technology.color}1F`,
                  "--brand-hover": `${technology.color}38`,
                  "--brand-glow": `${technology.color}80`,
                  "--reveal-delay": `${technology.index * 0.06}s`,
                  "--float-delay": `${technology.index * 0.3}s`,
                  opacity: 0,
                }}
              >
                <span className="hex-tooltip">{technology.name}</span>
                <div className="hex-float">
                  <div className="hex-tile">
                    <div className="hex-content">
                      <img src={technology.logo} alt="" width="32" height="32" />
                      <span>{technology.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
