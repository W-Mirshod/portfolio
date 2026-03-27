import './index.css';
import './App.css';
import './components/styles/SectionsCommon.css';
import './components/styles/HolographicTransition.css';
import './components/styles/liquid-glass.css';

import { initI18n } from './utils/i18n.js';

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => { });
  });
}

function boot() {
  initI18n()
    .then(() => import('./app.js'))
    .then(({ initApp, hydrateApp }) => {
      const canHydrate =
        typeof window !== 'undefined' &&
        window.__INITIAL_STATE__?.ssr &&
        document.getElementById('home');
      if (canHydrate) {
        hydrateApp();
      } else {
        initApp();
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
