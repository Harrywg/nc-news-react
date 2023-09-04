import ProfilePicture from "./common/ProfilePicture";
import "../css/Article.css";
export default function Article({ articleData }) {
  const { title, topic, author, body, votes, article_img_url } = articleData;
  return (
    <article>
      <div className="article_user-profile">
        {author ? <ProfilePicture author={author} /> : <></>}
        <span>{author}</span>
      </div>
      <h3>{title}</h3>
      <img className="article_img" src={article_img_url} />
      <p>{body}</p>
    </article>
  );
}
