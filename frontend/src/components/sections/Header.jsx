import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
const MirshodImg = '/Mirshod-optimized.webp';
import { FaHome, FaUser, FaBriefcase, FaCode, FaTrophy, FaCertificate, FaProjectDiagram, FaEnvelope, FaSun, FaMoon } from 'react-icons/fa';
import '../styles/menu-futuristic.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [theme, setTheme] = useState(null);
  const currentLanguage = i18n.language;
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'ru', name: 'Russian' }
  ];


  // Theme management - RESPECT USER PREFERENCES
  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const currentTheme = theme || 'dark'; // Default to dark if theme is null
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'experience', 'skills', 'achievements', 'certificate', 'projects'];
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  // Handle smooth navigation
  const handleNavigation = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
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
    { href: '#home', key: 'home', label: t('navigation.home'), icon: <FaHome size={16} /> },
    { href: '#experience', key: 'experience', label: t('navigation.experience'), icon: <FaBriefcase size={16} /> },
    { href: '#skills', key: 'skills', label: t('navigation.skills'), icon: <FaCode size={16} /> },
    { href: '#achievements', key: 'achievements', label: t('navigation.achievements'), icon: <FaTrophy size={16} /> },
    { href: '#certificate', key: 'certificate', label: t('navigation.certificate'), icon: <FaCertificate size={16} /> },
    { href: '#projects', key: 'projects', label: t('navigation.projects'), icon: <FaProjectDiagram size={16} /> },
    { href: '#contact', key: 'contact', label: t('navigation.contact'), icon: <FaEnvelope size={16} /> }
  ];

  return (
    <>
      <aside className="hidden xl:fixed xl:flex flex-col items-center top-0 right-0 h-full w-20 sm:w-24 z-30 animate-fadeInUp desktop-sidebar" style={{fontFamily:'Poppins,sans-serif',letterSpacing:'0.03em'}}>
        <div className="w-full h-full bg-white/5 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col items-center relative">
          <div className="absolute inset-0 glass-shimmer opacity-30"></div>
          <div className="relative z-10">
            <a href="#home" className="flex flex-col items-center gap-2 mt-8 mb-8 group" onClick={(e) => {
              e.preventDefault();
              handleNavigation('#home');
            }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg p-1 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/15">
                <img src={MirshodImg} alt="W" className="w-full h-full rounded-2xl object-cover" />
              </div>
              <span className="text-sm font-bold text-white/90 tracking-wider drop-shadow-sm">W Mirshod</span>
            </a>
            <nav className="flex flex-col gap-2 sm:gap-3 w-full items-center px-2">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  className={`w-12 h-12 sm:w-14 sm:h-14 flex flex-col items-center justify-center rounded-xl font-medium text-sm transition-all duration-300 backdrop-blur-sm border ${activeSection === item.key ? 'bg-white/15 text-white shadow-lg border-white/30 shadow-cyan-500/20' : 'text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-cyan-500/10'}`}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                  style={activeSection === item.key ? {boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'} : {}}
                >
                  <span className="text-lg mb-1 drop-shadow-sm">{item.icon}</span>
                  <span className="tracking-wide hidden sm:block text-xs font-medium">{item.label}</span>
                </a>
              ))}
            </nav>
            <div className="mt-auto mb-8 flex flex-col items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:shadow-cyan-500/20 group"
                aria-label={`Switch to ${(theme || 'dark') === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${(theme || 'dark') === 'dark' ? 'light' : 'dark'} mode`}
              >
                <div className="relative w-5 h-5">
                  {/* Sun icon */}
                  <FaSun
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                      (theme || 'dark') === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                    } text-cyan-400 group-hover:text-cyan-300`}
                  />
                  {/* Moon icon */}
                  <FaMoon
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                      (theme || 'dark') === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                    } text-cyan-400 group-hover:text-cyan-300`}
                  />
                </div>
              </button>

              <div className="relative language-dropdown-container">
                <button
                  className="px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-sm text-white/90 shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:shadow-cyan-500/20"
                  aria-haspopup="true"
                  aria-expanded={isLanguageOpen}
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  {getLanguageDisplay(currentLanguage)}
                </button>
                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl overflow-hidden min-w-[110px] z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-200 ${currentLanguage === language.code ? 'bg-cyan-500/30 text-cyan-300 border-l-2 border-cyan-400' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                        onClick={() => handleLanguageChange(language.code)}
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
      <header className="fixed top-0 left-0 w-full z-20 xl:hidden animate-fadeInUp mobile-header" style={{letterSpacing: '0.03em'}}>
        <div className="w-full bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl relative">
          <div className="absolute inset-0 glass-shimmer opacity-20"></div>
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 py-2.5 sm:py-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <a href="#home" className="flex items-center gap-2 sm:gap-3 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg p-1 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/15">
                  <img src={MirshodImg} alt="W" className="w-full h-full rounded-xl object-cover" />
                </div>
                <span className="text-base sm:text-lg font-bold text-white/90 tracking-wide drop-shadow-sm">W Mirshod</span>
              </a>
            </div>
            <div className="relative flex items-center gap-2 sm:gap-3">
              {/* Theme Toggle for Mobile Header */}
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:shadow-cyan-500/20 group"
                aria-label={`Switch to ${(theme || 'dark') === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${(theme || 'dark') === 'dark' ? 'light' : 'dark'} mode`}
              >
                <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                  {/* Sun icon */}
                  <FaSun
                    className={`absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                      (theme || 'dark') === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                    } text-cyan-400 group-hover:text-cyan-300`}
                  />
                  {/* Moon icon */}
                  <FaMoon
                    className={`absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                      (theme || 'dark') === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                    } text-cyan-400 group-hover:text-cyan-300`}
                  />
                </div>
              </button>

              <div className="relative language-dropdown-container">
                <button
                  className="px-3 sm:px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold text-xs sm:text-sm text-white/90 shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:shadow-cyan-500/20"
                  aria-haspopup="true"
                  aria-expanded={isLanguageOpen}
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  {getLanguageDisplay(currentLanguage)}
                </button>
                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/30 rounded-lg shadow-2xl overflow-hidden min-w-[100px] z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        className={`w-full px-3 py-2 text-left text-sm transition-all duration-200 ${currentLanguage === language.code ? 'bg-cyan-500/30 text-cyan-300 border-l-2 border-cyan-400' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                        onClick={() => handleLanguageChange(language.code)}
                      >
                        {language.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div
                className="flex flex-col justify-center items-center w-8 h-8 sm:w-10 sm:h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/15 hover:shadow-cyan-500/20"
                role="button"
                tabIndex={0}
                aria-expanded={isMenuOpen}
                aria-controls="mobileNavMenu"
                aria-label="Toggle navigation menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                onKeyDown={e => {if(e.key==='Enter'||e.key===' '){setIsMenuOpen(!isMenuOpen)}}}
              >
                <span className={`block w-4 sm:w-5 h-0.5 bg-cyan-400 rounded transition-all duration-300 ${isMenuOpen ? 'translate-y-1 rotate-45' : ''}`}></span>
                <span className={`block w-4 sm:w-5 h-0.5 bg-cyan-400 rounded transition-all duration-300 my-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-4 sm:w-5 h-0.5 bg-cyan-400 rounded transition-all duration-300 ${isMenuOpen ? '-translate-y-1 -rotate-45' : ''}`}></span>
              </div>
            </div>
          </div>
          </div>
          </div>
        {typeof window !== 'undefined' && isMenuOpen && createPortal(
          <>
            <nav className="fixed top-0 right-0 h-screen w-64 sm:w-72 bg-white/5 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col gap-4 sm:gap-5 px-4 sm:px-5 py-12 shadow-2xl relative overflow-hidden animate-slideInRight" id="mobileNavMenu" style={{letterSpacing:'0.03em'}}>
              <div className="absolute inset-0 glass-shimmer opacity-20"></div>
              <div className="relative z-10 flex flex-col h-full">
                <a href="#home" className="flex flex-col items-center gap-2 sm:gap-3 mb-8 sm:mb-10 group" onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('#home');
                }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg p-1 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/15">
                    <img src={MirshodImg} alt="W" className="w-full h-full rounded-xl object-cover" />
                  </div>
                  <span className="text-base sm:text-lg font-bold text-white/90 tracking-wider drop-shadow-sm">W Mirshod</span>
                </a>
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    className={`mobile-nav-item w-full px-4 sm:px-5 py-4 sm:py-5 rounded-lg font-medium text-sm sm:text-base flex items-center gap-3 sm:gap-4 transition-all duration-300 backdrop-blur-sm border ${activeSection === item.key ? 'bg-white/15 text-white shadow-lg border-white/30 shadow-cyan-500/20' : 'text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-cyan-500/10'}`}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.href);
                    }}
                    style={activeSection === item.key ? {boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)'} : {}}
                  >
                    <span className="text-lg sm:text-xl drop-shadow-sm">{item.icon}</span>
                    <span className="tracking-wide font-medium">{item.label}</span>
                  </a>
                ))}

                {/* Theme Toggle in Mobile Menu */}
                <div className="flex justify-center mb-4">
                  <button
                    onClick={toggleTheme}
                    className="theme-toggle-btn w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:shadow-cyan-500/20 group"
                    aria-label={`Switch to ${(theme || 'dark') === 'dark' ? 'light' : 'dark'} mode`}
                    title={`Switch to ${(theme || 'dark') === 'dark' ? 'light' : 'dark'} mode`}
                  >
                    <div className="relative w-5 h-5">
                      {/* Sun icon */}
                      <FaSun
                        className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                          (theme || 'dark') === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                        } text-cyan-400 group-hover:text-cyan-300`}
                      />
                      {/* Moon icon */}
                      <FaMoon
                        className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                          (theme || 'dark') === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                        } text-cyan-400 group-hover:text-cyan-300`}
                      />
                    </div>
                  </button>
                </div>

                <div className="mobile-menu-footer flex flex-col items-center gap-2 sm:gap-3 pb-2 sm:pb-3 pt-2 sm:pt-3">
                  <div className="flex flex-col items-center gap-1 sm:gap-2 text-xs sm:text-sm text-white/60 backdrop-blur-sm border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                    <span className="font-bold text-sm sm:text-base text-cyan-300">W-Mirshod</span>
                    <span className="font-medium leading-tight text-center">© 2023-2025 All Rights Reserved</span>
                  </div>
                </div>
              </div>
            </nav>
            <div
              className="mobile-menu-backdrop fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          </>,
          document.body
        )}
      </header>
    </>
  );
};

export default Header;
