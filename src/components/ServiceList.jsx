import SectionHead from './SectionHead.jsx';
import Reveal from './Reveal.jsx';
import { services } from '../content.js';

export default function ServiceList({ id = 'services', title = 'Services' }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-heading`}>
      <SectionHead id={`${id}-heading`} title={title} label="What we do" />
      <ol className="service-list">
        {services.map((service, i) => (
          <Reveal as="li" key={service.title} className="service-row">
            <span className="service-row__number" aria-hidden="true">{i + 1}</span>
            <h3 className="service-row__title">{service.title}</h3>
            <div className="service-row__copy">
              <p>{service.description}</p>
              <ul className="service-row__scope">
                {service.scope.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
