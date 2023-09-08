import { useState, useContext, useEffect } from "react";
import { UserContext } from "./contexts/User";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import ArticlePage from "./components/ArticlePage";
import TopicsPage from "./components/TopicsPage";
import TopicPage from "./components/TopicPage";
import CreatePostPage from "./components/CreatePostPage";
import UserLoginPage from "./components/UserLoginPage";
import ProfilePicture from "./components/common/ProfilePicture";
import { Routes, Route, Link } from "react-router-dom";
import Error from "./components/ErrorPage";

function App() {
  const { username, setUsername } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!username) navigate("/login");
  }, [username]);

  return (
    <>
      <Header />
      <div className={username === "" ? "page-wrap_login" : ""} id="page-wrap">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:topic" element={<TopicPage />} />
          <Route path="/topics/:topic/:article_id" element={<ArticlePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/login" element={<UserLoginPage />}></Route>
          <Route path="/*" element={<Error error={{ code: 404 }} />} />
        </Routes>

        {username ? (
          <div className="sidebar">
            <div className="user-wrap">
              <Link
                onClick={() => setUsername("")}
                id="log-out"
                className="menu-link"
              >
                Log Out
              </Link>
              <div id="username-picture-wrap">
                <p>{username}</p>
                <ProfilePicture author={username} />
              </div>
            </div>

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
              <Link
                to="/create-post"
                className="menu-link"
                id="create-post-link"
              >
                Create Post
              </Link>
              <footer>
                <p>This is a demo project by Harry Ward-Gray.</p>

                <a
                  href="https://github.com/Harrywg/nc-news-react"
                  target="_blank"
                >
                  GitHub
                </a>
                <a href="https://github.com/Harrywg/nc-news" target="_blank">
                  Backend
                </a>
                <p>You can find me here:</p>
                <a
                  href="https://www.linkedin.com/in/harry-ward-gray/"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a href="https://harrywg.dev/" target="_blank">
                  Portfolio
                </a>
              </footer>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
