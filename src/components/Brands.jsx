import SectionHead from './SectionHead.jsx';
import Reveal from './Reveal.jsx';
import Marquee from './Marquee.jsx';
import { brands } from '../content.js';

export default function Brands() {
  return (
    <section className="section" id="brands" aria-labelledby="brands-heading">
      <SectionHead id="brands-heading" title="Brands" label="Made work for" />
      <Reveal>
        <Marquee
          items={brands}
          getKey={(brand) => brand.name}
          seconds={40}
          renderItem={(brand, hidden) => (
            <div className="brand-tile">
              <img src={brand.logo} alt={hidden ? '' : brand.name} loading="lazy" />
            </div>
          )}
        />
      </Reveal>
    </section>
  );
}
