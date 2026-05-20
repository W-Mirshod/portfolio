## Cursor Cloud specific instructions

### Overview

Single-service portfolio website (Astro 5 SSR + Node.js). No database, no backend API, no external services required.

### Running the dev server

```bash
cd frontend && npm run dev
```

Serves on `http://localhost:8080` with HMR. All data is static JSON baked into Astro components.

### Build

```bash
cd frontend && npm run build
```

Production server: `cd frontend && npm run start` (requires build first).

### Notes

- No test framework is configured (`package.json` has no `test` script).
- No ESLint config exists; no lint script is available.
- The project uses `package-lock.json` (npm). Do not use pnpm or yarn.
- Astro dev server output shows a `baseline-browser-mapping` staleness warning — safe to ignore.
- Three.js 3D background renders on the hero section; headless browser tests may not render WebGL correctly.
- i18n language switching is client-side JavaScript (not path-based routing); `/ru` or `/uz` paths will 404.
