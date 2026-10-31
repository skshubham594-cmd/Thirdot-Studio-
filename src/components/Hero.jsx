import { useEffect, useRef, useState } from 'react';
import Wordmark from './Wordmark.jsx';
import Lightbox from './Lightbox.jsx';
import { hero, site } from '../content.js';
import { prefersReducedMotion } from '../lib/hooks.js';

// Full-screen hero: the intro film playing muted behind fluted glass, the
// disciplines and statement, and the full-width wordmark. "Watch the intro"
// opens the film with sound.
export default function Hero() {
  const filmRef = useRef(null);
  const [watching, setWatching] = useState(null);

  useEffect(() => {
    const film = filmRef.current;
    film.muted = true;
    if (!prefersReducedMotion()) film.play().catch(() => {});
  }, []);

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <video ref={filmRef} className="hero__video" src={site.intro.video} poster={site.intro.poster} muted loop playsInline preload="auto" tabIndex={-1} />
        <div className="hero__glass" />
        <div className="hero__ribs" />
        <div className="hero__shade" />
      </div>
      <h1 className="visually-hidden" id="hero-title">THIRDOT Creative: {hero.statement}</h1>
      <ul className="hero__disciplines">
        {hero.disciplines.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <div className="hero__statement">
        <p aria-hidden="true">{hero.statement}</p>
        <button type="button" className="hero__watch" onClick={() => setWatching(site.intro)}>
          <span className="hero__watch-icon" aria-hidden="true" />Watch the intro
        </button>
      </div>
      <Wordmark tone="mint" className="hero__wordmark" />
      <Lightbox film={watching} onClose={() => setWatching(null)} />
    </section>
  );
}
