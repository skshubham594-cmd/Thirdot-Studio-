import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { works } from '../works.js';
import './Works.css';

const TYPE_DURATION = 500; // ms for the full typewriter reveal
const FADE_OUT = 300;      // ms the label takes to fade before its characters reset
const DEFAULT_ASPECT = '16/9';
const TWO_COLUMNS = '(min-width: 900px)';

// Staggered, editorial placement. Items cycle through this pattern by their
// position in the list: size (share of the column), alignment inside the
// column and an extra downward shift. Odd/even items land in different
// columns on desktop, so neighbours never line up.
const PLACEMENTS = [
  { size: 'lg', align: 'flex-start', shift: '0' },
  { size: 'md', align: 'flex-end', shift: '0' },
  { size: 'lg', align: 'flex-end', shift: '6vh' },
  { size: 'sm', align: 'flex-start', shift: '4vh' },
  { size: 'md', align: 'center', shift: '0' },
  { size: 'md', align: 'flex-end', shift: '10vh' }
];
const SIZES = {
  lg: { landscape: '100%', portrait: '68%' },
  md: { landscape: '84%', portrait: '56%' },
  sm: { landscape: '72%', portrait: '46%' }
};

const canHover = () => window.matchMedia('(hover: hover)').matches;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = () => setMatches(list.matches);
    list.addEventListener('change', onChange);
    setMatches(list.matches);
    return () => list.removeEventListener('change', onChange);
  }, [query]);
  return matches;
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

function WorkItem({ project, position }) {
  const [active, setActive] = useState(false);
  const [metadataAspect, setMetadataAspect] = useState(null);
  const cardRef = useRef(null);
  const typed = useTypewriter(project.cta, active);

  // Native ratio: from the data, else from the loaded video's dimensions.
  const [width, height] = (project.aspect || metadataAspect || DEFAULT_ASPECT).split('/').map(Number);
  const ratio = width / height;
  const portrait = ratio < 1;
  const placement = PLACEMENTS[position % PLACEMENTS.length];

  // Touch devices: the first tap reveals the overlay state, a tap anywhere
  // else dismisses it, and a second tap on the card follows the link.
  useEffect(() => {
    if (!active || canHover()) return undefined;
    function onPointerDown(event) {
      if (!cardRef.current?.contains(event.target)) setActive(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [active]);

  function handleClick(event) {
    if (canHover() || active) return;
    event.preventDefault();
    setActive(true);
  }

  function handleFocus(event) {
    if (event.target.matches(':focus-visible')) setActive(true);
  }

  function handleLoadedMetadata(event) {
    const { videoWidth, videoHeight } = event.currentTarget;
    if (!project.aspect && videoWidth && videoHeight) setMetadataAspect(`${videoWidth}/${videoHeight}`);
  }

  const itemClass = ['works__item', portrait ? 'works__item--portrait' : 'works__item--landscape', active ? 'is-active' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <li
      className={itemClass}
      style={{
        '--works-w': SIZES[placement.size][portrait ? 'portrait' : 'landscape'],
        '--works-align': placement.align,
        '--works-shift': placement.shift
      }}
    >
      <div className="works__rail" aria-hidden="true">
        <span className="works__index">{project.index}</span>
        <span className="works__ticks" />
      </div>
      <div className="works__piece">
        <div className="works__meta">
          <p className="works__client">{project.client}</p>
          <p className="works__title">{project.title}</p>
        </div>
        <Link
          ref={cardRef}
          className="works__card"
          style={{ '--works-ratio': ratio }}
          to={`/stories/${project.slug}`}
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
            preload="metadata"
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
        </Link>
      </div>
    </li>
  );
}

// `page` adds the extra top padding needed when the showcase is a page of its
// own and sits under the site header.
export default function Works({ page = false }) {
  const gridRef = useRef(null);
  const twoColumns = useMediaQuery(TWO_COLUMNS);

  // Desktop: odd and even items in two columns, the second starting lower.
  // Phones: one column in order.
  const columns = twoColumns
    ? [works.filter((_, i) => i % 2 === 0), works.filter((_, i) => i % 2 === 1)]
    : [works];

  // Only videos near the viewport play; the rest stay paused.
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
  }, [twoColumns]);

  return (
    <section className={page ? 'works works--page' : 'works'} id="stories" aria-label="Stories">
      <div ref={gridRef} className="works__columns">
        {columns.map((items, column) => (
          <ol key={column} className={column === 1 ? 'works__column works__column--offset' : 'works__column'}>
            {items.map((project) => (
              <WorkItem key={project.slug} project={project} position={works.indexOf(project)} />
            ))}
          </ol>
        ))}
      </div>
    </section>
  );
}
