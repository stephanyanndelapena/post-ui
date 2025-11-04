import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        // forward API requests to Spring Boot
        '/api': {
          target: 'https://facebook-api-9q56.onrender.com',
          changeOrigin: true,
        },
      },
    },
    // Production build: write to backend static folder.
    // Assumes frontend folder is inside backend project root (frontend/)
    build: {
      outDir: 'dist', 
      emptyOutDir: true,
    },
  }
})