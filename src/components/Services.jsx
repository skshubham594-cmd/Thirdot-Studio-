import { services } from '../content.js';

export default function Services() {
  return (
    <section className="section visual-services" id="what-happens-here" aria-labelledby="services-heading">
      <h2 id="services-heading">What Happens Here</h2>
      <div className="service-photo-grid">
        {services.map((service, index) => (
          <details key={service.title} className={`service-photo service-photo-${index}`}>
            <summary>
              <div className="service-photo-frame">
                <img src={service.image} alt={service.alt} width="1200" height="1000" loading="lazy" />
              </div>
              <div className="service-photo-title">
                <h3>{service.title}</h3>
                <span className="service-open plus" aria-hidden="true">+</span>
              </div>
            </summary>
            <div className="service-photo-description">
              <p>{service.description}</p>
              <p className="service-scope">{service.scope}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
