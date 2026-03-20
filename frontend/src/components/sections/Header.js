import i18n from '../../utils/i18n.js';
import { iconHome, iconBriefcase, iconCode, iconTrophy, iconProjectDiagram, iconEnvelope } from '../ui/Icons.js';
import '../styles/menu-futuristic.css';

export default function createHeader() {
  let activeSection = 'home';
  let isMenuOpen = false;
  let isLanguageOpen = false;
  let menuPressTimeout = null;

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'ru', name: 'Russian' }
  ];

  const getLanguageDisplay = (c) => ({ en: 'EN', uz: 'UZ', ru: 'RU' }[c] || c.toUpperCase());

  const getNavItems = () => [
    { href: '#home', key: 'home', label: i18n.t('navigation.home'), icon: iconHome('20') },
    { href: '#experience', key: 'experience', label: i18n.t('navigation.experience'), icon: iconBriefcase('20') },
    { href: '#skills', key: 'skills', label: i18n.t('navigation.skills'), icon: iconCode('20') },
    { href: '#proof', key: 'proof', label: i18n.t('navigation.proof'), icon: iconTrophy('20') },
    { href: '#projects', key: 'projects', label: i18n.t('navigation.projects'), icon: iconProjectDiagram('20') },
    { href: '#contact', key: 'contact', label: i18n.t('navigation.contact'), icon: iconEnvelope('20') }
  ];

  const handleNavigation = (href) => {
    const element = document.querySelector(href);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(href, { duration: 1.2, offset: -80 });
      } else {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementTop - 80, behavior: 'smooth' });
      }
    }
    closeMobileMenu();
    closeLanguageDropdown();
  };

  // Fragment to hold both sidebar + mobile header
  const fragment = document.createDocumentFragment();

  // ─── Desktop Sidebar ───
  const aside = document.createElement('aside');
  aside.className = 'hidden xl:fixed xl:flex flex-col items-center top-0 right-0 h-full z-30 desktop-sidebar transition-all duration-300 w-28 sm:w-32';
  aside.style.fontFamily = 'Poppins,sans-serif';
  aside.style.letterSpacing = '0.03em';
  aside.setAttribute('aria-label', 'Main navigation');

  function renderDesktopSidebar() {
    const navItems = getNavItems();
    const currentLang = i18n.language;
    aside.innerHTML = `
      <div class="w-full h-full liquid-panel-strong border-l border-white/10 flex flex-col items-center relative" style="transform:translateZ(0);will-change:backdrop-filter">
        <div class="relative z-10 flex flex-col h-full w-full items-center">
          <a href="#home" class="sidebar-home-link flex flex-col items-center gap-2 mt-12 mb-4 group" aria-label="Go to home section">
            <div class="rounded-xl liquid-panel border border-white/15 p-1 transition-all duration-300 group-hover:scale-105 w-14 h-14 sm:w-16 sm:h-16">
              <div class="w-full h-full rounded flex items-center justify-center brand-wmark">M<span class="brand-wmark-dot">.</span></div>
            </div>
            <span class="text-sm font-bold text-white tracking-wider nav-logo-display">Mirshod</span>
          </a>
          <nav class="sidebar-nav-stack flex flex-col gap-1 sm:gap-2 w-full items-center px-2" aria-label="Navigation menu">
            ${navItems.map(item => `
              <a class="sidebar-nav-link sidebar-nav-item w-20 h-12 sm:w-24 sm:h-14 flex flex-col items-center justify-center rounded-xl font-semibold text-sm transition-all duration-300 border ${activeSection === item.key ? 'liquid-panel-strong text-white border-white/20 nav-item-active-indicator' : 'liquid-panel text-white/80 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20'}" href="${item.href}" data-key="${item.key}" aria-label="Navigate to ${item.label} section" ${activeSection === item.key ? 'aria-current="page"' : ''}>
                <span class="sidebar-nav-icon mb-1" aria-hidden="true">${item.icon}</span>
                <span class="sidebar-nav-label tracking-wide hidden sm:block text-xs font-semibold link-draw">${item.label}</span>
              </a>
            `).join('')}
          </nav>
          <div class="mt-auto mb-6 flex flex-col items-center gap-1.5">
            <div class="relative language-dropdown-container">
              <button class="sidebar-lang-btn w-20 h-12 sm:w-24 sm:h-14 flex items-center justify-center liquid-panel border border-white/10 rounded-xl font-semibold text-sm text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300" aria-haspopup="true" aria-expanded="${isLanguageOpen}" aria-label="Current language: ${getLanguageDisplay(currentLang)}. Click to change language">
                ${getLanguageDisplay(currentLang)}
              </button>
              ${isLanguageOpen ? `
                <div class="absolute bottom-full left-full ml-2 mb-2 liquid-panel-strong border border-white/20 rounded-xl overflow-hidden min-w-[110px] z-[100]" role="menu" aria-label="Language selection">
                  ${languages.map(lang => `
                    <button class="lang-option w-full px-4 py-2.5 text-left text-sm transition-all duration-200 ${currentLang === lang.code ? 'bg-white/15 text-white border-l-2 border-white/30' : 'text-white/80 hover:bg-white/10 hover:text-white'}" data-lang="${lang.code}" role="menuitem" aria-label="Switch to ${lang.name}" aria-selected="${currentLang === lang.code}">
                      ${lang.name}
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ─── Mobile Header ───
  const header = document.createElement('header');
  header.className = 'fixed top-0 left-0 w-full z-20 xl:hidden mobile-header';
  header.style.letterSpacing = '0.03em';
  header.style.transform = 'translateZ(0)';
  header.style.willChange = 'backdrop-filter';
  header.setAttribute('role', 'banner');

  function renderMobileHeader() {
    const navItems = getNavItems();
    const currentLang = i18n.language;
    header.innerHTML = `
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
                    ${languages.map(lang => `
                      <button class="lang-option w-full px-3 py-2 text-left text-sm transition-all duration-200 ${currentLang === lang.code ? 'bg-white/15 text-white border-l-2 border-white/30' : 'text-white/80 hover:bg-white/10 hover:text-white'}" data-lang="${lang.code}" role="menuitem" aria-label="Switch to ${lang.name}">
                        ${lang.name}
                      </button>
                    `).join('')}
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
    `;
  }

  // ─── Mobile Menu (portal-like: appended to body) ───
  let mobileMenuContainer = null;

  function openMobileMenu() {
    isMenuOpen = true;
    isLanguageOpen = false;
    document.body.classList.add('mobile-menu-open');
    renderMobileHeader();
    attachMobileHeaderEvents();

    if (mobileMenuContainer) mobileMenuContainer.remove();
    mobileMenuContainer = document.createElement('div');
    mobileMenuContainer.className = 'mobile-menu-portal';

    const navItems = getNavItems();
    mobileMenuContainer.innerHTML = `
      <nav class="liquid-menu-sheet fixed top-0 left-0 h-screen w-[280px] sm:w-[320px] liquid-panel-strong border-r border-white/10 z-50 flex flex-col gap-2 sm:gap-3 px-4 sm:px-5 py-6 relative overflow-hidden" id="mobileNavMenu" style="letter-spacing:0.03em;transform:translateZ(0);will-change:backdrop-filter" aria-label="Mobile navigation menu">
        <div class="relative z-10 flex flex-col h-full">
          <a href="#home" class="mobile-menu-home flex flex-col items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group" aria-label="Go to home section">
            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg liquid-panel border border-white/15 p-1 transition-all duration-300 group-hover:scale-105">
              <div class="w-full h-full rounded flex items-center justify-center brand-wmark">M<span class="brand-wmark-dot">.</span></div>
            </div>
            <span class="text-base sm:text-lg font-bold text-white tracking-wider nav-logo-display">Mirshod</span>
          </a>
          ${navItems.map(item => `
            <a class="mobile-nav-link mobile-nav-item mobile-nav-item-shell w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base flex items-center gap-3 sm:gap-4 transition-all duration-300 border ${activeSection === item.key ? 'liquid-panel-strong text-white border-white/20 nav-item-active-indicator' : 'liquid-panel text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20'}" href="${item.href}" data-key="${item.key}" aria-label="Navigate to ${item.label} section" ${activeSection === item.key ? 'aria-current="page"' : ''}>
              <span class="mobile-nav-icon flex-shrink-0" aria-hidden="true">${item.icon}</span>
              <span class="mobile-nav-label tracking-wide font-semibold link-draw">${item.label}</span>
            </a>
          `).join('')}
        </div>
      </nav>
      <div class="mobile-menu-backdrop-overlay mobile-menu-backdrop liquid-menu-backdrop fixed inset-0 bg-black/35 backdrop-blur-md z-40" role="button" tabindex="0" aria-label="Close navigation menu"></div>
    `;

    document.body.appendChild(mobileMenuContainer);

    // Attach mobile menu events
    mobileMenuContainer.querySelector('.mobile-menu-backdrop-overlay').addEventListener('click', closeMobileMenu);
    mobileMenuContainer.querySelector('.mobile-menu-home')?.addEventListener('click', (e) => {
      e.preventDefault();
      handleNavigation('#home');
    });
    mobileMenuContainer.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        handleNavigation(link.getAttribute('href'));
      });
    });
  }

  function closeMobileMenu() {
    isMenuOpen = false;
    document.body.classList.remove('mobile-menu-open');
    if (mobileMenuContainer) {
      mobileMenuContainer.remove();
      mobileMenuContainer = null;
    }
    renderMobileHeader();
    attachMobileHeaderEvents();
  }

  function closeLanguageDropdown() {
    if (isLanguageOpen) {
      isLanguageOpen = false;
      renderDesktopSidebar();
      attachDesktopEvents();
      renderMobileHeader();
      attachMobileHeaderEvents();
    }
  }

  function toggleLanguageDropdown() {
    isLanguageOpen = !isLanguageOpen;
    renderDesktopSidebar();
    attachDesktopEvents();
    renderMobileHeader();
    attachMobileHeaderEvents();
  }

  // ─── Event Attachment ───
  function attachDesktopEvents() {
    aside.querySelector('.sidebar-home-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      handleNavigation('#home');
    });
    aside.querySelectorAll('.sidebar-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        handleNavigation(link.getAttribute('href'));
      });
    });
    aside.querySelector('.sidebar-lang-btn')?.addEventListener('click', toggleLanguageDropdown);
    aside.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        i18n.changeLanguage(btn.dataset.lang);
        closeLanguageDropdown();
      });
    });
  }

  function attachMobileHeaderEvents() {
    header.querySelector('.mobile-home-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      handleNavigation('#home');
    });
    header.querySelector('.menu-toggle-btn')?.addEventListener('click', () => {
      if (isMenuOpen) closeMobileMenu();
      else openMobileMenu();
    });
    header.querySelector('.menu-toggle-btn')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isMenuOpen) closeMobileMenu();
        else openMobileMenu();
      }
    });
    header.querySelector('.mobile-lang-btn')?.addEventListener('click', toggleLanguageDropdown);
    header.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        i18n.changeLanguage(btn.dataset.lang);
        closeLanguageDropdown();
      });
    });
  }

  // ─── Scroll tracking ───
  let scrollRafId = null;
  const handleScroll = () => {
    if (scrollRafId) return;
    scrollRafId = requestAnimationFrame(() => {
      scrollRafId = null;
      const sections = ['home', 'experience', 'skills', 'proof', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 150;
      if (scrollPosition < 100) { updateActive('home'); return; }
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && scrollPosition >= el.offsetTop) {
          updateActive(sections[i]);
          return;
        }
      }
    });
  };

  function updateActive(key) {
    if (activeSection === key) return;
    activeSection = key;

    // Surgical class swap on desktop sidebar links (avoid full re-render)
    aside.querySelectorAll('.sidebar-nav-link').forEach(link => {
      const isActive = link.dataset.key === key;
      link.classList.toggle('liquid-panel-strong', isActive);
      link.classList.toggle('liquid-panel', !isActive);
      link.classList.toggle('text-white', isActive);
      link.classList.toggle('text-white/80', !isActive);
      link.classList.toggle('border-white/20', isActive);
      link.classList.toggle('border-white/10', !isActive);
      link.classList.toggle('nav-item-active-indicator', isActive);
      link.classList.toggle('hover:text-white', !isActive);
      link.classList.toggle('hover:bg-white/10', !isActive);
      link.classList.toggle('hover:border-white/20', !isActive);
      if (isActive) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    // Update mobile menu links if menu is open
    if (mobileMenuContainer) {
      mobileMenuContainer.querySelectorAll('.mobile-nav-link').forEach(link => {
        const isActive = link.dataset.key === key;
        link.classList.toggle('liquid-panel-strong', isActive);
        link.classList.toggle('liquid-panel', !isActive);
        link.classList.toggle('text-white', isActive);
        link.classList.toggle('text-white/80', !isActive);
        link.classList.toggle('border-white/20', isActive);
        link.classList.toggle('border-white/10', !isActive);
        link.classList.toggle('nav-item-active-indicator', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    }
  }

  // Close language dropdown on outside clicks
  document.addEventListener('click', (e) => {
    if (isLanguageOpen && !e.target.closest('.language-dropdown-container')) {
      closeLanguageDropdown();
    }
  }, true);

  if (window.lenis) {
    window.lenis.on('scroll', handleScroll);
  } else {
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // ─── Theme ───
  localStorage.removeItem('theme');
  document.documentElement.setAttribute('data-theme', 'dark');

  // ─── Initial render ───
  renderDesktopSidebar();
  attachDesktopEvents();
  renderMobileHeader();
  attachMobileHeaderEvents();
  handleScroll();

  // ─── Language change reactivity ───
  i18n.on('languageChanged', () => {
    renderDesktopSidebar();
    attachDesktopEvents();
    renderMobileHeader();
    attachMobileHeaderEvents();
    if (mobileMenuContainer) {
      closeMobileMenu();
      // Re-open if it was open
      openMobileMenu();
    }
  });

  fragment.appendChild(aside);
  fragment.appendChild(header);
  return fragment;
}
