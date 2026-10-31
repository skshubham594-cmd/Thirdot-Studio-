import { useReveal } from '../lib/hooks.js';

// Section title with a small (label) on the right and a rule that draws in.
export default function SectionHead({ id, title, label, as: Heading = 'h2' }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="section-head">
      <Heading id={id} className="section-head__title">{title}</Heading>
      {label && <p className="section-head__label">({label})</p>}
      <span className="section-head__rule" aria-hidden="true" />
    </div>
  );
}
