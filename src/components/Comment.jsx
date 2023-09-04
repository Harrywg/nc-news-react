import ProfilePicture from "./common/ProfilePicture";

export default function Comment(props) {
  const { body, author } = props.commentData;
  return (
    <article className="comment">
      <div className="comment-title">
        <ProfilePicture author={author} />
        <p>{author}</p>
      </div>
      <p>{body}</p>
    </article>
  );
}
