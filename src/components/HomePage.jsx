import { useState, useEffect } from "react";
import { getArticles } from "../api";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import SortQueries from "./common/SortQueries";
import "../css/HomePage.css";
export default function HomePage() {
  const [articles, setArticles] = useState([]);

  const [queryData, setQueryData] = useState({
    sort_by: "created_at",
    order: "DESC",
  });
  const { sort_by, order } = queryData;

  useEffect(() => {
    getArticles({ sort_by, order }).then((resArticles) => {
      setArticles(resArticles);
    });
  }, [queryData]);

  return (
    <main>
      <div className="title-sort-wrap">
        <h2>Home</h2>
        <SortQueries queryData={queryData} setQueryData={setQueryData} />
      </div>

      <section id="article-card-wrap">
        <div className="home-mobile-links">
          <Link to={"/topics"}>Topics</Link>
          <Link to={"/create-post"}>Create Post</Link>
        </div>
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
