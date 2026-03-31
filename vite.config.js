import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://crunchyho-3kbk.onrender.com',
        changeOrigin: true
      },
      '/uploads': {
        target: 'https://crunchyho-3kbk.onrender.com',
        changeOrigin: true
      }
    }
  }
})
