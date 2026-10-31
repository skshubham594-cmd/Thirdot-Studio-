import Works from '../components/Works.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHead from '../components/SectionHead.jsx';
import usePageTitle from '../lib/usePageTitle.js';
import { works } from '../works.js';

export default function WorkPage() {
  usePageTitle('Work');
  return (
    <>
      <section className="section page-intro" aria-labelledby="work-title">
        <SectionHead as="h1" id="work-title" title="Work" label={`${works.length} reels`} />
        <Reveal as="p" className="page-intro__lede">Brand films, social reels and podcast cuts. Hover to preview, click to watch with sound.</Reveal>
      </section>
      <Works />
    </>
  );
}
