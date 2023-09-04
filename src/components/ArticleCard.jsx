import { Link } from "react-router-dom";
import ProfilePicture from "./common/ProfilePicture";
export default function ArticleCard(props) {
  const {
    title,
    article_id,
    topic,
    author,
    article_img_url,
    votes,
    article,
    comment_count,
  } = props.article;

  return (
    <Link
      to={`/articles/${article_id}`}
      onClick={() => {
        console.log({ article_id });
      }}
      className="article-card"
    >
      <div className="article-card_text-wrap">
        <p>
          <ProfilePicture username={author} />
          {author}
        </p>
        <div className="article-card_header-wrap">
          <h3>{title}</h3>
          <span className="article-card_topic tag">{topic}</span>
        </div>
      </div>
      <figure className="article-card_img-wrap">
        <div className="article-card_votes-wrap">
          <span className="article-card_votes">{votes}⬆</span>
          <span>{comment_count}✉</span>
        </div>
        <img src={article_img_url} />
      </figure>
    </Link>
  );
}
