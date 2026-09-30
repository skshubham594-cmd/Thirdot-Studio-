import { Link } from 'react-router-dom';

// Uses the .error-page styles carried over from the original stylesheet.
export default function NotFoundPage() {
  return (
    <section className="error-page" aria-labelledby="not-found-heading">
      <h1 id="not-found-heading">Nothing here yet.</h1>
      <p>This page doesn’t exist.</p>
      <Link to="/">Back home</Link>
    </section>
  );
}
