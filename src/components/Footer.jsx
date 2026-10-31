import { Link } from 'react-router-dom';
import BrandDots from './BrandDots.jsx';
import { socialLinks } from '../content.js';

const ICONS = {
  Instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  )
};

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link to="/" className="footer-brand" aria-label="THIRDOT home">THIRDOT<BrandDots /></Link>
      <div className="footer-bottom">
        <p>A studio that feels like home.</p>
        <ul className="footer-social" aria-label="THIRDOT on social media">
          {socialLinks.map(({ name, handle, href }) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name}, ${handle} (opens in a new tab)`}>
                {ICONS[name]}
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#top">Back to the top <span aria-hidden="true">↗</span></a>
        <span>© <span id="year">{new Date().getFullYear()}</span> THIRDOT</span>
      </div>
    </footer>
  );
}
