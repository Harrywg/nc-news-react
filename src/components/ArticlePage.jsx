import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, getArticleCommentsById } from "../api";
import Article from "./Article";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState({});
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
      <Article articleData={articleData} />
      <CreateCommentForm article_id={article_id} />
      <section id="comments-wrap">
        {comments.map((comment) => {
          return <Comment commentData={comment} key={comment.comment_id} />;
        })}
      </section>
    </main>
  );
}
