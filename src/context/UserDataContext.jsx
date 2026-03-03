import { createContext, useEffect, useState, useCallback } from "react";
import { getLoggedUserData } from "../services/PostsServices";

export const UserContext = createContext();

const DUMMY_USER = {
  id: 1,
  username: "Asmaa Nassef",
  name: "Asmaa Nassef",
  email: "asmaa@example.com",
  image: "https://i.pravatar.cc/150?img=5",
  avatar: "https://i.pravatar.cc/150?img=5",
};

function normalizeUser(data) {
  if (!data) return DUMMY_USER;
  const normalized = { ...data };
  if (normalized.image && !normalized.avatar)
    normalized.avatar = normalized.image;
  if (normalized.avatar && !normalized.image)
    normalized.image = normalized.avatar;
  return normalized;
}

function UserContextProvider({ children }) {
  const storedToken = localStorage.getItem("token") || "";
  const isDummy = !storedToken || storedToken.startsWith("dummy-token-");

  const [userData, setUserData] = useState(isDummy ? DUMMY_USER : null);
  const [isLoading, setIsLoading] = useState(!isDummy);
  const [token, setToken] = useState(storedToken);

  const fetchLoggedUserData = useCallback(async (activeToken) => {
    if (!activeToken || activeToken.startsWith("dummy-token-")) {
      setUserData(DUMMY_USER);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await getLoggedUserData(activeToken);
      setUserData(normalizeUser(data));
    } catch {
      setUserData(DUMMY_USER);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLoggedUserData(token);
  }, [token, fetchLoggedUserData]);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, isLoading, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
