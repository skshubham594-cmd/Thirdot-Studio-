import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/hooks.js';

// Studio film: plays when it scrolls into view and pauses when it leaves.
// It tries to start with sound; if the browser blocks unmuted autoplay (no
// prior click on the site), it plays muted and the toggle turns sound on.
export default function StudioFilm({ film }) {
  const videoRef = useRef(null);
  const wantsSound = useRef(true);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !('IntersectionObserver' in window)) return undefined;

    function start() {
      video.muted = !wantsSound.current;
      video.play().then(() => setMuted(video.muted)).catch(() => {
        video.muted = true;
        setMuted(true);
        video.play().catch(() => {});
      });
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!prefersReducedMotion()) start();
      } else if (!video.paused) {
        video.pause();
      }
    }, { threshold: 0.5 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggleSound() {
    const video = videoRef.current;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    wantsSound.current = !nextMuted;
    setMuted(nextMuted);
    if (video.paused) video.play().catch(() => {});
  }

  function togglePlay() {
    const video = videoRef.current;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  }

  return (
    <div className="studio-film">
      <video
        ref={videoRef}
        className="studio-film__video"
        src={film.video}
        poster={film.poster}
        loop
        muted
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={film.alt}
      />
      <div className="studio-film__controls">
        <button type="button" className="studio-film__btn" onClick={togglePlay} aria-label={playing ? 'Pause film' : 'Play film'}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button type="button" className="studio-film__btn" onClick={toggleSound} aria-pressed={!muted}>
          {muted ? 'Sound on' : 'Sound off'}
        </button>
      </div>
    </div>
  );
}
