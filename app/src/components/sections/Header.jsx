import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '../styles/Header.css';
import mirshodLogo from '../../assets/images/Mirshod.png';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    setLangMenuOpen(false);
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  const toggleLangMenu = () => {
    setLangMenuOpen(!langMenuOpen);
  };

  const handleNavLinkClick = () => {
    setMobileNavOpen(false);
  };

  const getLanguageDisplay = (lang) => {
    switch(lang) {
      case 'en': return 'EN';
      case 'uz': return 'UZ';
      case 'ru': return 'RU';
      default: return 'EN';
    }
  };

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <div className="logo-section">
        <a className="logo" href="#home">
          <img src={mirshodLogo} alt="W" width="50" height="50" />
          <span className="logo-text"></span>
        </a>
      </div>
      
      <nav className={`nav-desktop ${mobileNavOpen ? 'mobile-open' : ''}`}>
        <a className={`nav-item ${activeSection === 'home' ? 'active' : ''}`} href="#home" onClick={handleNavLinkClick}>{t('navigation.home')}</a>
        <a className={`nav-item ${activeSection === 'about' ? 'active' : ''}`} href="#about" onClick={handleNavLinkClick}>{t('navigation.about')}</a>
        <a className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`} href="#experience" onClick={handleNavLinkClick}>{t('navigation.experience')}</a>
        <a className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`} href="#skills" onClick={handleNavLinkClick}>{t('navigation.skills')}</a>
        <a className={`nav-item ${activeSection === 'achievements' ? 'active' : ''}`} href="#achievements" onClick={handleNavLinkClick}>{t('navigation.achievements')}</a>
        <a className={`nav-item ${activeSection === 'certificate' ? 'active' : ''}`} href="#certificate" onClick={handleNavLinkClick}>{t('navigation.certificate')}</a>
        <a className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`} href="#projects" onClick={handleNavLinkClick}>{t('navigation.projects')}</a>
        <a className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`} href="#contact" onClick={handleNavLinkClick}>{t('navigation.contact')}</a>
        <a className="nav-item" href="https://github.com/W-Mirshod" target="_blank" onClick={handleNavLinkClick}>GitHub</a>
      </nav>

      <div className="header-actions">
        <div className={`language-switcher compact-switcher ${langMenuOpen ? 'active' : ''}`}>
          <button className="language-btn compact-btn" onClick={toggleLangMenu}>
            <span className="current-lang">{getLanguageDisplay(currentLang)}</span>
            <FontAwesomeIcon icon={faGlobe} />
          </button>
          {langMenuOpen && (
            <ul className="language-dropdown compact-dropdown">
              <li><button onClick={() => changeLanguage('en')}>English</button></li>
              <li><button onClick={() => changeLanguage('uz')}>O'zbekcha</button></li>
              <li><button onClick={() => changeLanguage('ru')}>Русский</button></li>
            </ul>
          )}
        </div>

        <a href="https://github.com/W-Mirshod" target="_blank" className="github-link">
          <FontAwesomeIcon icon={faGithub} />
        </a>

        <button className="mobile-nav-toggle" onClick={toggleMobileNav}>
          <FontAwesomeIcon icon={mobileNavOpen ? faTimes : faBars} />
        </button>
      </div>
    </header>
  );
};

export default Header;
