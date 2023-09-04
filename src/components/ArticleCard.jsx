export default function ArticleCard(props) {
  const { title, articleId, topic, author, article_img_url, votes, article } =
    props.article;
  return (
    <article className="article-card">
      <div className="article-card_text-wrap">
        <p>{author}</p>
        <div className="article-card_header-wrap">
          <h3>{title}</h3>
          <span className="article-card_topic tag">{topic}</span>
        </div>
      </div>
      <figure className="article-card_img-wrap">
        <div className="article-card_votes-wrap">
          <span className="article-card_votes">{votes}⬆</span>
        </div>
        <img src={article_img_url} />
      </figure>
    </article>
  );
}
