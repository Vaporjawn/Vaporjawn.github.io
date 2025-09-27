import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use root path for local development, GitHub Pages path for production
  base: process.env.NODE_ENV === "production" ? "/Vaporjawn.github.io/" : "/",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
