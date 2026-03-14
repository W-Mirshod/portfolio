import i18n from '../../utils/i18n.js';

export default function createCertificate() {
  const CertificateImg = '/Certification-optimized.webp';
  const section = document.createElement('section');
  section.id = 'certificate';
  section.className = 'liquid-section py-20 px-4 bg-bg-secondary/20';

  function render() {
    const t = (k) => i18n.t(k);
    const skillsCovered = [t('certificate.skillsCovered.python'), t('certificate.skillsCovered.django'), t('certificate.skillsCovered.rest'), t('certificate.skillsCovered.database'), t('certificate.skillsCovered.auth'), t('certificate.skillsCovered.devops')];

    section.innerHTML = `
      <div class="max-w-5xl mx-auto">
        <header class="text-center mb-16">
          <h2 class="text-3xl font-light liquid-title mb-3 tracking-wide animate-fadeInUp">${t('certificate.title')}</h2>
          <div class="liquid-divider mx-auto animate-fadeInUp delay-100"></div>
        </header>
        <div class="flex flex-col items-center animate-fadeInUp delay-200">
          <div class="liquid-panel liquid-panel-interactive rounded-xl p-8 border border-white/20 text-center max-w-3xl w-full transition-all duration-500">
            <div class="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-6 justify-center">
              <div class="flex items-center gap-4 justify-center">
                <div class="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-white/65 to-white/40 border border-white/35 text-blue-200 text-2xl"><i class="fas fa-graduation-cap"></i></div>
                <div class="text-left">
                  <h3 class="text-lg font-semibold text-blue-100 leading-tight">${t('certificate.institution')}</h3>
                  <p class="text-xs sm:text-sm text-blue-100/75">${t('certificate.location')}</p>
                </div>
              </div>
              <div class="relative flex flex-col items-center mt-4 md:mt-0">
                <div class="w-32 h-32 sm:w-40 sm:h-40 rounded-xl liquid-panel-strong flex items-center justify-center mb-4 overflow-hidden shadow-lg border border-white/30">
                  <img src="${CertificateImg}" alt="Backend Python Django Bootcamp Certificate" loading="lazy" decoding="async" class="w-full h-full object-contain rounded-xl" onerror="this.style.display='none'"/>
                  <div class="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                    <a href="https://erp.student.najottalim.uz/public/certificate/9d153d70-07b5-4dd9-ae1d-3ff0ea50f531" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg liquid-btn liquid-btn-primary text-white font-semibold text-xs">
                      <i class="fas fa-external-link-alt"></i> ${t('certificate.buttons.verify')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-4 animate-fadeInUp delay-200">
              <div class="text-center">
                <h4 class="text-lg font-semibold text-blue-100 mb-2">${t('certificate.course')}</h4>
                <span class="inline-block px-3 py-1 rounded-md bg-white/15 text-blue-100 text-xs font-medium border border-white/30">${t('certificate.duration')}</span>
              </div>
              <div class="text-blue-100/85 text-sm leading-relaxed">
                <p class="mb-3">${t('certificate.description')}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  ${skillsCovered.map(skill => `<div class="flex items-center gap-2"><i class="fas fa-check-circle text-blue-300 text-sm"></i><span class="text-xs">${skill}</span></div>`).join('')}
                </div>
              </div>
              <div class="flex flex-wrap gap-2 justify-center">
                ${['hours', 'projects', 'certified', 'graduated', 'date'].map(badge => {
                  const icons = { hours: 'fa-clock', projects: 'fa-project-diagram', certified: 'fa-certificate', graduated: 'fa-star', date: 'fa-calendar-alt' };
                  return `<div class="flex items-center gap-2 bg-white/10 text-blue-100 px-3 py-1 rounded-md text-xs font-medium border border-white/20"><i class="fas ${icons[badge]}"></i><span>${t(`certificate.badges.${badge}`)}</span></div>`;
                }).join('')}
              </div>
              <div class="flex gap-3 justify-center">
                <a href="https://erp.student.najottalim.uz/public/certificate/9d153d70-07b5-4dd9-ae1d-3ff0ea50f531" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg liquid-btn liquid-btn-primary text-white font-semibold text-sm"><i class="fas fa-certificate"></i> ${t('certificate.buttons.view')}</a>
                <a href="https://najottalim.uz" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg liquid-btn text-white font-semibold text-sm"><i class="fas fa-school"></i> ${t('certificate.buttons.visit')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render();
  i18n.on('languageChanged', render);
  return section;
}
