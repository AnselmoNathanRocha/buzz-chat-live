import react from "@vitejs/plugin-react";
import * as path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*$/,
            handler: "CacheFirst", 
            options: {
              cacheName: "google-fonts",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|gif|svg)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 20,
              },
            },
          },
        ],
      },
      manifest: {
        name: "Buzz Chat Live",
        short_name: "BuzzChat",
        description: "",
        theme_color: "#aadddd",
        background_color: "#aadddd",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/chat192.png", // Caminho do ícone
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/chat512.png", // Caminho do ícone
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    open: true,
  },
  optimizeDeps: {
    include: ["stompjs"],
  },
  define: {
    global: {},
  },
});
