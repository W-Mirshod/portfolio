import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Enable source maps for production debugging
    sourcemap: false,
    // Optimize bundle size
    minify: 'esbuild',
    // Target modern browsers for better optimization
    target: 'esnext',
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk for React and core dependencies
          vendor: ['react', 'react-dom'],
          // Router chunk
          router: ['react-router-dom'],
          // Icons chunk (loaded on demand)
          icons: ['react-icons', 'lucide-react'],
          // i18n chunk
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector']
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Enable tree shaking
    modulePreload: {
      polyfill: false
    }
  },
  // Optimize dev server
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    }
  }
})
