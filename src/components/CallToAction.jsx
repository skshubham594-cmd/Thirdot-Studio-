import { Link } from 'react-router-dom';
import ScrollText from './ScrollText.jsx';
import Reveal from './Reveal.jsx';
import { cta } from '../content.js';

// Blurred red film still with a statement that lights up, linking to Contact.
export default function CallToAction() {
  return (
    <section className="section cta-section" aria-label="Start a project">
      <Reveal className="cta">
        <img className="cta__image" src={cta.image} alt="" width="1600" height="634" loading="lazy" />
        <div className="cta__copy">
          <ScrollText className="cta__title" text={cta.title} />
          <Link to="/contact" className="dot-link dot-link--light">Contact</Link>
        </div>
      </Reveal>
    </section>
  );
}
