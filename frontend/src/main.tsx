import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import AuthContextProvider from "./context/authContextProvider.tsx";
import "./index.css";
import { PageProvider } from "./context/pageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <PageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PageProvider>
    </AuthContextProvider>
  </StrictMode>
);
