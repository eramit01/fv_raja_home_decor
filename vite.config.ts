import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Force redeploy - removing unused date-fns reference
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    // Allow Vite to choose the next available port if 5173 is taken
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,

  }
});
