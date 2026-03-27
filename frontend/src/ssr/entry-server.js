import { renderPageHtml } from './page-render.js';

export async function render(_url, { i18n }) {
  return renderPageHtml(i18n);
}
