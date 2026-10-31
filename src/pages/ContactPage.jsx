import Reveal from '../components/Reveal.jsx';
import ContactForm from '../components/ContactForm.jsx';
import usePageTitle from '../lib/usePageTitle.js';
import { site, socialLinks } from '../content.js';

export default function ContactPage() {
  usePageTitle('Contact');
  return (
    <section className="section page-intro contact-page" aria-labelledby="contact-title">
      <Reveal as="h1" id="contact-title" className="contact-page__title">Let’s create something worth watching together</Reveal>
      <Reveal as="h2" className="contact-page__kicker">Get in touch</Reveal>
      <Reveal><ContactForm /></Reveal>
      <div className="contact-page__details">
        <Reveal>
          <h3>Inquiries</h3>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </Reveal>
        <Reveal delay={120}>
          <h3>Social</h3>
          <ul>
            {socialLinks.map(({ name, href, handle }) => (
              <li key={name}><a href={href} target="_blank" rel="noopener noreferrer">{name} {handle}</a></li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
