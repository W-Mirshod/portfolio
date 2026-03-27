import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import express from 'express';
import compression from 'compression';
import { createServerI18n, normalizeLocale } from './src/ssr/server-i18n.js';
import { resolveLocaleFromRequest } from './src/ssr/resolve-locale.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;
const isProd = process.env.NODE_ENV === 'production';
const clientDir = path.resolve(root, 'dist/client');
const serverDir = path.resolve(root, 'dist/server');

async function loadProdRender() {
  const entryPath = path.join(serverDir, 'entry-server.js');
  return (await import(pathToFileURL(entryPath).href)).render;
}

async function createServer() {
  const app = express();
  app.use(compression());

  let vite;
  if (!isProd) {
    const { createServer: createVite } = await import('vite');
    vite = await createVite({
      root,
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    const sirv = (await import('sirv')).default;
    app.use(
      sirv(clientDir, {
        gzip: true,
        brotli: true,
        index: false,
        setHeaders: (res, pathname) => {
          if (pathname.includes('/assets/')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          }
        },
      })
    );
  }

  let prodRender;
  if (isProd) {
    prodRender = await loadProdRender();
  }

  app.get('/health', (_req, res) => {
    res.type('text/plain').send('healthy\n');
  });

  app.use(async (req, res, next) => {
    if (req.method !== 'GET') {
      next();
      return;
    }
    try {
      const locale = resolveLocaleFromRequest(req);
      const i18n = await createServerI18n(locale);
      const lng = normalizeLocale(locale);

      let template = fs.readFileSync(
        isProd ? path.join(clientDir, 'index.html') : path.join(root, 'index.html'),
        'utf-8'
      );

      if (!isProd) {
        template = await vite.transformIndexHtml(req.originalUrl, template);
      }

      let renderFn;
      if (isProd) {
        renderFn = prodRender;
      } else {
        renderFn = (await vite.ssrLoadModule('/src/ssr/entry-server.js')).render;
      }

      const { html: appHtml } = await renderFn(req.originalUrl, { i18n });

      let documentHtml = template.replace(
        /<div id="root"><\/div>\s*<!--\s*ssr-outlet\s*-->/,
        appHtml
      );
      if (documentHtml === template) {
        documentHtml = template.replace('<!--ssr-outlet-->', appHtml);
      }
      documentHtml = documentHtml.replace('<html lang="en">', `<html lang="${lng}">`);

      res
        .status(200)
        .set({
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'private, no-cache',
        })
        .end(documentHtml);
    } catch (e) {
      if (!isProd) vite?.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.stack);
    }
  });

  return { app };
}

createServer().then(({ app }) => {
  const port = Number(process.env.PORT) || 8080;
  app.listen(port, '0.0.0.0', () => {
    console.log(`SSR listening on http://0.0.0.0:${port}`);
  });
});
