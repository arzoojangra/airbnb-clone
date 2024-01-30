import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  
  async function fetchData() {
    if (!user) {
      const user = await axios.get("/profile");
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
