import ProfilePicture from "./common/ProfilePicture";
import "../css/Article.css";
export default function Article({ articleData }) {
  const { title, topic, author, body, votes, article_img_url } = articleData;
  return (
    <article>
      <div className="article_user-profile">
        <ProfilePicture username={author} />
        <span>{author}</span>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
