import { useEffect, useRef } from 'react';
import { pauseScroll } from '../lib/smoothScroll.js';
import './Lightbox.css';

const ratioOf = (aspect = '16/9') => {
  const [width, height] = aspect.split('/').map(Number);
  return width / height;
};

// Modal player: the chosen film with sound and controls over a blurred page.
// `film` is { video, poster, client, title, aspect } or null when closed.
// Closes on Esc, the close button or a click outside the film.
export default function Lightbox({ film, onClose }) {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!film) return undefined;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    pauseScroll(true);
    if (!dialog.open) dialog.showModal();
    // The click allows sound; if a browser still refuses, play muted.
    const video = videoRef.current;
    video?.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
    return () => {
      root.style.overflow = previousOverflow;
      pauseScroll(false);
      if (dialog.open) dialog.close();
    };
  }, [film]);

  function handleClick(event) {
    if (event.target === dialogRef.current) dialogRef.current.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={film ? `${film.client}, ${film.title}` : undefined}
      onClose={onClose}
      onClick={handleClick}
    >
      {film && (
        <figure className="lightbox__frame" style={{ '--lightbox-ratio': ratioOf(film.aspect) }}>
          <video ref={videoRef} className="lightbox__video" src={film.video} poster={film.poster} controls autoPlay playsInline />
          <figcaption className="lightbox__caption">
            <span>{film.client}</span>
            <span>{film.title}</span>
          </figcaption>
        </figure>
      )}
      <button type="button" className="lightbox__close" onClick={() => dialogRef.current.close()} aria-label="Close video">
        <span aria-hidden="true">×</span>
      </button>
    </dialog>
  );
}
