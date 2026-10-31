import SectionHead from '../components/SectionHead.jsx';
import ScrollText from '../components/ScrollText.jsx';
import Reveal from '../components/Reveal.jsx';
import StudioFilm from '../components/StudioFilm.jsx';
import ServiceList from '../components/ServiceList.jsx';
import Process from '../components/Process.jsx';
import CallToAction from '../components/CallToAction.jsx';
import usePageTitle from '../lib/usePageTitle.js';
import { about, articles, studio } from '../content.js';

export default function StudioPage() {
  usePageTitle('Studio');
  return (
    <>
      <section className="section page-intro" aria-labelledby="studio-title">
        <SectionHead as="h1" id="studio-title" title="Studio" label="Who we are" />
        <ScrollText className="statement statement--indent" text={about.statement} />
        <div className="two-col">
          {studio.columns.map((text, i) => <Reveal as="p" key={i} delay={i * 120}>{text}</Reveal>)}
        </div>
      </section>
      <section className="section section--tight" aria-label="In the studio">
        <Reveal>
          <StudioFilm film={studio.film} />
        </Reveal>
        <ScrollText className="statement statement--indent statement--spaced" text={studio.statement} />
      </section>
      <ServiceList id="studio-services" />
      <Process />
      <section className="section" id="notes" aria-labelledby="notes-heading">
        <SectionHead id="notes-heading" title="Notes" label="From the studio" />
        <div className="notes">
          {articles.map((article, i) => (
            <Reveal as="details" key={article.title} className="note">
              <summary>
                <span className="note__index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{article.title}</h3>
                <span className="note__toggle" aria-hidden="true" />
              </summary>
              <div className="note__body">
                {article.paragraphs.map((text) => <p key={text.slice(0, 40)}>{text}</p>)}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
