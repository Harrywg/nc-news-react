export default function ArticleCard(props) {
  const { title, articleId, topic, author, img_url, votes } = props;
  return (
    <article>
      <div className="article-card_text-wrap">
        <p>{author}</p>
        <h3>{title}</h3>
      </div>
      <div className="article-card_img-wrap">
        <div className="article-card_upvotes-wrap">
          <button>Up</button>
          <span>{votes}</span>
          <button>Down</button>
        </div>
        <img src={img_url} />
      </div>
    </article>
  );
}
