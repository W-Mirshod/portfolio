import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import MirshodImg from '../../assets/images/Mirshod.png';
import { FaHome, FaUser, FaBriefcase, FaCode, FaTrophy, FaCertificate, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';
import '../styles/menu-futuristic.css';

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
    { href: '#home', key: 'home', label: 'Home', icon: <FaHome size={16} /> },
    { href: '#about', key: 'about', label: 'About', icon: <FaUser size={16} /> },
    { href: '#experience', key: 'experience', label: 'Experience', icon: <FaBriefcase size={16} /> },
    { href: '#skills', key: 'skills', label: 'Skills', icon: <FaCode size={16} /> },
    { href: '#achievements', key: 'achievements', label: 'Achievements', icon: <FaTrophy size={16} /> },
    { href: '#certificate', key: 'certificate', label: 'Certificate', icon: <FaCertificate size={16} /> },
    { href: '#projects', key: 'projects', label: 'Projects', icon: <FaProjectDiagram size={16} /> },
    { href: '#contact', key: 'contact', label: 'Contact', icon: <FaEnvelope size={16} /> }
  ];
  return (
    <>
      <aside className="hidden lg:fixed lg:flex flex-col items-center top-0 right-0 h-full w-24 z-[120] bg-gradient-to-b from-indigo-600/10 via-purple-500/10 to-blue-400/10 backdrop-blur-2xl border-l border-white/20 shadow-xl" style={{boxShadow:'0 2px 8px 0 rgba(31,38,135,0.15)', letterSpacing: '0.03em'}}>
        <a href="#home" className="flex flex-col items-center gap-2 mt-8 mb-8 group">
          <div className="w-14 h-14 rounded-2xl bg-white/20 shadow p-1 transform transition-all duration-300 group-hover:scale-110" style={{boxShadow: '0 0 6px #00d0ff33, inset 0 0 4px rgba(255,255,255,0.1)'}}>
            <img src={MirshodImg} alt="W" className="w-full h-full rounded-2xl object-cover" />
          </div>
          <span className="text-xs font-bold text-primary tracking-wider">W Mirshod</span>
        </a>
        <nav className="flex flex-col gap-6 w-full items-center">
          {navItems.map((item) => (
            <a
              key={item.key}
              className={`w-16 h-14 flex flex-col items-center justify-center rounded-xl font-medium text-xs transition-all duration-300 hover:scale-105 ${
                activeSection === item.key 
                ? 'bg-white/30 text-primary shadow scale-105' 
                : 'text-text-secondary hover:text-primary hover:bg-white/20'
              }`}
              href={item.href}
              style={activeSection === item.key ? {boxShadow: '0 0 6px #00d0ff22, inset 0 0 4px rgba(255,255,255,0.1)'} : {}}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="tracking-wide">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto mb-8 flex flex-col items-center gap-2">
          <button
            className="px-4 py-2 bg-white/20 rounded-xl font-semibold text-xs text-primary shadow-lg hover:bg-white/30 hover:scale-105 transition-all duration-300"
            aria-haspopup="true"
            aria-expanded={isLanguageOpen}
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            style={{boxShadow: '0 4px 8px rgba(0,0,0,0.1), inset 0 0 4px rgba(255,255,255,0.2)'}}
          >
            {getLanguageDisplay(currentLanguage)}
          </button>
          {isLanguageOpen && (
            <div className="absolute right-24 top-8 bg-white/80 border border-white/20 rounded-xl shadow-lg overflow-hidden min-w-[120px] z-50 backdrop-blur-lg" style={{boxShadow: '0 0 20px rgba(0,0,0,0.2), 0 0 8px #00d0ff22'}}>
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={`w-full px-4 py-3 text-left text-xs transition-all duration-200 ${currentLanguage === language.code ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:bg-bg-secondary hover:text-primary'}`}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  {language.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
      <header className="fixed top-0 left-0 w-full z-[100] lg:pr-24 bg-gradient-to-r from-bg-secondary/80 to-indigo-900/50 backdrop-blur-xl border-b border-white/10 shadow-neumorphism" style={{letterSpacing: '0.03em'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 lg:px-6 md:px-4">
          <div className="flex items-center gap-3 lg:hidden">
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-bg-tertiary shadow-neumorphism-inset p-1 group-hover:shadow-neumorphism-hover transition-all duration-300 group-hover:scale-105" style={{boxShadow: '0 0 16px #00d0ff33, inset 0 0 8px rgba(255,255,255,0.1)'}}>
                <img src={MirshodImg} alt="W" className="w-full h-full rounded-full object-cover" />
              </div>
              <span className="text-xl font-bold text-primary tracking-wide">W Mirshod</span>
            </a>
          </div>
          <div className="relative flex items-center gap-3 lg:hidden">
            <button
              className="px-5 py-2 bg-white/10 rounded-xl font-semibold text-sm text-primary hover:scale-105 transition-all duration-300"
              aria-haspopup="true"
              aria-expanded={isLanguageOpen}
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              style={{boxShadow: '0 4px 8px rgba(0,0,0,0.1), inset 0 0 4px rgba(255,255,255,0.1)'}}
            >
              {getLanguageDisplay(currentLanguage)}
            </button>
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg overflow-hidden min-w-[120px] z-50" style={{boxShadow: '0 0 20px rgba(0,0,0,0.2), 0 0 8px #00d0ff22'}}>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`w-full px-4 py-3 text-left text-sm transition-all duration-200 ${
                      currentLanguage === language.code 
                        ? 'bg-primary/20 text-primary' 
                        : 'text-text-secondary hover:bg-white/20 hover:text-primary'
                    }`}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            )}
            <div
              className="flex flex-col justify-center items-center w-10 h-10 bg-white/10 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105"
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
              style={{boxShadow: '0 4px 8px rgba(0,0,0,0.1), inset 0 0 4px rgba(255,255,255,0.1)'}}
            >
              <span className={`block w-5 h-0.5 bg-primary rounded transition-all duration-300 ${isMenuOpen ? 'translate-y-1 rotate-45' : ''}`} style={{boxShadow: '0 0 4px #00d0ff99'}}></span>
              <span className={`block w-5 h-0.5 bg-primary rounded transition-all duration-300 my-1 ${isMenuOpen ? 'opacity-0' : ''}`} style={{boxShadow: '0 0 4px #00d0ff99'}}></span>
              <span className={`block w-5 h-0.5 bg-primary rounded transition-all duration-300 ${isMenuOpen ? '-translate-y-1 -rotate-45' : ''}`} style={{boxShadow: '0 0 4px #00d0ff99'}}></span>
            </div>
          </div>
        </div>
        {typeof window !== 'undefined' && createPortal(
          <>
            <nav className={`fixed top-0 right-0 h-full w-72 bg-gradient-to-b from-indigo-600/20 via-purple-500/20 to-blue-400/10 backdrop-blur-2xl border-l border-white/20 shadow-xl z-[110] flex flex-col gap-4 px-6 py-20 transform transition-transform duration-500 ease-in-out lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:w-full`} id="mobileNavMenu" style={{boxShadow:'0 8px 32px 0 rgba(31,38,135,0.37)', letterSpacing: '0.03em'}}>
              <a href="#home" className="flex flex-col items-center gap-2 mb-8 group">
                <div className="w-16 h-16 rounded-2xl bg-white/20 shadow-lg p-1 transform transition-all duration-300 group-hover:scale-110" style={{boxShadow: '0 0 6px #00d0ff33, inset 0 0 4px rgba(255,255,255,0.1)'}}>
                  <img src={MirshodImg} alt="W" className="w-full h-full rounded-2xl object-cover" />
                </div>
                <span className="text-sm font-bold text-primary tracking-wider">W Mirshod</span>
              </a>
              {navItems.map((item) => (
                <a
                  key={item.key}
                  className={`w-full px-5 py-4 rounded-xl font-medium text-base flex items-center gap-3 transition-all duration-300 hover:scale-[1.02] ${
                    activeSection === item.key 
                      ? 'bg-white/30 text-primary' 
                      : 'text-text-secondary hover:text-primary hover:bg-white/20'
                  }`}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={activeSection === item.key ? {
                    boxShadow: '0 0 6px #00d0ff22, inset 0 0 4px rgba(255,255,255,0.1)',
                    borderLeft: '2px solid #00d0ff'
                  } : {}}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="tracking-wide">{item.label}</span>
                </a>
              ))}
              <div className="mt-auto flex flex-col items-center gap-4 pb-6 pt-32">
                <div className="flex flex-col items-center gap-1 text-sm text-footer-text-muted">
                  <span className="font-bold text-lg text-footer-heading">W-Mirshod</span>
                  <span className="font-medium">© 2023-2025 All Rights Reserved</span>
                </div>
              </div>
            </nav>
            {isMenuOpen && (
              <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden" 
                onClick={() => setIsMenuOpen(false)} 
              />
            )}
          </>,
          document.body
        )}
      </header>
    </>
  );
};

export default Header;
