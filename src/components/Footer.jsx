import { Link } from 'react-router-dom';
import BrandDots from './BrandDots.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link to="/" className="footer-brand" aria-label="THIRDOT home">THIRDOT<BrandDots /></Link>
      <div className="footer-bottom">
        <p>A studio that feels like home.</p>
        <a href="#top">Back to the top <span aria-hidden="true">↗</span></a>
        <span>© <span id="year">{new Date().getFullYear()}</span> THIRDOT</span>
      </div>
    </footer>
  );
}
