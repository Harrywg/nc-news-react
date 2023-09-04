import { useState, useEffect } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
export default function HomePage() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getArticles().then((resArticles) => {
      setArticles(resArticles);
    });
  }, []);
  return (
    <main>
      {articles.map((article) => {
        return (
          <ArticleCard
            title={article.title}
            key={article.article_id}
            articleId={article.article_id}
            topic={article.topic}
            author={article.author}
            img_url={article.article_img_url}
            votes={article.votes}
          />
        );
      })}
    </main>
  );
}
