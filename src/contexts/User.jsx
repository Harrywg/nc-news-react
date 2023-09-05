import { createContext, useEffect, useState } from "react";
import { getUserByUsername } from "../api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("tickle122");

  const [user, setUser] = useState({});

  useEffect(() => {
    getUserByUsername(username).then((user) => {
      setUser(user);
    });
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername, user }}>
      {children}
    </UserContext.Provider>
  );
};
