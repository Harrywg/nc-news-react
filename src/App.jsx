import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import ArticlePage from "./components/ArticlePage";
import TopicsPage from "./components/TopicsPage";
import TopicPage from "./components/TopicPage";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div id="page-wrap">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:topic" element={<TopicPage />} />
        </Routes>
        <div id="menu-wrap">
          <Link
            className="menu-link"
            to="/"
            onClick={() => window.scrollTo(0, 0)}
          >
            Home
          </Link>
          <Link to="/topics" className="menu-link">
            Topics
          </Link>
          <Link className="menu-link" id="create-post-link">
            Create Post
          </Link>
          <footer>
            <a>Footer link</a>
            <a>Footer link</a>
            <a>Footer link</a>
            <a>Footer link</a>
            <p>
              NC News, Inc. © 2023.
              <br /> All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
