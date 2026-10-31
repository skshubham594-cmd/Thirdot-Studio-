import SectionHead from './SectionHead.jsx';
import Reveal from './Reveal.jsx';
import { brands } from '../content.js';

export default function Brands() {
  return (
    <section className="section" id="brands" aria-labelledby="brands-heading">
      <SectionHead id="brands-heading" title="Brands" label="Made work for" />
      <ul className="brand-grid">
        {brands.map((brand, i) => (
          <Reveal as="li" key={brand} className="brand-tile" delay={i * 80}>{brand}</Reveal>
        ))}
      </ul>
    </section>
  );
}
