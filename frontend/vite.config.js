import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // 4kb inline for fast icons/small svgs
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'lucide-icons': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});
