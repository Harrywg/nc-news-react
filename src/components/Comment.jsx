import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { deleteComment } from "../api";
import ProfilePicture from "./common/ProfilePicture";

export default function Comment(props) {
  const context = useContext(UserContext);
  const loggedUsername = context.username;
  const { body, author, username, comment_id, isError } = props.commentData;
  const { setComments, commentData } = props;
  const handleDelete = (e) => {
    let prevComments;
    let thisComment;
    setComments((currentComments) => {
      thisComment = currentComments.findIndex((comment) => {
        return comment.comment_id === comment_id;
      });
      prevComments = currentComments;
      return currentComments.filter((comment) => {
        return comment.comment_id !== comment_id;
      });
    });
    deleteComment(comment_id).catch(() => {
      prevComments[thisComment].isError = true;
      setComments(prevComments);
    });
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
      {isError ? (
        <p className="error-msg comment-error">Something went wrong</p>
      ) : (
        <></>
      )}
    </article>
  );
}
