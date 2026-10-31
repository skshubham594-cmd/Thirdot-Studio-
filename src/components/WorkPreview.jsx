import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHead from './SectionHead.jsx';
import Reveal from './Reveal.jsx';
import Lightbox from './Lightbox.jsx';
import Marquee from './Marquee.jsx';
import { works } from '../works.js';
import { featuredWork } from '../content.js';

const canHover = () => window.matchMedia('(hover: hover)').matches;

// 'BUDGET VS SEPHORA' -> 'Budget vs Sephora'. Short connecting words stay lower case.
// Acronyms stay in capitals.
const SMALL_WORDS = new Set(['a', 'and', 'in', 'of', 'the', 'to', 'vs', 'on']);
const ACRONYMS = new Set(['ACC', 'CHK', 'BMW', 'PR']);
const titleCase = (text) => text.split(' ')
  .map((word, i) => {
    if (ACRONYMS.has(word)) return word;
    const lower = word.toLowerCase();
    return i > 0 && SMALL_WORDS.has(lower) ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
  })
  .join(' ');

// Selected reels as cards in a looping row: poster at rest, the reel plays
// on hover, a click opens it with sound.
function WorkCard({ project, onOpen, hidden = false }) {
  function play(event) {
    if (!canHover()) return;
    const video = event.currentTarget.querySelector('video');
    video.play().catch(() => {});
  }
  function stop(event) {
    const video = event.currentTarget.querySelector('video');
    video.pause();
  }
  return (
    <a
      className="work-card"
      href={project.video}
      onClick={(event) => { event.preventDefault(); onOpen(project); }}
      onMouseEnter={play}
      onMouseLeave={stop}
      tabIndex={hidden ? -1 : undefined}
      aria-label={`${project.client}, ${project.title}. Play`}
    >
      <span className="work-card__media">
        <video src={project.video} poster={project.poster} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />
        <span className="work-card__play" aria-hidden="true">Play</span>
      </span>
      <span className="work-card__meta">
        <span className="work-card__name">{titleCase(project.client)}</span>
        <span className="work-card__tags">{titleCase(project.title)}</span>
      </span>
    </a>
  );
}

export default function WorkPreview() {
  const [playing, setPlaying] = useState(null);
  const projects = featuredWork.map((slug) => works.find((work) => work.slug === slug)).filter(Boolean);

  return (
    <section className="section" id="work" aria-labelledby="work-heading">
      <SectionHead id="work-heading" title="Work" label="Selected reels" />
      <Reveal>
        <Marquee
          className="work-marquee"
          items={projects}
          getKey={(project) => project.slug}
          seconds={70}
          renderItem={(project, hidden) => <WorkCard project={project} onOpen={setPlaying} hidden={hidden} />}
        />
      </Reveal>
      <Reveal className="view-all">
        <Link to="/work">View all <span aria-hidden="true">→</span></Link>
      </Reveal>
      <Lightbox film={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}
