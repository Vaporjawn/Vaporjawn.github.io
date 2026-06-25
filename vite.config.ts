import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      }),
    },
    react(),
  ],
  // Use root path for custom domain (vaporjawn.dev)
  base: "/",
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime — changes rarely, long cache life
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // MUI component library — large but stable
          'mui-vendor': ['@mui/material', '@mui/icons-material'],
          // Animation library
          'animation-vendor': ['framer-motion'],
          // Charting library — used only by admin + activity pages
          'charts-vendor': ['recharts'],
          // Firebase SDK — used only by admin, analytics, blog services
          'firebase-vendor': [
            'firebase/app',
            'firebase/auth',
            'firebase/firestore',
            'firebase/storage',
            'firebase/analytics',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
