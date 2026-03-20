import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

const hmrClientPort = process.env.VITE_HMR_CLIENT_PORT
  ? Number(process.env.VITE_HMR_CLIENT_PORT)
  : undefined

export default defineConfig(({ command }) => ({
  plugins: [
    ...(command === 'build'
      ? [
          compression({ algorithm: 'brotliCompress' }),
          compression({ algorithm: 'gzip' }),
          visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true }),
        ]
      : []),
  ],
  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('three')) {
            return '3d-engine';
          }
          if (id.includes('gsap') || id.includes('lenis')) {
            return 'animation';
          }
          if (id.includes('i18next')) {
            return 'i18n';
          }
          if (id.includes('/utils/')) {
            return 'utils';
          }
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
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
    hmr: hmrClientPort ? { clientPort: hmrClientPort } : undefined,
    watch: {
      usePolling: true
    },
  }
}))
