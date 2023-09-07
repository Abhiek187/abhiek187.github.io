import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  // https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
  define: {
    "process.env": {},
  },
  build: {
    outDir: "build", // dist by default
  },
  resolve: {
    alias: {
      "node-fetch": "isomorphic-fetch",
    },
  },
  plugins: [
    react(),
    eslint(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        // Don't precache files more than 2 MB
        globPatterns: ["**/*.{js,css,html,ico,jpg,png,svg,pdf,webp}"],
        // Exclude routes belonging to other repos
        navigateFallbackAllowlist: [/^\/$/, /^\/#\//],
      },
      manifest: {
        short_name: "Abhishek Chaudhuri",
        name: "Abhishek Chaudhuri - Portfolio Website",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "icon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        start_url: "/",
        display: "minimal-ui",
        theme_color: "#000000",
        background_color: "#ffffff",
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/utils/setupTests.ts",
  },
});
