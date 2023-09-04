import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById } from "../api";
import Article from "./Article";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [articleData, setArticleData] = useState({});

  useEffect(() => {
    getArticleById(article_id).then(setArticleData);
  }, []);

  return (
    <main>
      <h2>
        <Link to={"/"}>Home</Link> ►
        <Link to={`/articles/${article_id}`}>{articleData.title || "..."}</Link>
      </h2>
      <Article articleData={articleData} />
      <Comment article_id={article_id} />
      <CreateCommentForm article_id={article_id} />
    </main>
  );
}
