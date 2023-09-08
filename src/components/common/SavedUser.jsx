import ProfilePicture from "./ProfilePicture";
import { useContext } from "react";
import { UserContext } from "../../contexts/User";

export default function SavedUser({ user }) {
  const { setUsername } = useContext(UserContext);

  const { username } = user;
  return (
    <a
      onClick={() => {
        setUsername(username);
      }}
      className="login-saved-user"
    >
      <p>{username}</p>
      <ProfilePicture author={username} />
    </a>
  );
}
