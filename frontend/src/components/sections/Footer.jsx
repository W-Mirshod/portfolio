import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: 'fab fa-github',
      url: 'https://github.com/W-Mirshod',
      label: 'GitHub',
      color: 'hover:text-gray-300'
    },
    {
      icon: 'fab fa-linkedin',
      url: 'https://linkedin.com/in/wmirshod',
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    {
      icon: 'fab fa-telegram',
      url: 'https://t.me/wmirshod',
      label: 'Telegram',
      color: 'hover:text-cyan-400'
    },
    {
      icon: 'fab fa-instagram',
      url: 'https://www.instagram.com/wmirshod/?igsh=czRpZ3d5dzBxa2o3&utm_source=qr',
      label: 'Instagram',
      color: 'hover:text-pink-400'
    }
  ];

  return (
    <footer id="contact" className="py-16 px-4 bg-bg-secondary/30 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-3xl font-light text-white mb-3 tracking-wide animate-fadeInUp">Connect With Me</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto animate-fadeInUp delay-100"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <i className="fas fa-envelope text-sm text-white/70"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">Contact Information</h3>
            </div>
            
            <div className="space-y-3">
              <a
                href="mailto:wmirshod@gmail.com"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-md bg-red-600/20 flex items-center justify-center">
                  <i className="fas fa-envelope text-red-400 text-sm"></i>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Email</div>
                  <div className="text-xs text-gray-400">wmirshod@gmail.com</div>
                </div>
              </a>
              
              <a
                href="tel:+998907126437"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-md bg-green-600/20 flex items-center justify-center">
                  <i className="fas fa-phone text-green-400 text-sm"></i>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Phone</div>
                  <div className="text-xs text-gray-400">+998 90 712 64 37</div>
                </div>
              </a>
              
              <a
                href="https://maps.google.com/?q=Tashkent, Uzbekistan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-md bg-blue-600/20 flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-blue-400 text-sm"></i>
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Location</div>
                  <div className="text-xs text-gray-400">Tashkent, Uzbekistan</div>
                </div>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <i className="fas fa-share-alt text-sm text-white/70"></i>
              </div>
              <h3 className="text-lg font-semibold text-white">Social Media</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 rounded-lg bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300 ${link.color}`}
                >
                  <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center">
                    <i className={`${link.icon} text-white text-sm`}></i>
                  </div>
                  <div className="text-sm font-medium text-white">{link.label}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-sm text-gray-400">
            © {currentYear} W-Mirshod. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
