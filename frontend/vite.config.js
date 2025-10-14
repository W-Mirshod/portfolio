import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: 'brotliCompress' }),
    compression({ algorithm: 'gzip' }),
    visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true })
  ],
  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React chunk
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-core';
          }
          
          // Router chunk
          if (id.includes('react-router')) {
            return 'router';
          }
          
          // FontAwesome chunk (large library)
          if (id.includes('@fortawesome')) {
            return 'fontawesome';
          }
          
          // Icons chunk
          if (id.includes('react-icons') || id.includes('lucide-react')) {
            return 'icons';
          }
          
          // i18n chunk
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n';
          }
          
          // Component chunks for better caching
          if (id.includes('/components/sections/')) {
            const sectionName = id.split('/').pop().replace('.jsx', '');
            return `section-${sectionName.toLowerCase()}`;
          }
          
          // Utils chunk
          if (id.includes('/utils/')) {
            return 'utils';
          }
          
          // Vendor chunk for other dependencies
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    cssCodeSplit: true,
    modulePreload: {
      polyfill: false
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable tree shaking
    treeshake: {
      moduleSideEffects: false
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@fortawesome/free-brands-svg-icons', '@fortawesome/free-solid-svg-icons']
  }
})
