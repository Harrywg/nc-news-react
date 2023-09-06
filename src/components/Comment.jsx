import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { deleteComment } from "../api";
import ProfilePicture from "./common/ProfilePicture";

export default function Comment(props) {
  const context = useContext(UserContext);
  const loggedUsername = context.username;
  const { body, author, username, comment_id } = props.commentData;
  const handleDelete = (e) => {
    deleteComment(comment_id).then(() => console.log("success"));
  };
  return (
    <article className="comment">
      <div className="comment-title">
        <ProfilePicture author={author || username} />
        <p className={loggedUsername === author ? "this-user" : ""}>{author}</p>
      </div>
      <p>{body}</p>
      {loggedUsername === author ? (
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      ) : (
        <></>
      )}
    </article>
  );
}
