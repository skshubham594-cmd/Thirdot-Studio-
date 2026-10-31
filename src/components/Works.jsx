import { useEffect, useRef, useState } from 'react';
import { works } from '../works.js';
import Lightbox from './Lightbox.jsx';
import './Works.css';

const TYPE_DURATION = 500; // ms for the full typewriter reveal
const FADE_OUT = 300;      // ms the label takes to fade before its characters reset
const DEFAULT_ASPECT = '16/9';

// Masonry column count by viewport width, widest first.
const COLUMN_BREAKPOINTS = [
  ['(min-width: 1400px)', 5],
  ['(min-width: 1100px)', 4],
  ['(min-width: 700px)', 3]
];
const MIN_COLUMNS = 2;

// Card shapes (width/height) for portrait videos, cycled by list position in
// an irregular order so neighbouring cards differ in height and the wall
// reads as random but stays the same on every visit. The video fills the
// card and is cropped from the centre. Set `shape` on an entry to override.
const PORTRAIT_SHAPES = ['9/16', '3/4', '2/3', '4/5', '9/16', '2/3', '3/4', '4/5', '2/3'];

const ratioOf = (aspect) => {
  const [width, height] = aspect.split('/').map(Number);
  return width / height;
};

function withShapes(items) {
  return items.map((item, i) => {
    if (item.shape) return item;
    const portrait = item.aspect && ratioOf(item.aspect) < 1;
    return portrait ? { ...item, shape: PORTRAIT_SHAPES[i % PORTRAIT_SHAPES.length] } : item;
  });
}

const canHover = () => window.matchMedia('(hover: hover)').matches;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function columnCount() {
  const match = COLUMN_BREAKPOINTS.find(([query]) => window.matchMedia(query).matches);
  return match ? match[1] : MIN_COLUMNS;
}

function useColumnCount() {
  const [count, setCount] = useState(columnCount);
  useEffect(() => {
    const lists = COLUMN_BREAKPOINTS.map(([query]) => window.matchMedia(query));
    const onChange = () => setCount(columnCount());
    lists.forEach((list) => list.addEventListener('change', onChange));
    onChange();
    return () => lists.forEach((list) => list.removeEventListener('change', onChange));
  }, []);
  return count;
}

// Greedy masonry: each item goes into the currently shortest column, with
// height measured in column widths (1 / aspect ratio), so cards of mixed
// ratios pack without holes while keeping roughly the list order.
function toColumns(items, count) {
  const columns = Array.from({ length: count }, () => ({ height: 0, items: [] }));
  items.forEach((item) => {
    const shortest = columns.reduce((a, b) => (b.height < a.height ? b : a));
    shortest.items.push(item);
    shortest.height += 1 / ratioOf(item.shape || item.aspect || DEFAULT_ASPECT);
  });
  return columns.map((column) => column.items);
}

// Reveals `text` one character at a time while `active`; returns how many
// characters are currently shown.
function useTypewriter(text, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      const timer = setTimeout(() => setCount(0), FADE_OUT);
      return () => clearTimeout(timer);
    }
    if (reducedMotion()) {
      setCount(text.length);
      return undefined;
    }
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const next = Math.min(text.length, Math.ceil(((now - start) / TYPE_DURATION) * text.length));
      setCount((current) => Math.max(current, next));
      if (next < text.length) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [active, text]);
  return count;
}

function WorkItem({ project, onOpen }) {
  const [active, setActive] = useState(false);
  const [metadataAspect, setMetadataAspect] = useState(null);
  const cardRef = useRef(null);
  const typed = useTypewriter(project.cta, active);

  // Card shape, else the native ratio from the data or the loaded video.
  const ratio = ratioOf(project.shape || project.aspect || metadataAspect || DEFAULT_ASPECT);

  // Touch devices: the first tap reveals the overlay state, a tap anywhere
  // else dismisses it, and a second tap on the card opens the player.
  useEffect(() => {
    if (!active || canHover()) return undefined;
    function onPointerDown(event) {
      if (!cardRef.current?.contains(event.target)) setActive(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [active]);

  // The card links to the video file itself, so it still works without JS;
  // with JS it opens the lightbox player instead.
  function handleClick(event) {
    event.preventDefault();
    if (canHover() || active) onOpen(project);
    else setActive(true);
  }

  function handleFocus(event) {
    if (event.target.matches(':focus-visible')) setActive(true);
  }

  function handleLoadedMetadata(event) {
    const { videoWidth, videoHeight } = event.currentTarget;
    if (!project.aspect && videoWidth && videoHeight) setMetadataAspect(`${videoWidth}/${videoHeight}`);
  }

  return (
    <li className={active ? 'works__item is-active' : 'works__item'}>
      <a
        ref={cardRef}
        className="works__card"
        style={{ '--works-ratio': ratio }}
        href={project.video}
        aria-label={`${project.client}, ${project.title}. ${project.cta}`}
        onMouseEnter={() => { if (canHover()) setActive(true); }}
        onMouseLeave={() => { if (canHover()) setActive(false); }}
        onFocus={handleFocus}
        onBlur={() => setActive(false)}
        onClick={handleClick}
      >
        <video
          className="works__video"
          src={project.video}
          poster={project.poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
          onLoadedMetadata={handleLoadedMetadata}
        />
        <span className="works__shade" aria-hidden="true" />
        <span className="works__bracket works__bracket--tl" aria-hidden="true" />
        <span className="works__bracket works__bracket--tr" aria-hidden="true" />
        <span className="works__bracket works__bracket--bl" aria-hidden="true" />
        <span className="works__bracket works__bracket--br" aria-hidden="true" />
        <span className="works__cta" aria-hidden="true">
          {[...project.cta].map((char, i) => (
            <span key={i} className={i < typed ? 'is-on' : undefined}>{char}</span>
          ))}
        </span>
        <span className="works__meta" aria-hidden="true">
          <span className="works__client">{project.client}</span>
          <span className="works__title">{project.title}</span>
        </span>
      </a>
    </li>
  );
}

export default function Works() {
  const gridRef = useRef(null);
  const [playing, setPlaying] = useState(null);
  const count = useColumnCount();
  const columns = toColumns(withShapes(works), count);

  // Only videos near the viewport load and play; the rest stay paused on
  // their poster (preload="none"), so a long list costs nothing up front.
  useEffect(() => {
    const videos = [...gridRef.current.querySelectorAll('video')];
    videos.forEach((video) => { video.muted = true; });
    if (!('IntersectionObserver' in window)) {
      videos.forEach((video) => video.play().catch(() => {}));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) target.play().catch(() => {});
        else target.pause();
      });
    }, { rootMargin: '200px 0px' });
    videos.forEach((video) => observer.observe(video));
    return () => observer.disconnect();
  }, [count]);

  return (
    <section className="works" aria-label="All reels">
      <div ref={gridRef} className="works__columns">
        {columns.map((items, column) => (
          <ol key={column} className="works__column">
            {items.map((project) => (
              <WorkItem key={project.slug} project={project} onOpen={setPlaying} />
            ))}
          </ol>
        ))}
      </div>
      <Lightbox film={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
