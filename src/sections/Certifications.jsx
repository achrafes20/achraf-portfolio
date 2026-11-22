import { Award, ExternalLink } from "lucide-react";
import Section from "../components/Section.jsx";
import SmartImage from "../components/SmartImage.jsx";
import { useLanguage } from "../LanguageContext.jsx";
import { certifications } from "../data/portfolio.js";

export default function Certifications({ onOpenCertificate }) {
  const { t } = useLanguage();
  const text = t.certifications;

  return (
    <Section id="certifications" title={text.title} subtitle={text.subtitle} className="certifications-section">
      <div className="cert-grid">
        {certifications.map((cert) => (
          <article className="cert-card" key={cert.id}>
            <div className="cert-header">
              <div className="cert-icon" aria-hidden="true">
                <Award size={24} />
              </div>
              <div className="cert-title-group">
                <h3>{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
              </div>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="cert-link"
                  aria-label={`${text.viewCertificate} — ${cert.title}`}
                >
                  <ExternalLink size={20} aria-hidden="true" />
                </a>
              )}
            </div>

            {cert.images.length > 0 && (
              <div className="cert-images-scroll">
                {cert.images.map((image, index) => (
                  <button
                    type="button"
                    className="cert-image-btn"
                    key={image}
                    aria-label={`${text.openImage} ${index + 1} — ${cert.title}`}
                    onClick={() => onOpenCertificate(cert.id, index)}
                  >
                    <SmartImage src={image} alt={`${cert.title} — ${text.imageAlt} ${index + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            <div className="tech-stack">
              {cert.skills.map((skill) => (
                <span className="tech-chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
