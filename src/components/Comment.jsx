import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteComment } from "../api";
import ProfilePicture from "./common/ProfilePicture";

export default function Comment(props) {
  const context = useContext(UserContext);
  const loggedUsername = context.username;
  const { body, author, username, comment_id } = props.commentData;
  const { setComments, commentData } = props;
  const [isError, setIsError] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (e) => {
    setIsDeleted(true);
    deleteComment(comment_id).catch(() => {
      setIsDeleted(false);
      setIsError(true);
    });
  };

  if (isDeleted) {
    return <p className="deleted-comment"> This comment has been deleted.</p>;
  }

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
      {isError ? (
        <p className="error-msg comment-error">Something went wrong</p>
      ) : (
        <></>
      )}
    </article>
  );
}
