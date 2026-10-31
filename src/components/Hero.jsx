import { useEffect, useRef, useState } from 'react';

const FILM = {
  video: '/assets/hero/ep01-intro.mp4',
  poster: '/assets/hero/ep01-intro.jpg'
};

// Full-bleed hero film: muted autoplay loop with a sound toggle. With reduced
// motion the film starts paused on its poster; the toggle still plays it.
export default function Hero() {
  const filmRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const film = filmRef.current;
    film.muted = true;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) film.play().catch(() => {});
  }, []);

  function toggleSound() {
    const film = filmRef.current;
    film.muted = !film.muted;
    if (film.paused) film.play().catch(() => {});
    setMuted(film.muted);
  }

  return (
    <section className="hero-film" id="home" aria-labelledby="hero-title">
      <video
        ref={filmRef}
        className="hero-film__video"
        src={FILM.video}
        poster={FILM.poster}
        muted
        loop
        playsInline
        preload="auto"
        aria-label="THIRDOT Creative podcast, episode one intro"
      />
      <div className="hero-film__bar">
        <h1 className="visually-hidden" id="hero-title">THIRDOT Creative: come over, let’s make something.</h1>
        <a className="invitation" href="#come-over">Come Over <span aria-hidden="true">↗</span></a>
        <button type="button" className="hero-film__sound" onClick={toggleSound} aria-pressed={!muted}>
          {muted ? 'Sound on' : 'Sound off'}
        </button>
      </div>
    </section>
  );
}
