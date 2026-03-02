import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext";
import UserContextProvider from "./context/UserDataContext.jsx";


import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <HeroUIProvider>
          <App />
          <ToastContainer />
        </HeroUIProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>
);  