export default function People() {
  return (
    <section className="visual-people" id="people" aria-labelledby="people-heading">
      <picture>
        <source media="(max-width: 767px)" srcSet="/assets/balcony-laughter.webp" />
        <img className="people-photo" src="/assets/balcony-friends.webp" alt="Two friends sipping coffee during a balcony podcast, generated concept" loading="lazy" width="1440" height="810" />
      </picture>
      <div className="people-photo-copy">
        <h2 id="people-heading">People We’ve Met</h2>
        <p>There’s room<br />for you.</p>
      </div>
      <p className="people-photo-note">Client stories shared only with permission. People shown are generated concepts.</p>
    </section>
  );
}
