import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import SortQueries from "./common/SortQueries";
import "../css/HomePage.css";
export default function TopicPage() {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [queryData, setQueryData] = useState({
    sort_by: "created_at",
    order: "DESC",
  });
  const { sort_by, order } = queryData;
  const observerTarget = useRef(null);
  const [isFinished, setIsFinished] = useState(false);
  const [p, setP] = useState(1);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        <div ref={observerTarget} id="infinite-scroll-el"></div>;
        if (entries[0].isIntersecting) {
          if (isFinished || !articles.length) {
            return;
          }
          const params = { topic, sort_by, order, p: p + 1 };
          setP(p + 1);
          getArticles(params).then((resArticles) => {
            if (resArticles.length < 10) setIsFinished(true);
            setArticles([...articles, ...resArticles]);
          });
        }
      },
      { threshold: 1 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [articles, queryData]);

  useEffect(() => {
    getArticles({ topic, sort_by, order }).then((resArticles) => {
      setArticles(resArticles);
    });
  }, [queryData]);
  return (
    <main>
      <div className="title-sort-wrap">
        <h2>
          <Link to={"/topics"}>Topics</Link>
          <span className="path-seperator">►</span>
          <span>
            <Link>{topic}</Link>
          </span>
        </h2>
        <SortQueries queryData={queryData} setQueryData={setQueryData} />
      </div>
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
      <div ref={observerTarget} id="infinite-scroll-el"></div>
    </main>
  );
}
