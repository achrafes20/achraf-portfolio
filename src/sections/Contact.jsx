import { Copy, Download, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import Section from "../components/Section.jsx";
import Turnstile from "../components/Turnstile.jsx";
import { useLanguage } from "../LanguageContext.jsx";
import { useContactForm } from "../hooks/useContactForm.js";
import { CONFIG } from "../config.js";
import { profile } from "../data/portfolio.js";

export default function Contact({ cv, onDownloadCv, notify, theme }) {
  const { t, lang } = useLanguage();
  const text = t.contact;
  const { status, isSending, handleSubmit, captchaEnabled, setCaptchaToken, captchaResetKey } =
    useContactForm({ t, lang, notify });

  const copyToClipboard = async (value, message) => {
    try {
      await navigator.clipboard.writeText(value);
      notify(message, "success");
    } catch {
      notify(text.copyUnavailable, "error");
    }
  };

  return (
    <Section id="contact" title={text.headerTitle} subtitle={text.headerSubtitle} className="contact-section">
      <div className="contact-list">
        <button className="contact-item" type="button" onClick={() => copyToClipboard(profile.email, text.emailCopied)}>
          <span className="contact-icon" aria-hidden="true">
            <Mail size={22} />
          </span>
          <span>
            <strong>{text.email}</strong>
            <small>{profile.email}</small>
            <em>{text.copy}</em>
          </span>
          <Copy size={18} aria-hidden="true" />
        </button>

        <button className="contact-item" type="button" onClick={() => copyToClipboard(profile.phoneRaw, text.phoneCopied)}>
          <span className="contact-icon" aria-hidden="true">
            <Phone size={22} />
          </span>
          <span>
            <strong>{text.phone}</strong>
            <small>{profile.phone}</small>
            <em>{text.copy}</em>
          </span>
          <Copy size={18} aria-hidden="true" />
        </button>

        <div className="contact-item static">
          <span className="contact-icon" aria-hidden="true">
            <MapPin size={22} />
          </span>
          <span>
            <strong>{text.location}</strong>
            <small>{text.locationValue}</small>
          </span>
        </div>

        <div className="social-grid">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={19} aria-hidden="true" />
            <strong>LinkedIn</strong>
            <span>{profile.linkedinHandle}</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={19} aria-hidden="true" />
            <strong>GitHub</strong>
            <span>{profile.githubHandle}</span>
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} aria-labelledby="contact-form-title">
        <div className="contact-badge">{text.badge}</div>
        <h3 id="contact-form-title">{text.title}</h3>
        <p className="contact-form-subtitle">{text.subtitle}</p>

        {/* Piège à robots : invisible pour les humains, vérifié côté serveur. */}
        <div className="honeypot" aria-hidden="true">
          <label>
            {text.form.honeypotLabel}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="form-grid">
          <label>
            <span>{text.form.nameLabel}</span>
            <input
              name="name"
              type="text"
              autoComplete="name"
              placeholder={text.form.namePlaceholder}
              minLength={2}
              maxLength={100}
              required
            />
          </label>
          <label>
            <span>{text.form.emailLabel}</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder={text.form.emailPlaceholder}
              maxLength={254}
              required
            />
          </label>
        </div>
        <label>
          <span>{text.form.subjectLabel}</span>
          <input
            name="subject"
            type="text"
            placeholder={text.form.subjectPlaceholder}
            minLength={2}
            maxLength={160}
            required
          />
        </label>
        <label>
          <span>{text.form.messageLabel}</span>
          <textarea
            name="message"
            placeholder={text.form.messagePlaceholder}
            minLength={5}
            maxLength={5000}
            required
          />
        </label>

        {captchaEnabled && (
          <Turnstile
            siteKey={CONFIG.turnstileSiteKey}
            lang={lang}
            theme={theme}
            onToken={setCaptchaToken}
            resetKey={captchaResetKey}
          />
        )}

        <p
          className={status.message ? `form-status ${status.type}` : "form-status-empty"}
          role={status.type === "error" ? "alert" : "status"}
        >
          {status.message}
        </p>

        <div className="contact-actions">
          <button className="btn primary" type="submit" disabled={isSending}>
            <Send size={18} aria-hidden="true" />
            {isSending ? text.form.sending : text.form.submit}
          </button>
          <a className="btn secondary" href={cv.href} download={cv.fileName} onClick={onDownloadCv}>
            <Download size={18} aria-hidden="true" />
            {text.form.cv}
          </a>
        </div>
      </form>
    </Section>
  );
}
