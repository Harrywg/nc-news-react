import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, getArticleCommentsById } from "../api";
import ProfilePicture from "./common/ProfilePicture";
import LikeButton from "./common/LikeButton";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";
import "../css/Article.css";
import likeImg from "../assets/like.png";
import commentImg from "../assets/chat.png";
import { updateArticleVotes } from "../api";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState({});
  const { title, topic, author, body, votes, article_img_url } = articleData;

  const [articleVotes, setArticleVotes] = useState(0);

  const [comments, setComments] = useState([]);

  useEffect(() => {
    getArticleById(article_id).then((articleData) => {
      setArticleData(articleData);
      setArticleVotes(articleData.votes);
    });
    getArticleCommentsById(article_id).then(setComments);
  }, []);

  const updateVotes = (amount) => {
    console.log({ amount });
    setArticleVotes((votes) => votes + amount);
  };

  if (!articleData.article_id) {
    return (
      <main>
        <h2>
          <Link to={"/"}>Home</Link> ►
          <Link to={`/articles/${article_id}`}>
            {articleData.title || "..."}
          </Link>
        </h2>
      </main>
    );
  }

  return (
    <main>
      <h2>
        <Link to={"/"}>Home</Link> ►
        <Link to={`/articles/${article_id}`}>{articleData.title || "..."}</Link>
      </h2>
      <article>
        <img className="article_img" src={article_img_url} />
        <div className="article_user-profile">
          {author ? <ProfilePicture author={author} /> : <></>}
          <span>{author}</span>
        </div>
        <h3>{title}</h3>
        <p>{body}</p>
        <footer className="article_user-interaction">
          <LikeButton
            like={true}
            updateVotes={updateVotes}
            patchTarget={updateArticleVotes}
            targetId={article_id}
          />
          <span className="like-count">{articleVotes}</span>
          <LikeButton
            like={false}
            updateVotes={updateVotes}
            patchTarget={updateArticleVotes}
            targetId={article_id}
          />
        </footer>
      </article>
      <CreateCommentForm article_id={article_id} setComments={setComments} />
      <section id="comments-wrap">
        {comments.map((comment) => {
          return (
            <Comment
              commentData={comment}
              key={comment.comment_id || comment.body}
            />
          );
        })}
      </section>
    </main>
  );
}
