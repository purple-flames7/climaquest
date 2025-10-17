// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { checkAppVersion } from "./utils/version-check.ts";
import { GameProvider } from "./context/game-provider.tsx";
import "./index.css";

checkAppVersion();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GameProvider>
        <App />
      </GameProvider>
    </BrowserRouter>
  </StrictMode>
);
