import { useState, useEffect } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import "../css/HomePage.css";
export default function HomePage() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    getArticles().then((resArticles) => {
      setArticles(resArticles);
    });
  }, []);
  return (
    <main>
      <h2>Home</h2>
      <section id="article-card-wrap">
        {articles.map((article) => {
          return (
            <ArticleCard
              path={"/articles/"}
              article={article}
              key={article.article_id}
            />
          );
        })}
      </section>
    </main>
  );
}
