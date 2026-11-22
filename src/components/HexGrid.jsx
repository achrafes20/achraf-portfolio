import { useLanguage } from "../LanguageContext.jsx";

// Logos servis localement (public/icons) : devicon 2.16.0, version figée, + icônes maison.
const TECHNOLOGIES = [
  { name: "Java", color: "#F59E0B", logo: "/icons/java.svg" },
  { name: "TypeScript", color: "#3178C6", logo: "/icons/typescript.svg" },
  { name: "C#", color: "#7C3AED", logo: "/icons/csharp.svg" },
  { name: "React", color: "#00E5CC", logo: "/icons/react.svg" },
  { name: "Spring Boot", color: "#22C55E", logo: "/icons/spring.svg" },
  { name: "Laravel", color: "#F97316", logo: "/icons/laravel.svg" },
  { name: "Python", color: "#3B82F6", logo: "/icons/python.svg" },
  { name: "Angular", color: "#EF4444", logo: "/icons/angular.svg" },
  { name: "Node.js", color: "#84CC16", logo: "/icons/nodejs.svg" },
  { name: "ASP.NET", color: "#7C3AED", logo: "/icons/dotnetcore.svg" },
  { name: "MySQL", color: "#F97316", logo: "/icons/mysql.svg" },
  { name: "MongoDB", color: "#22C55E", logo: "/icons/mongodb.svg" },
  { name: "Docker", color: "#2563EB", logo: "/icons/docker.svg" },
  { name: "Git", color: "#EF4444", logo: "/icons/git.svg" },
  { name: "Flutter", color: "#42A5F5", logo: "/icons/flutter.svg" },
  { name: "Dart", color: "#0175C2", logo: "/icons/dart.svg" },
  { name: "Supabase", color: "#3ECF8E", logo: "/icons/supabase.svg" },
  { name: "XGBoost", color: "#F97316", logo: "/icons/xgboost.svg" },
  { name: "FastAPI", color: "#009688", logo: "/icons/fastapi.svg" },
  { name: "Streamlit", color: "#FF4B4B", logo: "/icons/streamlit.svg" },
  { name: "JavaFX", color: "#5382A1", logo: "/icons/javafx.svg" },
  { name: "WebSocket", color: "#64748B", logo: "/icons/websocket.svg" },
].map((technology, index) => ({ ...technology, index }));

// eslint-disable-next-line react-refresh/only-export-components
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
    <div className="hex-grid-shell">
      <div className="hex-grid" role="list" aria-label={t.ui.technologiesLabel}>
        {ROWS.map((row, rowIndex) => (
          <div className="hex-row" key={`row-${rowIndex + 1}`} role="presentation">
            {row.map((technology) => (
              <div
                className="hex-cell"
                key={technology.name}
                role="listitem"
                style={{
                  "--brand-color": technology.color,
                  "--brand-bg": `${technology.color}1F`,
                  "--brand-hover": `${technology.color}38`,
                  "--brand-glow": `${technology.color}80`,
                  "--reveal-delay": `${technology.index * 0.06}s`,
                  "--float-delay": `${technology.index * 0.3}s`,
                }}
              >
                <span className="hex-tooltip" aria-hidden="true">
                  {technology.name}
                </span>
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
