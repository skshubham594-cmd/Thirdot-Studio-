export default function About() {
  return (
    <section className="section visual-about" id="welcome-home" aria-labelledby="about-heading">
      <div className="home-collage">
        <img className="collage-main" src="/assets/balcony-friends.webp" alt="Two friends sharing coffee and recording a podcast on a leafy balcony, a generated concept" width="1440" height="810" loading="lazy" />
        <img className="collage-inset" src="/assets/balcony-coffee.webp" alt="Coffee cups and a notebook on the balcony table, a generated concept" width="1200" height="800" loading="lazy" />
      </div>
      <div className="home-caption">
        <p className="section-name">Welcome Home</p>
        <h2 id="about-heading">Come as <br />you are.</h2>
        <p>A little coffee. <br />A good conversation. <br />Something worth making.</p>
        <details className="brand-story">
          <summary>Why Third Dot? <span className="plus" aria-hidden="true">+</span></summary>
          <div>
            <p>Every relationship starts with two points: you and us.</p>
            <p>But meaningful work doesn’t begin until a third point appears. The point where trust forms, stories are exchanged, ideas take shape, and collaboration feels natural.</p>
            <p>That’s the Third Dot. A home that became a studio. A studio that still feels like home.</p>
            <p>Not a place to pitch. A place to pause. To think. To chat over coffee. To make something meaningful together.</p>
          </div>
        </details>
      </div>
    </section>
  );
}
