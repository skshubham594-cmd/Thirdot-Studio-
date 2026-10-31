import { Link } from 'react-router-dom';
import SectionHead from './SectionHead.jsx';
import ScrollText from './ScrollText.jsx';
import Reveal from './Reveal.jsx';
import { about } from '../content.js';

export default function AboutTeaser() {
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <SectionHead id="about-heading" title="About" label="Who we are" />
      <ScrollText className="statement statement--indent" text={about.statement} />
      <div className="about-detail">
        <Reveal className="about-detail__image">
          <img src={about.image.src} alt={about.image.alt} width="720" height="1280" loading="lazy" />
        </Reveal>
        <Reveal className="about-detail__copy" delay={120}>
          <p>{about.columns[0]}</p>
          <Link to="/studio" className="dot-link">Read more</Link>
        </Reveal>
        <Reveal className="about-detail__copy" delay={240}>
          <p>{about.columns[1]}</p>
        </Reveal>
      </div>
    </section>
  );
}
