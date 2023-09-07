import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, getArticleCommentsById } from "../api";
import { UserContext } from "../contexts/User";
import ProfilePicture from "./common/ProfilePicture";
import LikeButton from "./common/LikeButton";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";
import Error from "./ErrorPage";
import "../css/Article.css";
import { updateArticleVotes } from "../api";

export default function ArticlePage() {
  const params = useParams();
  const article_id = params.article_id;
  const paramTopic = params.topic;

  const context = useContext(UserContext);
  const loggedUsername = context.username;

  const [articleData, setArticleData] = useState({});
  const { title, topic, author, body, votes, article_img_url } = articleData;

  const [articleVotes, setArticleVotes] = useState(0);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isCommentErr, setIsCommentErr] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then((articleData) => {
        setArticleData(articleData);
        setArticleVotes(articleData.votes);
      })
      .catch(setError);
    getArticleCommentsById(article_id)
      .then(setComments)
      .catch(() => setIsCommentErr(true));
  }, []);

  const updateVotes = (amount) => {
    console.log({ amount });
    setArticleVotes((votes) => votes + amount);
  };

  const path = (
    <h2>
      {paramTopic ? (
        <Link to={"/topics"}>Topics</Link>
      ) : (
        <Link to={"/"}>Home</Link>
      )}
      <span className="path-seperator">►</span>
      {paramTopic ? (
        <>
          <Link to={`/topics/${paramTopic}`}>
            <span>{paramTopic}</span>
          </Link>
          <span className="path-seperator">►</span>
          <Link to={`/topics/${paramTopic}/${article_id}`}>
            {articleData.title || "..."}
          </Link>
        </>
      ) : (
        <Link to={`/articles/${article_id}`}>{articleData.title || "..."}</Link>
      )}
    </h2>
  );

  if (error !== null) {
    return (
      <main>
        {path}
        <Error error={error} />
      </main>
    );
  }

  if (!articleData.article_id) {
    return <main>{path}</main>;
  }

  return (
    <main>
      {path}
      <article>
        <img className="article_img" src={article_img_url} />
        <div className="article_user-profile">
          {author ? <ProfilePicture author={author} /> : <></>}
          <span className={author === loggedUsername ? "this-user" : ""}>
            {author}
          </span>
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
      {isCommentErr ? (
        <p className="error-msg">Error loading comments</p>
      ) : (
        <>
          <CreateCommentForm
            article_id={article_id}
            setComments={setComments}
          />
          <section id="comments-wrap">
            {comments.map((comment) => {
              return (
                <Comment
                  setComments={setComments}
                  commentData={comment}
                  key={comment.comment_id || comment.body}
                />
              );
            })}
          </section>
        </>
      )}
    </main>
  );
}
