import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import ProfilePicture from "./common/ProfilePicture";
import { Link } from "react-router-dom";
export default function Header() {
  const { username, setUsername } = useContext(UserContext);
  const [isNavHidden, setIsNavHidden] = useState(true);

  const switchNav = () => setIsNavHidden((isHidden) => !isHidden);

  if (!username) return;

  return (
    <>
      <header>
        <div className="header_title-nav-wrap">
          <Link id="title-link" to={"/"}>
            <h1>NC News</h1>
          </Link>
          <nav className="header_nav">
            <Link onClick={switchNav} to="/">
              Home
            </Link>
            <Link onClick={switchNav} to="/topics">
              Topics
            </Link>
            <Link to="/create-post" onClick={switchNav}>
              Create Post
            </Link>
            <div id="header-avatar">
              <Link onClick={() => setUsername("")} id="log-out">
                Log Out
              </Link>
              <ProfilePicture author={username} />
              <p className="this-user">{username}</p>
            </div>
          </nav>
        </div>
        <div id="header_nav-mobile-pic-button-wrap">
          <ProfilePicture
            author={username}
            className={
              isNavHidden ? "header_nav-mobile-avatar-top" : "hide-avatar"
            }
          />
          <button onClick={switchNav} id="header_nav-mobile-button"></button>
        </div>
      </header>
      <div
        className={
          isNavHidden ? "header_nav-mobile" : "header_nav-mobile show-nav"
        }
      >
        <nav>
          <Link onClick={switchNav} to="/">
            Home
          </Link>
          <Link onClick={switchNav} to="/topics">
            Topics
          </Link>
          <Link onClick={switchNav} to="/create-post">
            Create Post
          </Link>
        </nav>
        <div id="header-avatar">
          <Link
            onClick={() => {
              switchNav();
              setUsername("");
            }}
            id="log-out"
          >
            Log Out
          </Link>
          <p className="this-user">{username}</p>
          <ProfilePicture author={username} />
        </div>
      </div>
    </>
  );
}
