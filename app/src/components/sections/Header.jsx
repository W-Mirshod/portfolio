import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import MirshodImg from '../../assets/images/Mirshod.png';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const currentLanguage = i18n.language;
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'ru', name: 'Russian' }
  ];
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'achievements', 'certificate', 'projects', 'contact'];
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
    { href: '#home', key: 'home', label: 'Home' },
    { href: '#about', key: 'about', label: 'About' },
    { href: '#experience', key: 'experience', label: 'Experience' },
    { href: '#skills', key: 'skills', label: 'Skills' },
    { href: '#achievements', key: 'achievements', label: 'Achievements' },
    { href: '#certificate', key: 'certificate', label: 'Certificate' },
    { href: '#projects', key: 'projects', label: 'Projects' },
    { href: '#contact', key: 'contact', label: 'Contact' }
  ];
  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-bg-secondary/80 backdrop-blur-md border-b border-border-color shadow-neumorphism">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 lg:px-6 md:px-4">
        <div className="flex items-center gap-3">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-bg-tertiary shadow-neumorphism-inset p-1 group-hover:shadow-neumorphism-hover transition-all duration-300">
              <img src={MirshodImg} alt="W" className="w-full h-full rounded-full object-cover" />
            </div>
            <span className="text-xl font-bold text-primary tracking-wide">W Mirshod</span>
          </a>
        </div>
        <nav className="hidden lg:flex gap-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.key}
              className={`relative px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeSection === item.key 
                  ? 'text-primary bg-bg-tertiary shadow-neumorphism-inset' 
                  : 'text-text-secondary hover:text-primary hover:bg-bg-tertiary/50 hover:shadow-neumorphism'
              }`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
          <a 
            className="px-4 py-2 rounded-xl font-medium text-sm text-text-secondary hover:text-primary hover:bg-bg-tertiary/50 hover:shadow-neumorphism transition-all duration-300" 
            href="https://github.com/W-Mirshod" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <button
              className="px-5 py-2 bg-bg-tertiary rounded-xl font-semibold text-sm text-primary shadow-neumorphism hover:shadow-neumorphism-hover focus:outline-none focus:shadow-neumorphism-inset transition-all duration-300"
              aria-haspopup="true"
              aria-expanded={isLanguageOpen}
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              {getLanguageDisplay(currentLanguage)}
            </button>
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-bg-tertiary border border-border-color rounded-xl shadow-neumorphism overflow-hidden min-w-[120px] z-50">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`w-full px-4 py-3 text-left text-sm transition-all duration-200 ${
                      currentLanguage === language.code 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-text-secondary hover:bg-bg-secondary hover:text-primary'
                    }`}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 bg-bg-tertiary rounded-xl shadow-neumorphism cursor-pointer transition-all duration-300 hover:shadow-neumorphism-hover"
            role="button"
            tabIndex={0}
            aria-expanded={isMenuOpen}
            aria-controls="mobileNavMenu"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }
            }}
          >
            <span className={`block w-5 h-0.5 bg-primary rounded transition-all duration-300 ${isMenuOpen ? 'translate-y-1 rotate-45' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-primary rounded transition-all duration-300 my-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-primary rounded transition-all duration-300 ${isMenuOpen ? '-translate-y-1 -rotate-45' : ''}`}></span>
          </div>
        </div>
      </div>
      {typeof window !== 'undefined' && createPortal(
        <>
          <nav className={`fixed top-0 right-0 h-full w-80 bg-bg-secondary border-l border-border-color shadow-neumorphism z-[110] flex flex-col gap-4 px-6 py-20 transform transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:w-full`} id="mobileNavMenu">
            {navItems.map((item) => (
              <a
                key={item.key}
                className="px-4 py-3 rounded-xl font-medium text-base text-text-secondary border-b border-border-color/30 hover:text-primary hover:bg-bg-tertiary/50 hover:shadow-neumorphism transition-all duration-300"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="px-4 py-3 rounded-xl font-medium text-base text-text-secondary hover:text-primary hover:bg-bg-tertiary/50 hover:shadow-neumorphism transition-all duration-300"
              href="https://github.com/W-Mirshod"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              GitHub
            </a>
            <div className="mt-auto flex flex-col items-center gap-4 pb-6 pt-10 border-t border-border-color/30">
              <div className="flex flex-col items-center gap-1 text-sm text-footer-text-muted">
                <span className="font-bold text-lg text-footer-heading">W-Mirshod</span>
                <span className="font-medium">© 2023-2025 All Rights Reserved</span>
              </div>
              <a
                href="https://github.com/W-Mirshod"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold shadow hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <i className="fab fa-github text-lg" />
                <span>Visit GitHub</span>
              </a>
            </div>
          </nav>
          {isMenuOpen && <div className="fixed inset-0 bg-black/40 z-[100] lg:hidden" onClick={() => setIsMenuOpen(false)} />}
        </>,
        document.body
      )}
    </header>
  );
};

export default Header;
