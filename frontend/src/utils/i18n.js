import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Only bundle the default (English) locale; others are loaded on demand
import enTranslation from '../locales/en/translation.json';

// Lazy locale loaders – split RU/UZ into separate chunks
const lazyLocales = {
  ru: () => import('../locales/ru/translation.json'),
  uz: () => import('../locales/uz/translation.json'),
};

// Load a non-default locale on demand and cache it in i18n resources
const loadLocale = async (lng) => {
  if (lng === 'en') return; // already bundled
  if (i18n.hasResourceBundle(lng, 'translation')) return; // already loaded
  const loader = lazyLocales[lng];
  if (!loader) return;
  try {
    const mod = await loader();
    i18n.addResourceBundle(lng, 'translation', mod.default || mod, true, true);
  } catch (err) {
    console.warn(`Failed to load locale "${lng}":`, err);
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    missingKeyHandler: (lng, ns, key) => {
      console.warn(`Missing translation for key: ${key} in language: ${lng}`);
      return `[Missing Translation: ${key}]`;
    }
  });

// Pre-load the detected/stored language if it isn't English
const detectedLng = i18n.language?.split('-')[0];
if (detectedLng && detectedLng !== 'en') {
  loadLocale(detectedLng);
}

// Load locale whenever language changes
i18n.on('languageChanged', (lng) => {
  loadLocale(lng.split('-')[0]);
});

export default i18n;
