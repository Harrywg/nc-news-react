import { useState, useEffect } from "react";
import { getUserByUsername } from "../../api";

export default function ProfilePicture({ author, id, className }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    getUserByUsername(author).then((user) => {
      setUrl(user.avatar_url);
    });
  }, [author]);

  return url ? (
    <img src={url} id={id} className={"user-avatar " + className} />
  ) : (
    <></>
  );
}
