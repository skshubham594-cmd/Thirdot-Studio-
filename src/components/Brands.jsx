import SectionHead from './SectionHead.jsx';
import Reveal from './Reveal.jsx';
import { brands } from '../content.js';

// One row of logo tiles drifting left in an endless loop. The list is
// rendered twice and the track slides by exactly one copy, so the loop has
// no visible seam. The second copy is hidden from screen readers.
export default function Brands() {
  return (
    <section className="section" id="brands" aria-labelledby="brands-heading">
      <SectionHead id="brands-heading" title="Brands" label="Made work for" />
      <Reveal className="brand-marquee">
        <div className="brand-marquee__track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="brand-marquee__set" aria-hidden={copy === 1 ? 'true' : undefined}>
              {brands.map((brand) => (
                <li key={brand.name} className="brand-tile">
                  <img src={brand.logo} alt={copy === 1 ? '' : brand.name} loading="lazy" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
