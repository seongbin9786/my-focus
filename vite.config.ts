import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
    sentryVitePlugin({
      org: "jojaehun",
      project: "javascript-react",
      telemetry: false,
    }),
  ],

  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },

  build: {
    sourcemap: true,
  },
});
