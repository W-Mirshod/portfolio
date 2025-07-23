import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [tapCount, setTapCount] = useState(0);
  const [lastTap, setLastTap] = useState(0);

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

  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastTap < 600) {
      const newCount = tapCount + 1;
      setTapCount(newCount);
      if (newCount === 3) {
        setTapCount(0);
        navigate('/admin/login');
      }
    } else {
      setTapCount(1);
    }
    setLastTap(now);
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
      <aside className="hidden lg:fixed lg:flex flex-col items-center top-0 right-0 h-full w-20 z-30 bg-gradient-to-b from-[#181c24] via-[#23283a] to-[#181c24] border-l border-[#23283a] shadow-xl" style={{fontFamily:'Poppins,sans-serif',letterSpacing:'0.03em'}}>
        <a href="#home" className="flex flex-col items-center gap-2 mt-8 mb-8 group"
          onClick={handleLogoClick}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#23283a] shadow-lg p-1 transition-transform duration-200 group-hover:scale-105">
            <img src={MirshodImg} alt="W" className="w-full h-full rounded-2xl object-cover" />
          </div>
          <span className="text-xs font-bold text-[#00d0ff] tracking-wider">W Mirshod</span>
        </a>
        <nav className="flex flex-col gap-4 w-full items-center">
          {navItems.map((item) => (
            <a
              key={item.key}
              className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg font-medium text-xs transition-transform duration-200 hover:scale-105 ${activeSection === item.key ? 'bg-[#23283a] text-[#00d0ff] shadow-lg' : 'text-[#b0b8d1] hover:text-[#00d0ff] hover:bg-[#23283a]/80'}`}
              href={item.href}
              style={activeSection === item.key ? {boxShadow: '0 0 6px #00d0ff55'} : {}}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="tracking-wide">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto mb-8 flex flex-col items-center gap-2">
          <button
            className="px-3 py-2 bg-[#23283a] rounded-lg font-semibold text-xs text-[#00d0ff] shadow hover:bg-[#23283a]/80 transition-colors duration-200"
            aria-haspopup="true"
            aria-expanded={isLanguageOpen}
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            {getLanguageDisplay(currentLanguage)}
          </button>
          {isLanguageOpen && (
            <div className="absolute right-20 top-8 bg-[#23283a] border border-[#23283a] rounded-lg shadow-lg overflow-hidden min-w-[100px] z-40">
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={`w-full px-3 py-2 text-left text-xs transition-colors duration-150 ${currentLanguage === language.code ? 'bg-[#00d0ff22] text-[#00d0ff]' : 'text-[#b0b8d1] hover:bg-[#23283a]/60 hover:text-[#00d0ff]'}`}
                  onClick={() => handleLanguageChange(language.code)}
                >
                  {language.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
      <header className="fixed top-0 left-0 w-full z-20 lg:pr-20 bg-gradient-to-r from-[#181c24]/95 to-[#23283a]/90 border-b border-[#23283a] shadow-xl" style={{letterSpacing: '0.03em'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 lg:px-4 md:px-2">
          <div className="flex items-center gap-3 lg:hidden">
            <a href="#home" className="flex items-center gap-3 group" onClick={handleLogoClick}>
              <div className="w-10 h-10 rounded-full bg-[#23283a] shadow-lg p-1 group-hover:scale-105 transition-transform duration-200">
                <img src={MirshodImg} alt="W" className="w-full h-full rounded-full object-cover" />
              </div>
              <span className="text-lg font-bold text-[#00d0ff] tracking-wide">W Mirshod</span>
            </a>
          </div>
          <div className="relative flex items-center gap-3 lg:hidden">
            <button
              className="px-4 py-2 bg-[#23283a] rounded-lg font-semibold text-sm text-[#00d0ff] hover:bg-[#23283a]/80 transition-colors duration-200"
              aria-haspopup="true"
              aria-expanded={isLanguageOpen}
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              {getLanguageDisplay(currentLanguage)}
            </button>
            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-[#23283a] border border-[#23283a] rounded-lg shadow-lg overflow-hidden min-w-[100px] z-40">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`w-full px-3 py-2 text-left text-sm transition-colors duration-150 ${currentLanguage === language.code ? 'bg-[#00d0ff22] text-[#00d0ff]' : 'text-[#b0b8d1] hover:bg-[#23283a]/60 hover:text-[#00d0ff]'}`}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            )}
            <div
              className="flex flex-col justify-center items-center w-8 h-8 bg-[#23283a] rounded-lg cursor-pointer transition-transform duration-200 hover:scale-105"
              role="button"
              tabIndex={0}
              aria-expanded={isMenuOpen}
              aria-controls="mobileNavMenu"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onKeyDown={e => {if(e.key==='Enter'||e.key===' '){setIsMenuOpen(!isMenuOpen)}}}
            >
              <span className={`block w-5 h-0.5 bg-[#00d0ff] rounded transition-all duration-200 ${isMenuOpen ? 'translate-y-1 rotate-45' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-[#00d0ff] rounded transition-all duration-200 my-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-[#00d0ff] rounded transition-all duration-200 ${isMenuOpen ? '-translate-y-1 -rotate-45' : ''}`}></span>
            </div>
          </div>
        </div>
        {typeof window !== 'undefined' && createPortal(
          <>
            <nav className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-[#181c24] via-[#23283a] to-[#181c24] z-30 flex flex-col gap-4 px-4 py-16 transition-transform duration-300 lg:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:w-full`} id="mobileNavMenu" style={{boxShadow:'0 4px 16px 0 #00d0ff22',letterSpacing:'0.03em'}}>
              <a href="#home" className="flex flex-col items-center gap-2 mb-8 group" onClick={handleLogoClick}>
                <div className="w-12 h-12 rounded-2xl bg-[#23283a] shadow-lg p-1 group-hover:scale-105 transition-transform duration-200">
                  <img src={MirshodImg} alt="W" className="w-full h-full rounded-2xl object-cover" />
                </div>
                <span className="text-sm font-bold text-[#00d0ff] tracking-wider">W Mirshod</span>
              </a>
              {navItems.map((item) => (
                <a
                  key={item.key}
                  className={`w-full px-4 py-3 rounded-lg font-medium text-base flex items-center gap-3 transition-transform duration-200 hover:scale-[1.01] ${activeSection === item.key ? 'bg-[#23283a] text-[#00d0ff] shadow-lg' : 'text-[#b0b8d1] hover:text-[#00d0ff] hover:bg-[#23283a]/80'}`}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={activeSection === item.key ? {boxShadow: '0 0 6px #00d0ff55',borderLeft:'2px solid #00d0ff'} : {}}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="tracking-wide">{item.label}</span>
                </a>
              ))}
              <div className="flex flex-col items-center gap-4 pb-4 pt-6 mt-auto">
                <div className="flex flex-col items-center gap-1 text-xs text-[#b0b8d1]">
                  <span className="font-bold text-base text-[#00d0ff]">W-Mirshod</span>
                  <span className="font-medium leading-tight">© 2023-2025 All Rights Reserved</span>
                </div>
              </div>
            </nav>
            {isMenuOpen && (
              <div 
                className="fixed inset-0 bg-black/70 z-20 lg:hidden" 
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
