import { createContext, useEffect, useState } from "react";
import { getLoggedUserData } from "../services/PostsServices";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [userData, setUserData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  async function fetchLoggedUserData() {
    setIsLoading(true);
    try {
      const { data } = await getLoggedUserData();
      console.log("Logged user data:", data);
      // Normalize so both `image` and `avatar` are always set
      const normalized = { ...data };
      if (normalized.image && !normalized.avatar)
        normalized.avatar = normalized.image;
      if (normalized.avatar && !normalized.image)
        normalized.image = normalized.avatar;
      setUserData(normalized);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchLoggedUserData();
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, isLoading, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
