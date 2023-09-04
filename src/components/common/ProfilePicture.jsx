import { useState, useEffect } from "react";
import { getUserByUsername } from "../../api";

export default function ProfilePicture({ author }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    getUserByUsername(author).then((user) => {
      setUrl(user.avatar_url);
    });
  }, [author]);

  return url ? <img src={url} className="user-avatar" /> : <></>;
}
