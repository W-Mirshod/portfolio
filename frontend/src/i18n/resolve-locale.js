import { normalizeLocale } from './server-i18n.js';

const COOKIE = 'i18nextLng';

function parseCookie(header) {
  if (!header) return {};
  return Object.fromEntries(
    header.split(';').map((p) => {
      const [k, ...v] = p.trim().split('=');
      return [k, decodeURIComponent(v.join('='))];
    }).filter(([k]) => k)
  );
}

function pickFromAcceptLanguage(header) {
  if (!header) return null;
  const parts = header.split(',').map((p) => p.trim().split(';')[0].trim().toLowerCase());
  for (const p of parts) {
    const base = p.split('-')[0];
    if (base) return base;
  }
  return null;
}

function getHeader(headers, name) {
  if (!headers) return '';
  if (typeof headers.get === 'function') {
    return headers.get(name) || '';
  }
  return headers[name] || headers[name.toLowerCase()] || '';
}

export function resolveLocaleFromHeaders(headers) {
  const cookies = parseCookie(getHeader(headers, 'cookie'));
  if (cookies[COOKIE]) return normalizeLocale(cookies[COOKIE]);
  const fromAccept = pickFromAcceptLanguage(getHeader(headers, 'accept-language'));
  if (fromAccept) return normalizeLocale(fromAccept);
  return 'en';
}
