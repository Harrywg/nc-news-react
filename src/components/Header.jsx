import { useContext } from "react";
import { UserContext } from "../contexts/User";
import ProfilePicture from "./common/ProfilePicture";
import { Link } from "react-router-dom";
export default function Header() {
  const { username } = useContext(UserContext);
  return (
    <header>
      <div className="header_title-nav-wrap">
        <h1>NC News</h1>
        <nav className="header_nav">
          <Link to="/">Home</Link>
          <Link to="/topics">Topics</Link>
          <Link to="/">Create Post</Link>
        </nav>
      </div>{" "}
    </header>
  );
}
