import { createContext, useEffect, useState } from "react";
import { getUserByUsername } from "../api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("username")) || ""
  );

  const [user, setUser] = useState({});

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", JSON.stringify(username));
      getUserByUsername(username).then((user) => {
        setUser(user);
      });
    } else {
      localStorage.setItem("username", null);
    }
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername, user }}>
      {children}
    </UserContext.Provider>
  );
};
