import ProfilePicture from "./common/ProfilePicture";

export default function Comment(props) {
  const { body, author, username } = props.commentData;
  return (
    <article className="comment">
      <div className="comment-title">
        <ProfilePicture author={author || username} />
        <p>{author}</p>
      </div>
      <p>{body}</p>
    </article>
  );
}
