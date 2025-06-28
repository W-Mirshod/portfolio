import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: []
    }
  },
  optimizeDeps: {
    include: ['react-tsparticles', 'tsparticles']
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
})
