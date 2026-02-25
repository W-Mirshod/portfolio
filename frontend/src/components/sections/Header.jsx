import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
const MirshodImg = '/Mirshod-optimized.webp';
import { FaHome, FaUser, FaBriefcase, FaCode, FaTrophy, FaCertificate, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import '../styles/menu-futuristic.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMenuButtonPressed, setIsMenuButtonPressed] = useState(false);
  const menuPressTimeoutRef = useRef(null);
  const currentLanguage = i18n.language;
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'ru', name: 'Russian' }
  ];


  useEffect(() => {
    localStorage.removeItem('theme');
    document.documentElement.setAttribute('data-theme', 'dark');

    return () => {
      if (menuPressTimeoutRef.current) {
        clearTimeout(menuPressTimeoutRef.current);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    if (menuPressTimeoutRef.current) {
      clearTimeout(menuPressTimeoutRef.current);
    }

    setIsMenuButtonPressed(true);
    setIsMenuOpen((prev) => !prev);

    menuPressTimeoutRef.current = setTimeout(() => {
      setIsMenuButtonPressed(false);
    }, 380);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'skills', 'achievements', 'certificate', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 150;
      
      if (scrollPosition < 100) {
        setActiveSection('home');
        return;
      }
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    const handleLenisScroll = () => {
      handleScroll();
    };

    if (window.lenis) {
      window.lenis.on('scroll', handleLenisScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    handleScroll();

    return () => {
      if (window.lenis) {
        window.lenis.off('scroll', handleLenisScroll);
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Manage body class for mobile menu and close language dropdown when mobile menu opens
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('mobile-menu-open');
      // Close language dropdown when mobile menu opens
      setIsLanguageOpen(false);
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMenuOpen]);

  const handleNavigation = (href) => {
    const element = document.querySelector(href);
    if (element) {
      if (window.lenis) {
        window.lenis.scrollTo(href, {
          duration: 1.2,
          offset: -80
        });
      } else {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementTop - 80;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
  };

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageOpen && !event.target.closest('.language-dropdown-container')) {
        setIsLanguageOpen(false);
      }
    };

    // Use capture phase to handle clicks before they bubble up
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, [isLanguageOpen]);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsLanguageOpen(false);
  };

  const getLanguageDisplay = (langCode) => {
    switch (langCode) {
      case 'en': return 'EN';
      case 'uz': return 'UZ';
      case 'ru': return 'RU';
      default: return langCode.toUpperCase();
    }
  };


  const navItems = [
    { href: '#home', key: 'home', label: t('navigation.home'), icon: <FaHome size={20} /> },
    { href: '#experience', key: 'experience', label: t('navigation.experience'), icon: <FaBriefcase size={20} /> },
    { href: '#skills', key: 'skills', label: t('navigation.skills'), icon: <FaCode size={20} /> },
    { href: '#achievements', key: 'achievements', label: t('navigation.achievements'), icon: <FaTrophy size={20} /> },
    { href: '#certificate', key: 'certificate', label: t('navigation.certificate'), icon: <FaCertificate size={20} /> },
    { href: '#projects', key: 'projects', label: t('navigation.projects'), icon: <FaProjectDiagram size={20} /> },
    { href: '#contact', key: 'contact', label: t('navigation.contact'), icon: <FaEnvelope size={20} /> }
  ];

  return (
    <>
      <aside className="hidden xl:fixed xl:flex flex-col items-center top-0 right-0 h-full z-30 desktop-sidebar transition-all duration-300 w-28 sm:w-32" style={{fontFamily:'Poppins,sans-serif',letterSpacing:'0.03em'}} aria-label="Main navigation">
        <div className="w-full h-full liquid-panel-strong border-l border-white/10 flex flex-col items-center relative" style={{transform: 'translateZ(0)', willChange: 'backdrop-filter'}}>
          <div className="relative z-10 flex flex-col h-full w-full items-center">
            <a href="#home" className="flex flex-col items-center gap-2 mt-12 mb-4 group" onClick={(e) => {
              e.preventDefault();
              handleNavigation('#home');
            }} aria-label="Go to home section">
              <div className="rounded-xl liquid-panel border border-white/15 p-1 transition-all duration-300 group-hover:scale-105 w-14 h-14 sm:w-16 sm:h-16">
                <img src={MirshodImg} alt="W" className="w-full h-full rounded object-cover img-shimmer-load" />
              </div>
              <span className="text-sm font-bold text-white tracking-wider nav-logo-display">Mirshod</span>
            </a>
            <nav className="flex flex-col gap-1 sm:gap-2 w-full items-center px-2" aria-label="Navigation menu">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  className={`w-20 h-12 sm:w-24 sm:h-14 flex flex-col items-center justify-center rounded-xl font-semibold text-sm transition-all duration-300 border ${activeSection === item.key ? 'liquid-panel-strong text-white border-white/20 nav-item-active-indicator' : 'liquid-panel text-white/80 border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20'}`}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                  aria-label={`Navigate to ${item.label} section`}
                  aria-current={activeSection === item.key ? 'page' : undefined}
                >
                  <span className="mb-1" aria-hidden="true">{item.icon}</span>
                  <span className="tracking-wide hidden sm:block text-xs font-semibold link-draw">{item.label}</span>
                </a>
              ))}
            </nav>
            <div className="mt-auto mb-6 flex flex-col items-center gap-1.5">
              <div className="relative language-dropdown-container">
                <button
                  className="w-20 h-12 sm:w-24 sm:h-14 flex items-center justify-center liquid-panel border border-white/10 rounded-xl font-semibold text-sm text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  aria-haspopup="true"
                  aria-expanded={isLanguageOpen}
                  aria-label={`Current language: ${getLanguageDisplay(currentLanguage)}. Click to change language`}
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  {getLanguageDisplay(currentLanguage)}
                </button>
                {isLanguageOpen && (
                  <div className="absolute bottom-full left-full ml-2 mb-2 liquid-panel-strong border border-white/20 rounded-xl overflow-hidden min-w-[110px] z-[100]" role="menu" aria-label="Language selection">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-200 ${currentLanguage === language.code ? 'bg-white/15 text-white border-l-2 border-white/30' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                        onClick={() => handleLanguageChange(language.code)}
                        role="menuitem"
                        aria-label={`Switch to ${language.name}`}
                        aria-selected={currentLanguage === language.code}
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
      <header className="fixed top-0 left-0 w-full z-20 xl:hidden mobile-header" style={{letterSpacing: '0.03em', transform: 'translateZ(0)', willChange: 'backdrop-filter'}} role="banner">
        <div className="w-full liquid-panel-strong nav-holo-toolbar relative">
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-2.5">
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="#home" className="flex items-center gap-2 sm:gap-3 group" aria-label="Go to home section">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg liquid-panel border border-white/15 p-1 transition-all duration-300 group-hover:scale-105">
                  <img src={MirshodImg} alt="W" className="w-full h-full rounded object-cover img-shimmer-load" />
                </div>
                <span className="text-base sm:text-lg font-bold text-white tracking-wide nav-logo-display">Mirshod</span>
              </a>
            </div>
            <div className="relative flex items-center gap-2 sm:gap-3">
              <div className="relative language-dropdown-container">
                <button
                  className="nav-holo-button nav-holo-lang"
                  aria-haspopup="true"
                  aria-expanded={isLanguageOpen}
                  aria-label={`Current language: ${getLanguageDisplay(currentLanguage)}. Click to change language`}
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  {getLanguageDisplay(currentLanguage)}
                </button>
                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 liquid-panel-strong border border-white/20 rounded-xl overflow-hidden min-w-[100px] z-50" role="menu" aria-label="Language selection">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className={`w-full px-3 py-2 text-left text-sm transition-all duration-200 ${currentLanguage === language.code ? 'bg-white/15 text-white border-l-2 border-white/30' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                        onClick={() => handleLanguageChange(language.code)}
                        role="menuitem"
                        aria-label={`Switch to ${language.name}`}
                        aria-selected={currentLanguage === language.code}
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div
                className={`liquid-menu-toggle nav-holo-button nav-holo-menu cursor-pointer ${isMenuOpen ? 'is-open' : ''} ${isMenuButtonPressed ? 'is-pressed' : ''}`}
                role="button"
                tabIndex={0}
                aria-expanded={isMenuOpen}
                aria-controls="mobileNavMenu"
                aria-label="Toggle navigation menu"
                onClick={toggleMobileMenu}
                onKeyDown={e => {if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleMobileMenu()}}}
              >
                <span className={`liquid-menu-toggle-line nav-holo-menu-line line-1 ${isMenuOpen ? 'open' : ''}`}></span>
                <span className={`liquid-menu-toggle-line nav-holo-menu-line line-2 ${isMenuOpen ? 'open' : ''}`}></span>
                <span className={`liquid-menu-toggle-line nav-holo-menu-line line-3 ${isMenuOpen ? 'open' : ''}`}></span>
              </div>
            </div>
          </div>
          </div>
          </div>
        {typeof window !== 'undefined' && isMenuOpen && createPortal(
          <>
            <nav className="liquid-menu-sheet fixed top-0 left-0 h-screen w-[280px] sm:w-[320px] liquid-panel-strong border-r border-white/10 z-50 flex flex-col gap-2 sm:gap-3 px-4 sm:px-5 py-6 relative overflow-hidden" id="mobileNavMenu" style={{letterSpacing:'0.03em', transform: 'translateZ(0)', willChange: 'backdrop-filter'}} aria-label="Mobile navigation menu">
              <div className="relative z-10 flex flex-col h-full">
                <a href="#home" className="flex flex-col items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group" onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('#home');
                }} aria-label="Go to home section">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg liquid-panel border border-white/15 p-1 transition-all duration-300 group-hover:scale-105">
                    <img src={MirshodImg} alt="W" className="w-full h-full rounded object-cover img-shimmer-load" />
                  </div>
                  <span className="text-base sm:text-lg font-bold text-white tracking-wider nav-logo-display">Mirshod</span>
                </a>
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    className={`mobile-nav-item w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base flex items-center gap-3 sm:gap-4 transition-all duration-300 border ${activeSection === item.key ? 'liquid-panel-strong text-white border-white/20 nav-item-active-indicator nav-item-active-dot' : 'liquid-panel text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20'}`}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.href);
                    }}
                    aria-label={`Navigate to ${item.label} section`}
                    aria-current={activeSection === item.key ? 'page' : undefined}
                  >
                    <span className="flex-shrink-0" aria-hidden="true">{item.icon}</span>
                    <span className="tracking-wide font-semibold link-draw">{item.label}</span>
                  </a>
                ))}
              </div>
            </nav>
            <div
              className="mobile-menu-backdrop liquid-menu-backdrop fixed inset-0 bg-black/35 backdrop-blur-md z-40"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
              role="button"
              tabIndex={0}
              onKeyDown={e => {if(e.key==='Enter'||e.key===' '){setIsMenuOpen(false)}}}
            />
          </>,
          document.body
        )}
      </header>
    </>
  );
};

export default Header;
