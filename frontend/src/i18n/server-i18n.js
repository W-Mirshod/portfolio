import i18next from 'i18next';

import enTranslation from '../locales/en/translation.json' with { type: 'json' };
import ruTranslation from '../locales/ru/translation.json' with { type: 'json' };
import uzTranslation from '../locales/uz/translation.json' with { type: 'json' };

const resources = {
  en: { translation: enTranslation },
  ru: { translation: ruTranslation },
  uz: { translation: uzTranslation },
};

const SUPPORTED = new Set(['en', 'ru', 'uz']);

export function normalizeLocale(lng) {
  if (!lng || typeof lng !== 'string') return 'en';
  const base = lng.split('-')[0].toLowerCase();
  return SUPPORTED.has(base) ? base : 'en';
}

export async function createServerI18n(lng) {
  const i18n = i18next.createInstance();
  await i18n.init({
    lng: normalizeLocale(lng),
    fallbackLng: 'en',
    resources,
    interpolation: { escapeValue: false },
    debug: false,
  });
  return i18n;
}

export function getAllResourcesForClient() {
  return resources;
}
