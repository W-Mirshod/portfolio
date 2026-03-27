import {
  iconGithub,
  iconLinkedin,
  iconTelegram,
  iconInstagram,
  iconEnvelope,
  iconPhone,
  iconMapMarkerAlt,
  iconShareAlt,
} from '../../components/ui/Icons.js';
import { renderDotVersionLabel } from '../../components/ui/dotVersionLabel.js';

export function renderFooterHtml(i18n) {
  const t = (k) => i18n.t(k);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: iconGithub('14', 'text-blue-300'), url: 'https://github.com/W-Mirshod', label: 'GitHub', color: 'hover:text-white' },
    { icon: iconLinkedin('14', 'text-blue-300'), url: 'https://linkedin.com/in/wmirshod', label: 'LinkedIn', color: 'hover:text-blue-200' },
    { icon: iconTelegram('14', 'text-blue-300'), url: 'https://t.me/w_mirshod', label: 'Telegram', color: 'hover:text-sky-200' },
    { icon: iconInstagram('14', 'text-blue-300'), url: 'https://www.instagram.com/wmirshod/?igsh=czRpZ3d5dzBxa2o3&utm_source=qr', label: 'Instagram', color: 'hover:text-pink-200' },
  ];

  return `
    <footer id="contact" class="liquid-section section-accent-glow py-16 px-4 bg-bg-secondary/20 border-t border-white/20">
      <div class="max-w-4xl mx-auto">
        <header class="text-center mb-12">
          <h2 class="text-3xl font-light liquid-title mb-3 tracking-wide animate-fadeInUp">${t('footer.connect.title')}</h2>
          <div class="liquid-divider mx-auto animate-fadeInUp delay-100"></div>
        </header>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div class="liquid-panel rounded-xl p-6 border border-white/20">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-lg liquid-icon-shell flex items-center justify-center">${iconEnvelope('14', 'text-blue-300')}</div>
              <h3 class="text-lg font-semibold text-blue-100">${t('footer.connect.contactInfo')}</h3>
            </div>
            <div class="space-y-3">
              <a href="mailto:wmirshod@gmail.com" class="flex items-center gap-3 p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/35 transition-all duration-300">
                <div class="w-8 h-8 rounded-md bg-red-600/20 flex items-center justify-center">${iconEnvelope('14', 'text-red-400')}</div>
                <div><div class="text-sm font-medium text-blue-100">${t('footer.connect.email')}</div><div class="text-xs text-blue-100/70">wmirshod@gmail.com</div></div>
              </a>
              <a href="tel:+998907126437" class="flex items-center gap-3 p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/35 transition-all duration-300">
                <div class="w-8 h-8 rounded-md bg-green-600/20 flex items-center justify-center">${iconPhone('14', 'text-green-400')}</div>
                <div><div class="text-sm font-medium text-blue-100">${t('footer.connect.phone')}</div><div class="text-xs text-blue-100/70">+998 90 712 64 37</div></div>
              </a>
              <a href="https://maps.google.com/?q=Tashkent, Uzbekistan" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/35 transition-all duration-300">
                <div class="w-8 h-8 rounded-md bg-blue-600/20 flex items-center justify-center">${iconMapMarkerAlt('14', 'text-blue-400')}</div>
                <div><div class="text-sm font-medium text-blue-100">${t('footer.connect.location')}</div><div class="text-xs text-blue-100/70">Tashkent, Uzbekistan</div></div>
              </a>
            </div>
          </div>
          <div class="liquid-panel rounded-xl p-6 border border-white/20">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 rounded-lg liquid-icon-shell flex items-center justify-center">${iconShareAlt('14', 'text-blue-300')}</div>
              <h3 class="text-lg font-semibold text-blue-100">${t('footer.connect.socialMedia')}</h3>
            </div>
            <div class="grid grid-cols-2 gap-3">
              ${socialLinks
                .map(
                  (link) => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 p-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/35 transition-all duration-300 ${link.color}">
                  <div class="w-8 h-8 rounded-md liquid-icon-shell flex items-center justify-center">${link.icon}</div>
                  <div class="text-sm font-medium text-blue-100">${link.label}</div>
                </a>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
        <div class="text-center pt-8 border-t border-white/20">
          <div class="page-version-mark mb-5" aria-label="Version 4.3">
            ${renderDotVersionLabel('VERSION 4.3')}
          </div>
          <p class="text-sm text-blue-100/70">© 2023-${currentYear} W-Mirshod. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}
