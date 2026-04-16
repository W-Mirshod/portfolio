import {
  iconHome,
  iconBriefcase,
  iconCode,
  iconTrophy,
  iconProjectDiagram,
  iconEnvelope,
} from '../../components/ui/Icons.js';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'ru', name: 'Russian' },
];

const LANG_DISPLAY = { en: 'EN', uz: 'UZ', ru: 'RU' };

function getLanguageDisplay(code) {
  return LANG_DISPLAY[code] || String(code || '').toUpperCase();
}

export function renderHeaderHtml(i18n) {
  const t = (k) => i18n.t(k);
  const currentLang = i18n.language;
  const activeKey = 'home';

  const navItems = [
    { href: '#home', key: 'home', label: t('navigation.home'), icon: iconHome('18') },
    { href: '#experience', key: 'experience', label: t('navigation.experience'), icon: iconBriefcase('18') },
    { href: '#skills', key: 'skills', label: t('navigation.skills'), icon: iconCode('18') },
    { href: '#proof', key: 'proof', label: t('navigation.proof'), icon: iconTrophy('18') },
    { href: '#projects', key: 'projects', label: t('navigation.projects'), icon: iconProjectDiagram('18') },
    { href: '#contact', key: 'contact', label: t('navigation.contact'), icon: iconEnvelope('18') },
  ];

  const desktopLinks = navItems
    .map(
      (item) => `
        <a class="top-nav-link${activeKey === item.key ? ' is-active' : ''}" href="${item.href}" data-key="${item.key}" aria-label="Navigate to ${item.label} section"${activeKey === item.key ? ' aria-current="page"' : ''}>
          <span class="top-nav-link-icon" aria-hidden="true">${item.icon}</span>
          <span class="top-nav-link-label">${item.label}</span>
        </a>`
    )
    .join('');

  const langOptions = LANGUAGES.map(
    (lang) => `
      <button class="top-nav-lang-option${currentLang === lang.code ? ' is-selected' : ''}" data-lang="${lang.code}" role="menuitem" aria-selected="${currentLang === lang.code}" aria-label="Switch to ${lang.name}">
        <span class="top-nav-lang-option-code">${getLanguageDisplay(lang.code)}</span>
        <span class="top-nav-lang-option-name">${lang.name}</span>
      </button>`
  ).join('');

  const sheetLinks = navItems
    .map(
      (item) => `
        <a class="top-nav-sheet-link${activeKey === item.key ? ' is-active' : ''}" href="${item.href}" data-key="${item.key}" aria-label="Navigate to ${item.label} section"${activeKey === item.key ? ' aria-current="page"' : ''}>
          <span class="top-nav-sheet-icon" aria-hidden="true">${item.icon}</span>
          <span class="top-nav-sheet-label">${item.label}</span>
        </a>`
    )
    .join('');

  return `
    <header id="top-nav" class="top-nav" role="banner" aria-label="Primary" data-active="${activeKey}" data-lang="${currentLang}">
      <div class="top-nav-surface" aria-hidden="true"></div>
      <div class="top-nav-inner">
        <a href="#home" class="top-nav-brand" aria-label="Go to home section">
          <span class="top-nav-brand-mark" aria-hidden="true">M<span class="top-nav-brand-dot">.</span></span>
          <span class="top-nav-brand-name nav-logo-display">Mirshod</span>
        </a>
        <nav class="top-nav-rail" aria-label="Main navigation">
          <span class="top-nav-pill" aria-hidden="true"></span>
          ${desktopLinks}
        </nav>
        <div class="top-nav-actions">
          <div class="top-nav-lang" data-open="false">
            <button type="button" class="top-nav-lang-btn" aria-haspopup="menu" aria-expanded="false" aria-label="Current language: ${getLanguageDisplay(currentLang)}. Change language">
              <span class="top-nav-lang-code">${getLanguageDisplay(currentLang)}</span>
              <svg class="top-nav-lang-caret" viewBox="0 0 12 8" width="10" height="8" aria-hidden="true"><path d="M1 1.5L6 6.5L11 1.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <div class="top-nav-lang-menu" role="menu" aria-label="Language selection">${langOptions}</div>
          </div>
          <button type="button" class="top-nav-toggle liquid-menu-toggle" aria-expanded="false" aria-controls="topNavSheet" aria-label="Toggle navigation menu">
            <span class="liquid-menu-toggle-line line-1" aria-hidden="true"></span>
            <span class="liquid-menu-toggle-line line-2" aria-hidden="true"></span>
            <span class="liquid-menu-toggle-line line-3" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </header>
    <div id="topNavSheet" class="top-nav-sheet" aria-hidden="true" data-open="false">
      <div class="top-nav-sheet-backdrop" aria-hidden="true"></div>
      <nav class="top-nav-sheet-panel" aria-label="Mobile navigation">
        <div class="top-nav-sheet-surface" aria-hidden="true"></div>
        <div class="top-nav-sheet-inner">
          ${sheetLinks}
        </div>
      </nav>
    </div>
  `;
}
