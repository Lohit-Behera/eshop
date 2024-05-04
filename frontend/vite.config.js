import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://eshop-backend-nine.vercel.app',
        changeOrigin: true,
        secure: false,
      },
      '/images': {
        target: 'https://eshop-backend-nine.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})