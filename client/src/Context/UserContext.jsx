import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  console.log("in context api")
  
  async function fetchData() {
    if (!user) {
      const user = await axios.get("/profile");
      console.log("I am here---",user);
      if (user.data.success) {
        setUser(user.data.result);
        setReady(true);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
