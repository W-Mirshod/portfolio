import {
  iconHome,
  iconBriefcase,
  iconCode,
  iconTrophy,
  iconProjectDiagram,
  iconEnvelope,
} from '../../components/ui/Icons.js';

export function renderHeaderHtml(i18n) {
  const t = (k) => i18n.t(k);
  const activeSection = 'home';
  const isMenuOpen = false;
  const isLanguageOpen = false;
  const currentLang = i18n.language;

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'ru', name: 'Russian' },
  ];

  const getLanguageDisplay = (c) => ({ en: 'EN', uz: 'UZ', ru: 'RU' }[c] || c.toUpperCase());

  const navItems = [
    { href: '#home', key: 'home', label: t('navigation.home'), icon: iconHome('20') },
    { href: '#experience', key: 'experience', label: t('navigation.experience'), icon: iconBriefcase('20') },
    { href: '#skills', key: 'skills', label: t('navigation.skills'), icon: iconCode('20') },
    { href: '#proof', key: 'proof', label: t('navigation.proof'), icon: iconTrophy('20') },
    { href: '#projects', key: 'projects', label: t('navigation.projects'), icon: iconProjectDiagram('20') },
    { href: '#contact', key: 'contact', label: t('navigation.contact'), icon: iconEnvelope('20') },
  ];

  const desktopSidebar = `
    <aside id="ssr-desktop-sidebar" class="hidden xl:fixed xl:flex flex-col items-center top-0 right-0 h-full z-30 desktop-sidebar transition-all duration-300 w-28 sm:w-32" style="font-family:Poppins,sans-serif;letter-spacing:0.03em" aria-label="Main navigation">
      <div class="w-full h-full liquid-panel-strong border-l border-white/10 flex flex-col items-center relative" style="transform:translateZ(0);will-change:backdrop-filter">
        <div class="relative z-10 flex flex-col h-full w-full items-center">
          <a href="#home" class="sidebar-home-link flex flex-col items-center gap-2 mt-12 mb-4 group" aria-label="Go to home section">
            <div class="rounded-xl liquid-panel border border-white/15 p-1 transition-all duration-300 group-hover:scale-105 w-14 h-14 sm:w-16 sm:h-16">
              <div class="w-full h-full rounded flex items-center justify-center brand-wmark">M<span class="brand-wmark-dot">.</span></div>
            </div>
            <span class="text-sm font-bold text-white tracking-wider nav-logo-display">Mirshod</span>
          </a>
          <nav class="sidebar-nav-stack flex flex-col gap-1 sm:gap-2 w-full items-center px-2" aria-label="Navigation menu">
            ${navItems.map(
              (item) => `
              <a class="sidebar-nav-link sidebar-nav-item w-20 h-12 sm:w-24 sm:h-14 flex flex-col items-center justify-center rounded-xl font-semibold text-sm transition-all duration-300 border ${activeSection === item.key ? 'liquid-panel-strong text-white border-white/20 nav-item-active-indicator' : 'liquid-panel text-white/80 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20'}" href="${item.href}" data-key="${item.key}" aria-label="Navigate to ${item.label} section" ${activeSection === item.key ? 'aria-current="page"' : ''}>
                <span class="sidebar-nav-icon mb-1" aria-hidden="true">${item.icon}</span>
                <span class="sidebar-nav-label tracking-wide hidden sm:block text-xs font-semibold link-draw">${item.label}</span>
              </a>
            `
            ).join('')}
          </nav>
          <div class="mt-auto mb-6 flex flex-col items-center gap-1.5">
            <div class="relative language-dropdown-container">
              <button class="sidebar-lang-btn w-20 h-12 sm:w-24 sm:h-14 flex items-center justify-center liquid-panel border border-white/10 rounded-xl font-semibold text-sm text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300" aria-haspopup="true" aria-expanded="${isLanguageOpen}" aria-label="Current language: ${getLanguageDisplay(currentLang)}. Click to change language">
                ${getLanguageDisplay(currentLang)}
              </button>
              ${isLanguageOpen ? `
                <div class="absolute bottom-full left-full ml-2 mb-2 liquid-panel-strong border border-white/20 rounded-xl overflow-hidden min-w-[110px] z-[100]" role="menu" aria-label="Language selection">
                  ${languages.map(
                    (lang) => `
                    <button class="lang-option w-full px-4 py-2.5 text-left text-sm transition-all duration-200 ${currentLang === lang.code ? 'bg-white/15 text-white border-l-2 border-white/30' : 'text-white/80 hover:bg-white/10 hover:text-white'}" data-lang="${lang.code}" role="menuitem" aria-label="Switch to ${lang.name}" aria-selected="${currentLang === lang.code}">
                      ${lang.name}
                    </button>
                  `
                  ).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    </aside>
  `;

  const mobileHeader = `
    <header id="ssr-mobile-header" class="fixed top-0 left-0 w-full z-20 xl:hidden mobile-header" style="letter-spacing:0.03em;transform:translateZ(0);will-change:backdrop-filter" role="banner">
      <div class="w-full liquid-panel-strong border-b border-white/10 relative">
        <div class="relative z-10">
          <div class="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-2.5">
            <div class="flex items-center gap-2 sm:gap-3">
              <a href="#home" class="mobile-home-link flex items-center gap-2 sm:gap-3 group" aria-label="Go to home section">
                <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg liquid-panel border border-white/15 p-1 transition-all duration-300 group-hover:scale-105">
                  <div class="w-full h-full rounded flex items-center justify-center brand-wmark">M<span class="brand-wmark-dot">.</span></div>
                </div>
                <span class="text-base sm:text-lg font-bold text-white tracking-wide nav-logo-display">Mirshod</span>
              </a>
            </div>
            <div class="relative flex items-center gap-2 sm:gap-3">
              <div class="relative language-dropdown-container">
                <button class="mobile-lang-btn px-3 sm:px-4 py-2 liquid-panel border border-white/10 rounded-lg font-semibold text-xs sm:text-sm text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300" aria-haspopup="true" aria-expanded="${isLanguageOpen}">
                  ${getLanguageDisplay(currentLang)}
                </button>
                ${isLanguageOpen ? `
                  <div class="absolute top-full right-0 mt-2 liquid-panel-strong border border-white/20 rounded-xl overflow-hidden min-w-[100px] z-50" role="menu" aria-label="Language selection">
                    ${languages.map(
                      (lang) => `
                      <button class="lang-option w-full px-3 py-2 text-left text-sm transition-all duration-200 ${currentLang === lang.code ? 'bg-white/15 text-white border-l-2 border-white/30' : 'text-white/80 hover:bg-white/10 hover:text-white'}" data-lang="${lang.code}" role="menuitem" aria-label="Switch to ${lang.name}">
                        ${lang.name}
                      </button>
                    `
                    ).join('')}
                  </div>
                ` : ''}
              </div>
              <div class="menu-toggle-btn liquid-menu-toggle w-8 h-8 sm:w-10 sm:h-10 liquid-panel border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 ${isMenuOpen ? 'is-open' : ''}" role="button" tabindex="0" aria-expanded="${isMenuOpen}" aria-controls="mobileNavMenu" aria-label="Toggle navigation menu">
                <span class="liquid-menu-toggle-line line-1 bg-white/90 rounded ${isMenuOpen ? 'open' : ''}"></span>
                <span class="liquid-menu-toggle-line line-2 bg-white/90 rounded ${isMenuOpen ? 'open' : ''}"></span>
                <span class="liquid-menu-toggle-line line-3 bg-white/90 rounded ${isMenuOpen ? 'open' : ''}"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  `;

  return desktopSidebar + mobileHeader;
}
