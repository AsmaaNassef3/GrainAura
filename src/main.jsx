import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext";
import UserContextProvider from "./context/UserDataContext.jsx";


import "./index.css";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <HeroUIProvider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ToastContainer />
          </QueryClientProvider>
        </HeroUIProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>
);  