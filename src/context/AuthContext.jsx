import { createContext, useState } from "react";

export const AuthContext = createContext(null);

function AuthContextProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
