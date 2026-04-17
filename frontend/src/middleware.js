import { defineMiddleware } from 'astro:middleware';
import { resolveLocaleFromHeaders } from './i18n/resolve-locale.js';

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  locals.locale = resolveLocaleFromHeaders(request.headers);
  return next();
});