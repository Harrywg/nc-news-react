import { useState } from "react";

export default function CreateComment({ article_id }) {
  const [selected, setSelected] = useState(false);

  return (
    <form className="comment-form">
      <textarea
        onClick={() => setSelected(true)}
        placeholder="Add Comment"
      ></textarea>
      {selected ? (
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setSelected(false);
            }}
          >
            Cancel
          </button>

          <button>Submit</button>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
}
