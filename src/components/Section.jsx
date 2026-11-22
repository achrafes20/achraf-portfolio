// Section de page : le titre et son contenu appartiennent au même <section>,
// relié à son titre par aria-labelledby (structure lisible par les lecteurs d'écran).
export default function Section({ id, title, subtitle, className, children }) {
  const headingId = `${id}-title`;

  return (
    <section id={id} className="page-section" aria-labelledby={headingId}>
      <header className="section-header">
        <h2 id={headingId}>{title}</h2>
        <p>{subtitle}</p>
      </header>
      <div className={className}>{children}</div>
    </section>
  );
}
