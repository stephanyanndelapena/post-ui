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
          target: 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
    // Production build: write to backend static folder.
    // Assumes frontend folder is inside backend project root (frontend/)
    build: {
      outDir: path.resolve(__dirname, '../src/main/resources/static'),
      emptyOutDir: true,
    },
  }
})