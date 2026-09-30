import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import BrandDots from './BrandDots.jsx';
import { navLinks } from '../content.js';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  // While the mobile menu is open: Escape closes it (returning focus to the
  // toggle) and any click outside the menu or toggle closes it.
  useEffect(() => {
    if (!menuOpen) return undefined;
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    function onClick(event) {
      if (!menuRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="THIRDOT home">THIRDOT<BrandDots /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navLinks.map((link) => (
          link.invitation ? (
            <Link key={link.to} to={link.to} className="nav-invitation">{link.label} <span aria-hidden="true">↗</span></Link>
          ) : (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          )
        ))}
      </nav>
      <button
        ref={toggleRef}
        id="menu-toggle"
        className="menu-toggle"
        type="button"
        aria-controls="mobile-menu"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
      </button>
      <nav
        ref={menuRef}
        id="mobile-menu"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        onClick={(event) => { if (event.target.closest('a')) setMenuOpen(false); }}
      >
        {navLinks.map((link) => (
          <Link key={link.to} to={link.to}>{link.label} <span aria-hidden="true">↗</span></Link>
        ))}
      </nav>
    </header>
  );
}
