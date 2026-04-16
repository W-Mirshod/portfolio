import { getAllResourcesForClient } from './server-i18n.js';
import { renderHeaderHtml } from './templates/header-html.js';
import { renderHomeSectionHtml } from './templates/home-html.js';
import { renderExperienceSectionHtml } from './templates/experience-html.js';
import { renderSkillsSectionHtml } from './templates/skills-html.js';
import { renderProofSectionHtml } from './templates/proof-html.js';
import { renderProjectsSectionHtml } from './templates/projects-html.js';
import { renderFooterHtml } from './templates/footer-html.js';
import { renderGoToTopHtml } from './templates/go-top-html.js';

function serializeState(state) {
  return JSON.stringify(state).replace(/</g, '\\u003c');
}

export function renderPageHtml(i18n) {
  const lng = i18n.language;
  const resources = getAllResourcesForClient();
  const initialState = {
    locale: lng,
    ssr: true,
    resources,
  };

  const stateScript = `<script>window.__INITIAL_STATE__=${serializeState(initialState)}</script>`;

  const main = `
    <main role="main">
      ${renderHomeSectionHtml(i18n)}
      ${renderExperienceSectionHtml(i18n)}
      ${renderSkillsSectionHtml(i18n)}
      ${renderProofSectionHtml(i18n)}
      ${renderProjectsSectionHtml(i18n)}
      ${renderFooterHtml(i18n)}
    </main>
  `;

  const html = `
    ${stateScript}
    ${renderHeaderHtml(i18n)}
    <div id="root">${main}</div>
    ${renderGoToTopHtml()}
  `;

  return { html, initialState };
}
