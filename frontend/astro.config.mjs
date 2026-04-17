import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

const hmrClientPort = process.env.VITE_HMR_CLIENT_PORT
  ? Number(process.env.VITE_HMR_CLIENT_PORT)
  : undefined;

const isBuild = process.argv.includes('build');

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    ssr: {
      noExternal: ['i18next'],
    },
    server: {
      host: true,
      port: 8080,
      strictPort: true,
      hmr: hmrClientPort
        ? {
            clientPort: hmrClientPort,
          }
        : undefined,
    },
    plugins: [
      ...(isBuild
        ? [
            compression({ algorithm: 'brotliCompress' }),
            compression({ algorithm: 'gzip' }),
            visualizer({ filename: 'dist/client/stats.html', gzipSize: true, brotliSize: true }),
          ]
        : []),
    ],
    build: {
      sourcemap: false,
      minify: 'esbuild',
      target: 'esnext',
      cssCodeSplit: true,
      modulePreload: {
        polyfill: false,
      },
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
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
    },
  },
});