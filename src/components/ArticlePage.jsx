import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, getArticleCommentsById } from "../api";
import ProfilePicture from "./common/ProfilePicture";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";
import "../css/Article.css";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState({});
  const { title, topic, author, body, votes, article_img_url } = articleData;

  const [comments, setComments] = useState([]);
  useEffect(() => {
    getArticleById(article_id).then(setArticleData);
    getArticleCommentsById(article_id).then(setComments);
  }, []);

  return (
    <main>
      <h2>
        <Link to={"/"}>Home</Link> ►
        <Link to={`/articles/${article_id}`}>{articleData.title || "..."}</Link>
      </h2>
      <article>
        <div className="article_user-profile">
          {author ? <ProfilePicture author={author} /> : <></>}
          <span>{author}</span>
        </div>
        <h3>{title}</h3>
        <img className="article_img" src={article_img_url} />
        <p>{body}</p>
      </article>
      <CreateCommentForm article_id={article_id} />
      <section id="comments-wrap">
        {comments.map((comment) => {
          return <Comment commentData={comment} key={comment.comment_id} />;
        })}
      </section>
    </main>
  );
}
