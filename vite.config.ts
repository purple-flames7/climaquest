/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "icons/*",
      ],

      manifest: {
        name: "CLIMAQUEST",
        short_name: "CLIMAQUEST",
        description:
          "A fun, accessible, inclusive and educationl climate game.",
        theme_color: "#4caf50",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",

        icons: [
          {
            src: "icons/logo-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/logo-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/logo-icon-512x512-buffer.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              ["document", "script", "style", "image", "font"].includes(
                request.destination
              ),
            handler: "CacheFirst",
            options: {
              cacheName: "climaquest-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
              },
            },
          },
        ],
      },
    }),
  ],
});
