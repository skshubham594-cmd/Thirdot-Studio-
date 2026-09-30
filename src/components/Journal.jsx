import { articles } from '../content.js';

export default function Journal() {
  return (
    <section className="section visual-journal" id="around-the-table" aria-labelledby="journal-heading">
      <h2 id="journal-heading">Around the Table</h2>
      <div className="journal-photo-list">
        {articles.map((article) => (
          <details key={article.title} className="photo-article">
            <summary>
              <div className="article-thumbnail">
                <img src={article.image} alt={article.alt} loading="lazy" width="600" height="400" />
              </div>
              <div className="article-heading-copy">
                <h3>{article.title}</h3>
                <span className="article-chevron" aria-hidden="true">↗</span>
              </div>
            </summary>
            <div className="photo-article-body">
              {article.paragraphs.map((text) => <p key={text.slice(0, 40)}>{text}</p>)}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
