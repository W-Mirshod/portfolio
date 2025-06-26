import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MirshodImg from '../../assets/images/Mirshod.png';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#certificate', label: 'Certificate' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  const specializations = [
    'Backend Development',
    'Frontend Development', 
    'DevOps & Cloud',
    'AI Integration',
    'Database Design',
    'API Development'
  ];

  const socialLinks = [
    {
      icon: 'fab fa-github',
      url: 'https://github.com/W-Mirshod',
      label: 'GitHub'
    },
    {
      icon: 'fab fa-linkedin',
      url: 'https://linkedin.com/in/wmirshod',
      label: 'LinkedIn'
    },
    {
      icon: 'fab fa-telegram',
      url: 'https://t.me/wmirshod',
      label: 'Telegram'
    },
    {
      icon: 'fas fa-envelope',
      url: 'mailto:mirshod@wmirshod.com',
      label: 'Email'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const audio = new Audio('/audio.m4a');
    const playAudio = () => {
      audio.play();
      document.removeEventListener('click', playAudio);
    };
    document.addEventListener('click', playAudio);

    return () => {
      document.removeEventListener('click', playAudio);
    };
  }, []);

  return (
    <footer className="bg-bg-secondary text-text-secondary py-12 border-t border-border-color">
      <div className="max-w-7xl mx-auto px-6 md:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold text-primary mb-4">{t("Quick Links")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold text-primary mb-4">{t("Specializations")}</h3>
            <ul className="space-y-2">
              {specializations.map((item, index) => (
                <li key={index} className="text-sm">
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold text-primary mb-4">{t("Connect With Me")}</h3>
            <ul className="space-y-4">
              {socialLinks.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors duration-200"
                  >
                    <i className={`${social.icon} text-lg`} />
                    {t(social.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center flex items-center justify-center gap-2">
          <img src={MirshodImg} alt="W-Mirshod" className="w-9 h-9 rounded-full object-cover" />
          <p className="text-sm text-text-muted">© {currentYear} W-Mirshod. {t("All Rights Reserved.")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
