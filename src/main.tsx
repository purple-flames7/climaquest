import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { GameProvider } from "./context";
import { ErrorBoundary } from "./components";
import "./index.css";

import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("A new version of CLIMAQUEST is available. Reload now?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("CLIMAQUEST is ready to work offline 🚀");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <GameProvider>
          <App />
        </GameProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
