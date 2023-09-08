import "../css/UserLogin.css";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";
import SavedUser from "./common/SavedUser";

import { getUsers } from "../api";

export default function UserLoginPage() {
  const [users, setUsers] = useState([]);
  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const body = document.body;
    body.classList.add("body-login");

    getUsers().then(({ users }) => setUsers(users));

    return () => {
      const body = document.body;
      body.classList.remove("body-login");
    };
  }, []);

  useEffect(() => {
    if (username) {
      navigate("/");
    }
  }, [username]);

  return (
    <main id="login-main">
      <h1>NC NEWS</h1>
      <h2>Login</h2>
      <p>Saved users:</p>
      <p>(Pick anyone)</p>

      <div id="login-saved-users">
        {users.map((user) => {
          return <SavedUser key={user.username} user={user} />;
        })}
      </div>
    </main>
  );
}
