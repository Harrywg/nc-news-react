import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { postCommentByArticleId } from "../api";

export default function CreateComment({ article_id, setComments }) {
  const [selected, setSelected] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [isError, setIsError] = useState(false);
  const { username } = useContext(UserContext);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!commentBody.length) {
          return;
        }
        setSelected(false);
        setIsError(false);
        const reqBody = { body: commentBody, username };
        setCommentBody("");
        const localRef = String(Math.random());
        setComments((currentComments) => {
          return [
            { body: commentBody, author: username, localRef },
            ...currentComments,
          ];
        });
        postCommentByArticleId(article_id, reqBody)
          .then(({ data }) => {
            const resComment = data.comment;
            setComments((currentComments) => {
              return currentComments.map((comment) => {
                if (comment.localRef === localRef) {
                  return { ...resComment };
                }
                return comment;
              });
            });
          })
          .catch(() => {
            setIsError(true);
            setComments((currentComments) => {
              return currentComments.filter((comment) => {
                if (!comment.localRef) return true;
                return !comment.localRef === localRef;
              });
            });
          });
      }}
      className="comment-form"
    >
      <textarea
        name="commentBody"
        onClick={() => setSelected(true)}
        onChange={(e) => {
          setCommentBody(e.target.value);
        }}
        value={commentBody}
        placeholder="Add Comment"
      ></textarea>
      {selected ? (
        <div>
          <button
            type="reset"
            onClick={(e) => {
              setIsError(false);
              setCommentBody("");
              setSelected(false);
            }}
          >
            Cancel
          </button>

          <button type="submit">Submit</button>
        </div>
      ) : (
        <></>
      )}
      {isError ? <p className="error-msg">Something went wrong</p> : <></>}{" "}
    </form>
  );
}
