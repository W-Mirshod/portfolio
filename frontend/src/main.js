import './utils/i18n.js';
import './index.css';
import './App.css';
import './components/styles/SectionsCommon.css';
import './components/styles/HolographicTransition.css';

import { initApp } from './app.js';

// Register service worker
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
