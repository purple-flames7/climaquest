import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { ErrorBoundary } from "./components";
import "./index.css";

import { registerSW } from "virtual:pwa-register";

/** 
 *Register the service worker for PWA support. 
 Handles update prompts and offline readiness. 
*/

const updateSW = registerSW({
  // Called when a new version of the app is available. Asks user before reloading.

  onNeedRefresh() {
    if (confirm("A new version of CLIMAQUEST is available. Reload now?")) {
      updateSW(true);
    }
  },

  // Called once the app is cached and ready to work offline.

  onOfflineReady() {
    console.log("CLIMAQUEST is ready to work offline 🚀");
  },
});

/** Create and render the React root.
 * The app is wrapped with:
 * StrictMode: highlights potential problems in development
 * ErrorBoundary: catches unexpected runtime errors
 * BrowserRouter: enables client-side routing
 */

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
