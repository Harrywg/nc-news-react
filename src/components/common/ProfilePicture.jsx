import { useState, useEffect } from "react";
import { getUserByUsername } from "../../api";

export default function ProfilePicture(username) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    getUserByUsername(username).then((user) => {
      setUrl(user.avatar_url);
    });
  }, [username]);
  return url ? <img src={url} className="user-avatar" /> : <></>;
}
