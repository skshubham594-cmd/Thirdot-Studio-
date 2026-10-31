import SectionHead from './SectionHead.jsx';
import Reveal from './Reveal.jsx';
import { process } from '../content.js';

export default function Process() {
  return (
    <section className="section" id="process" aria-labelledby="process-heading">
      <SectionHead id="process-heading" title="Process" label="How we work" />
      <ol className="process-list">
        {process.map((step, i) => (
          <Reveal as="li" key={step.title} className="process-row">
            <span className="process-row__number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div className="process-row__image">
              <img src={step.image} alt="" width="720" height="1280" loading="lazy" />
            </div>
            <div className="process-row__copy">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
