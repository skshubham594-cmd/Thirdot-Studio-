import { useEffect, useRef } from 'react';

const FILM = {
  desktop: '/assets/world/balcony.mp4',
  mobile: '/assets/world/balcony-mobile.mp4'
};

// Scroll-controlled hero film. The video is a direct, seekable MP4 whose
// currentTime follows the section's scroll progress. With reduced motion the
// poster stays put and no video is loaded.
export default function Hero() {
  const heroRef = useRef(null);
  const filmRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const film = filmRef.current;
    const progressBar = progressRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileMedia = window.matchMedia('(max-width: 860px)');
    let pendingFrame = 0;
    let targetTime = 0;
    let generation = 0;

    film.muted = true;

    function markPainted() {
      const currentGeneration = generation;
      if ('requestVideoFrameCallback' in film) {
        film.requestVideoFrameCallback(() => {
          if (currentGeneration === generation && !reduceMotion.matches) film.dataset.ready = 'true';
        });
      } else if (film.readyState >= 2) {
        film.dataset.ready = 'true';
      }
    }

    function seekLatest() {
      if (reduceMotion.matches || !Number.isFinite(film.duration) || film.seeking || film.readyState < 1) return;
      const time = Math.max(0, Math.min(targetTime, film.duration - 0.04));
      if (Math.abs(film.currentTime - time) > 0.025) {
        try { film.currentTime = time; } catch { /* Keep the poster until media is seekable. */ }
      }
    }

    function updateHero() {
      pendingFrame = 0;
      if (reduceMotion.matches) return;
      const rect = hero.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      progressBar.style.transform = `scaleX(${progress})`;
      if (Number.isFinite(film.duration)) {
        targetTime = progress * Math.max(0, film.duration - 0.04);
        seekLatest();
      }
    }

    function requestHeroUpdate() {
      if (!pendingFrame && !reduceMotion.matches) pendingFrame = requestAnimationFrame(updateHero);
    }

    function configureHero() {
      generation++;
      delete film.dataset.ready;
      film.pause();
      if (reduceMotion.matches) {
        film.removeAttribute('src');
        film.load();
        if (pendingFrame) cancelAnimationFrame(pendingFrame);
        pendingFrame = 0;
        progressBar.style.transform = 'scaleX(0)';
        return;
      }
      film.src = mobileMedia.matches ? FILM.mobile : FILM.desktop;
      film.preload = 'auto';
      film.load();
      requestHeroUpdate();
    }

    // iOS can require a gesture before its first video frame is available.
    function primeHero() {
      if (reduceMotion.matches || !film.getAttribute('src')) return;
      const play = film.play();
      if (play) play.then(() => { film.pause(); requestHeroUpdate(); }).catch(() => {});
    }

    function onLoadedData() { markPainted(); requestHeroUpdate(); }
    function onSeeked() { markPainted(); seekLatest(); }
    function onError() { delete film.dataset.ready; }
    function onPageHide(event) {
      if (event.persisted) return;
      if (pendingFrame) cancelAnimationFrame(pendingFrame);
      film.pause();
      film.removeAttribute('src');
      film.load();
    }

    film.addEventListener('loadedmetadata', requestHeroUpdate);
    film.addEventListener('loadeddata', onLoadedData);
    film.addEventListener('seeked', onSeeked);
    film.addEventListener('error', onError);
    window.addEventListener('scroll', requestHeroUpdate, { passive: true });
    window.addEventListener('resize', requestHeroUpdate, { passive: true });
    // Opening any <details> on the page shifts layout. `toggle` does not
    // bubble, so listen in the capture phase instead of on each element.
    document.addEventListener('toggle', requestHeroUpdate, true);
    mobileMedia.addEventListener('change', configureHero);
    reduceMotion.addEventListener('change', configureHero);
    hero.addEventListener('pointerdown', primeHero, { once: true, passive: true });
    window.addEventListener('pagehide', onPageHide);
    configureHero();

    return () => {
      generation++;
      if (pendingFrame) cancelAnimationFrame(pendingFrame);
      pendingFrame = 0;
      film.removeEventListener('loadedmetadata', requestHeroUpdate);
      film.removeEventListener('loadeddata', onLoadedData);
      film.removeEventListener('seeked', onSeeked);
      film.removeEventListener('error', onError);
      window.removeEventListener('scroll', requestHeroUpdate);
      window.removeEventListener('resize', requestHeroUpdate);
      document.removeEventListener('toggle', requestHeroUpdate, true);
      mobileMedia.removeEventListener('change', configureHero);
      reduceMotion.removeEventListener('change', configureHero);
      hero.removeEventListener('pointerdown', primeHero);
      window.removeEventListener('pagehide', onPageHide);
      film.pause();
      film.removeAttribute('src');
      film.load();
      delete film.dataset.ready;
      progressBar.style.transform = 'scaleX(0)';
    };
  }, []);

  return (
    <section ref={heroRef} className="scroll-scrub thirdot-journey" id="home" aria-labelledby="hero-title">
      <div className="scroll-scrub__stage">
        <div className="scroll-scrub__media" aria-hidden="true">
          <div className="scroll-scrub__layer">
            <picture className="scroll-scrub__picture">
              <source media="(max-width: 860px)" srcSet="/assets/world/balcony-mobile-poster.png" />
              <img className="scroll-scrub__poster" src="/assets/world/balcony-poster.png" alt="" fetchPriority="high" width="1920" height="1080" />
            </picture>
            <video ref={filmRef} id="hero-film" className="scroll-scrub__video" muted playsInline preload="none" tabIndex={-1} />
          </div>
        </div>
        <div className="scroll-scrub__progress" aria-hidden="true"><span ref={progressRef} /></div>
      </div>
      <div className="scroll-scrub__story">
        <article className="scroll-scrub__chapter">
          <div className="scroll-scrub__chapter-pin">
            <div className="scroll-scrub__copy">
              <h1 className="scroll-scrub__title" id="hero-title">Coffee’s on us.</h1>
              <p className="scroll-scrub__body">Come over. Let’s make something.</p>
              <div className="scroll-scrub__actions">
                <a className="invitation" href="#come-over">Come Over <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
