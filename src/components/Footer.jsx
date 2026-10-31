import { Link } from 'react-router-dom';
import Wordmark from './Wordmark.jsx';
import { contactLink, navLinks, site, socialLinks } from '../content.js';
import { scrollToTarget } from '../lib/smoothScroll.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__contact">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link to={contactLink.to} className="site-footer__cta">Start a project <span aria-hidden="true">→</span></Link>
        </div>
        <div className="site-footer__lists">
          <div>
            <p className="site-footer__label">/Social</p>
            <ul>
              {socialLinks.map(({ name, href, handle }) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name}, ${handle} (opens in a new tab)`}>{name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="site-footer__label">/Nav</p>
            <ul>
              <li><Link to="/">Home</Link></li>
              {navLinks.map((link) => <li key={link.to}><Link to={link.to}>{link.label}</Link></li>)}
              <li><Link to={contactLink.to}>{contactLink.label}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <Wordmark className="site-footer__wordmark" />
      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} THIRDOT Creative</span>
        <button type="button" onClick={() => scrollToTarget(0)}>Back to top <span aria-hidden="true">↑</span></button>
      </div>
    </footer>
  );
}
