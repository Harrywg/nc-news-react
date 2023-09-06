import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticlesByTopic } from "../api";
import ArticleCard from "./ArticleCard";
import "../css/HomePage.css";
export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  useEffect(() => {
    getArticlesByTopic(topic).then((resArticles) => {
      setArticles(resArticles);
    });
  }, []);
  return (
    <main>
      <h2>
        <Link to={"/topics"}>Topics</Link>
        <span className="path-seperator">►</span>
        <span>
          <Link>{topic}</Link>
        </span>
      </h2>
      <section id="article-card-wrap">
        {articles.map((article) => {
          return (
            <ArticleCard
              path={"/topics/" + topic + "/"}
              article={article}
              key={article.article_id}
            />
          );
        })}
      </section>
    </main>
  );
}
