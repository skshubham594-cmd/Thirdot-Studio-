import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BrandDots from './BrandDots.jsx';
import { contactLink, navLinks } from '../content.js';

// Fixed header in difference blend mode, so it reads on black and white
// sections alike. Phones get a full-screen menu.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const { pathname, hash } = useLocation();

  useEffect(() => { setMenuOpen(false); }, [pathname, hash]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const root = document.documentElement;
    root.classList.add('menu-open');
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => {
      root.classList.remove('menu-open');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const isCurrent = (to) => (to.startsWith('/#') ? pathname === '/' && hash === to.slice(1) : pathname === to);

  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-header__brand" aria-label="THIRDOT home">THIRDOT<BrandDots /></Link>
        <nav className="site-header__nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} aria-current={isCurrent(link.to) ? 'page' : undefined}>{link.label}</Link>
          ))}
        </nav>
        <Link to={contactLink.to} className="site-header__contact" aria-current={isCurrent(contactLink.to) ? 'page' : undefined}>{contactLink.label}</Link>
        <button
          ref={toggleRef}
          className="site-header__toggle"
          type="button"
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </header>
      <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile navigation" hidden={!menuOpen}>
        {[...navLinks, contactLink].map((link, i) => (
          <Link key={link.to} to={link.to} style={{ '--i': i }}>
            <span className="mobile-menu__index">0{i + 1}</span>{link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
