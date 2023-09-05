import { useState, useEffect } from "react";
import { getTopics } from "../api";
import { Link } from "react-router-dom";
import "../css/TopicsPage.css";
export default function TopicsPage() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <main>
      <h2>Topics</h2>
      <nav id="topics-wrap">
        {topics.map((topic) => {
          return (
            <Link
              to={"/topics/" + topic.slug}
              className="topic"
              key={topic.slug}
            >
              <h3>{topic.slug}</h3>
              <p>{topic.description}</p>
            </Link>
          );
        })}
      </nav>
    </main>
  );
}
