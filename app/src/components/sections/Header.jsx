import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../components/styles/HeaderSection.css';

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
    <>
      <header id="header">
        <div className="logo-section">
          <a className="logo" href="#home">
            <img src="/Mirshod.png" alt="W" width="50" height="50" />
            <span className="logo-text">W Mirshod</span>
          </a>
        </div>
        
        <nav className="nav-desktop">
          {navItems.map((item) => (
            <a 
              key={item.key}
              className={`nav-item ${activeSection === item.key ? 'active' : ''}`} 
              href={item.href}
            >
              {item.label}
            </a>
          ))}
          <a className="nav-item" href="https://github.com/W-Mirshod" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>

        <div className="header-actions">
          <div className="language-switcher compact-switcher">
            <button 
              className="language-btn compact-btn" 
              id="languageBtn" 
              aria-haspopup="true" 
              aria-expanded={isLanguageOpen}
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <span className="current-lang">
                {getLanguageDisplay(currentLanguage)}
              </span>
              <i className="fas fa-chevron-down compact-arrow"></i>
            </button>
            {isLanguageOpen && (
              <div className="language-options compact-options" id="languageOptions">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div 
          className="menu-toggle" 
          role="button" 
          tabIndex="0" 
          aria-expanded={isMenuOpen} 
          aria-controls="mobileNavMenu" 
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsMenuOpen(!isMenuOpen);
            }
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <nav className={`nav-mobile ${isMenuOpen ? 'active' : ''}`} id="mobileNavMenu">
        {navItems.map((item) => (
          <a 
            key={item.key}
            className="nav-item" 
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a 
          className="nav-item" 
          href="https://github.com/W-Mirshod" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => setIsMenuOpen(false)}
        >
          GitHub
        </a>
      </nav>
    </>
  );
};

export default Header;
