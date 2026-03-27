import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en/translation.json';

const lazyLocales = {
  ru: () => import('../locales/ru/translation.json'),
  uz: () => import('../locales/uz/translation.json'),
};

const loadLocale = async (lng) => {
  if (lng === 'en') return;
  if (i18n.hasResourceBundle(lng, 'translation')) return;
  const loader = lazyLocales[lng];
  if (!loader) return;
  try {
    const mod = await loader();
    i18n.addResourceBundle(lng, 'translation', mod.default || mod, true, true);
  } catch (err) {
    console.warn(`Failed to load locale "${lng}":`, err);
  }
};

let initPromise;

export async function initI18n() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const state = typeof window !== 'undefined' ? window.__INITIAL_STATE__ : null;
    if (state?.ssr && state.resources) {
      await i18n.init({
        lng: state.locale,
        resources: state.resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: { escapeValue: false },
      });
      i18n.on('languageChanged', (lng) => {
        loadLocale(lng.split('-')[0]);
        const base = lng.split('-')[0];
        document.cookie = `i18nextLng=${base};path=/;max-age=31536000;SameSite=Lax`;
      });
      return i18n;
    }

    await i18n
      .use(LanguageDetector)
      .init({
        resources: {
          en: { translation: enTranslation },
        },
        lng: 'en',
        fallbackLng: 'en',
        debug: false,
        interpolation: { escapeValue: false },
        detection: {
          order: ['localStorage', 'navigator'],
          caches: ['localStorage'],
          lookupLocalStorage: 'i18nextLng',
        },
      });

    const detectedLng = i18n.language?.split('-')[0];
    if (detectedLng && detectedLng !== 'en') {
      await loadLocale(detectedLng);
    }

    i18n.on('languageChanged', (lng) => {
      loadLocale(lng.split('-')[0]);
      const base = lng.split('-')[0];
      document.cookie = `i18nextLng=${base};path=/;max-age=31536000;SameSite=Lax`;
    });

    return i18n;
  })();
  return initPromise;
}

export default i18n;
