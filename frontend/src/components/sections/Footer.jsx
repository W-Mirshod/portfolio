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

  return (
    <footer id="footer" className="bg-gradient-to-t from-bg-secondary to-bg-tertiary text-text-secondary py-10 sm:py-14 border-t border-border-color px-2 sm:px-4 animate-fadeInUp">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10">
          <div className="flex flex-col items-center text-center mb-6 md:mb-0">
            <img src={MirshodImg} alt="W-Mirshod" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover mb-3 border-4 border-primary shadow-lg animate-fadeInUp" />
            <span className="text-lg font-bold text-primary">W-Mirshod</span>
            <span className="text-xs text-text-muted mt-1">Full Stack Engineer</span>
          </div>
          <div className="flex flex-col md:pl-4 md:border-l border-border-color/20 items-center text-center mb-6 md:mb-0">
            <h3 className="text-base font-semibold text-primary mb-5 tracking-wide relative inline-block">
              <span className="after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary after:-mb-2 after:rounded-full">{t("Quick Links")}</span>
            </h3>
            <ul className="grid grid-cols-2 xs:grid-cols-3 gap-2 sm:gap-3 w-full">
              {quickLinks.map((link) => (
                <li key={link.href} className="flex justify-center">
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm font-medium hover:text-primary transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2 px-2 py-1 rounded-lg hover:bg-primary/10"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col md:pl-4 md:border-l border-border-color/20 items-center text-center mb-6 md:mb-0">
            <h3 className="text-base font-semibold text-primary mb-5 tracking-wide relative inline-block">
              <span className="after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-primary after:-mb-2 after:rounded-full">{t("Specializations")}</span>
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
              {specializations.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center justify-center px-3 py-2 rounded-lg bg-white/5 text-text-primary font-medium text-xs sm:text-sm border border-border-color select-none cursor-default hover:scale-105 transition-transform duration-200"
                >
                  {t(item)}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <h3 className="text-base sm:text-lg font-bold text-primary mb-3 sm:mb-4">{t("Connect With Me")}</h3>
            <div className="flex flex-col gap-2 sm:gap-3 w-full mt-2">
              <div className="flex flex-col gap-2">
                <a
                  href="mailto:wmirshod@gmail.com"
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg bg-white/5 text-text-primary font-medium text-xs sm:text-base border border-border-color hover:bg-primary/10 transition w-full justify-center"
                  style={{ letterSpacing: '.01em' }}
                >
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-primary/10 text-primary"><i className="fas fa-envelope text-lg" /></span>
                  wmirshod@gmail.com
                </a>
                <a
                  href="https://t.me/w_mirshod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg bg-white/5 text-text-primary font-medium text-xs sm:text-base border border-border-color hover:bg-cyan-500/10 transition w-full justify-center"
                  style={{ letterSpacing: '.01em' }}
                >
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-cyan-500/10 text-cyan-500"><i className="fab fa-telegram-plane text-lg" /></span>
                  @w_mirshod
                </a>
                <a
                  href="tel:+998907126437"
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg bg-white/5 text-text-primary font-medium text-xs sm:text-base border border-border-color hover:bg-green-600/10 transition w-full justify-center"
                  style={{ letterSpacing: '.01em' }}
                >
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-green-600/10 text-green-600"><i className="fas fa-phone-alt text-lg" /></span>
                  +998 90 712 64 37
                </a>
                <a
                  href="https://www.linkedin.com/in/w-mirshod/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg bg-white/5 text-text-primary font-medium text-xs sm:text-base border border-border-color hover:bg-blue-700/10 transition w-full justify-center"
                  style={{ letterSpacing: '.01em' }}
                >
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-blue-700/10 text-blue-700"><i className="fab fa-linkedin-in text-lg" /></span>
                  linkedin.com/in/w-mirshod
                </a>
                <a
                  href="https://github.com/W-Mirshod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg bg-white/5 text-text-primary font-medium text-xs sm:text-base border border-border-color hover:bg-gray-800/10 transition w-full justify-center"
                  style={{ letterSpacing: '.01em' }}
                >
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-gray-800/10 text-gray-800"><i className="fab fa-github text-lg" /></span>
                  github.com/W-Mirshod
                </a>
                <a
                  href="https://www.instagram.com/wmirshod?igsh=czRpZ3d5dzBxa2o3&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg bg-white/5 text-text-primary font-medium text-xs sm:text-base border border-border-color hover:bg-pink-500/10 transition w-full justify-center"
                  style={{ letterSpacing: '.01em' }}
                >
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-pink-500/10 text-pink-500"><i className="fab fa-instagram text-lg" /></span>
                  @wmirshod
                </a>
                <a
                  href="https://maps.google.com/?q=Tashkent, Uzbekistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg bg-white/5 text-text-primary font-medium text-xs sm:text-base border border-border-color hover:bg-green-500/10 transition w-full justify-center"
                  style={{ letterSpacing: '.01em', textAlign: 'center' }}
                >
                  <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-green-500/10 text-green-500"><i className="fas fa-map-marker-alt text-lg" /></span>
                  Tashkent, Uzbekistan
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-12 text-center text-xs text-text-muted tracking-wide animate-fadeInUp delay-200">
          © 2023-{currentYear} W-Mirshod. {t("All Rights Reserved.")} | Thanks for visiting my portfolio!
        </div>
      </div>
    </footer>
  );
};

export default Footer;
