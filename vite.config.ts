import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
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
        description:
          "Learn more about Abhishek Chaudhuri: Rutgers Alumnus & Software Engineer on his personal website. Check out his portfolio of projects ranging from web development, mobile development, game design, and machine learning.",
        icons: [
          {
            src: "favicon.ico",
            sizes: "48x48",
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
            purpose: "any",
          },
        ],
        start_url: "/",
        display: "minimal-ui",
        theme_color: "#000000",
        background_color: "#ffffff",
        screenshots: [
          {
            src: "screenshots/screenshot-desktop.png",
            sizes: "2360x1640",
            type: "image/png",
            form_factor: "wide",
            label: "Home screen",
          },
          {
            src: "screenshots/screenshot-mobile.png",
            sizes: "1082x2402",
            type: "image/png",
            form_factor: "narrow",
            label: "Home screen",
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/utils/setupTests.ts",
    coverage: {
      provider: "v8",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
