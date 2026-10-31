import { Link } from 'react-router-dom';
import usePageTitle from '../lib/usePageTitle.js';

export default function NotFoundPage() {
  usePageTitle('Not found');
  return (
    <section className="section page-intro not-found" aria-labelledby="not-found-heading">
      <p className="not-found__code" aria-hidden="true">404</p>
      <h1 id="not-found-heading">This page doesn’t exist.</h1>
      <Link to="/" className="dot-link">Back home</Link>
    </section>
  );
}
