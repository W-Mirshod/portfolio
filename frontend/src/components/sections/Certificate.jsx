import { useTranslation } from 'react-i18next';
import CertificateImg from '/Certification-optimized.webp';

const Certificate = () => {
  const { t } = useTranslation();
  const skillsCovered = [
    t('certificate.skillsCovered.python'),
    t('certificate.skillsCovered.django'),
    t('certificate.skillsCovered.rest'),
    t('certificate.skillsCovered.database'),
    t('certificate.skillsCovered.auth'),
    t('certificate.skillsCovered.devops')
  ];

  return (
    <section id="certificate" className="liquid-section py-20 px-4 bg-bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-light liquid-title mb-3 tracking-wide animate-fadeInUp">{t('certificate.title')}</h2>
          <div className="liquid-divider mx-auto animate-fadeInUp delay-100"></div>
        </header>
        <div className="flex flex-col items-center animate-fadeInUp delay-200">
          <div className="liquid-panel liquid-panel-interactive rounded-xl p-8 border border-white/20 text-center max-w-3xl w-full transition-all duration-500">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-6 justify-center">
              <div className="flex items-center gap-4 justify-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-white/65 to-white/40 border border-white/35 text-white text-2xl">
                  <i className="fas fa-graduation-cap" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white leading-tight">{t('certificate.institution')}</h3>
                  <p className="text-xs sm:text-sm text-blue-100/75">{t('certificate.location')}</p>
                </div>
              </div>
              <div className="relative flex flex-col items-center mt-4 md:mt-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl liquid-panel-strong flex items-center justify-center mb-4 overflow-hidden shadow-lg border border-white/30">
                  <img
                    src={CertificateImg}
                    alt="Backend Python Django Bootcamp Certificate"
                    loading="lazy"
                    className="w-full h-full object-contain rounded-xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                    <a 
                      href="https://erp.student.najottalim.uz/public/certificate/9d153d70-07b5-4dd9-ae1d-3ff0ea50f531" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg liquid-btn liquid-btn-primary text-white font-semibold text-xs"
                    >
                      <i className="fas fa-external-link-alt" />
                      {t('certificate.buttons.verify')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 animate-fadeInUp delay-200">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-2">{t('certificate.course')}</h4>
                  <span className="inline-block px-3 py-1 rounded-md bg-white/15 text-blue-100 text-xs font-medium border border-white/30">{t('certificate.duration')}</span>
              </div>
              
              <div className="text-blue-100/85 text-sm leading-relaxed">
                <p className="mb-3">
                  {t('certificate.description')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {skillsCovered.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <i className="fas fa-check-circle text-white/90 text-sm" />
                      <span className="text-xs">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <div className="flex items-center gap-2 bg-white/10 text-blue-100 px-3 py-1 rounded-md text-xs font-medium border border-white/20">
                  <i className="fas fa-clock" />
                  <span>{t('certificate.badges.hours')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 text-blue-100 px-3 py-1 rounded-md text-xs font-medium border border-white/20">
                  <i className="fas fa-project-diagram" />
                  <span>{t('certificate.badges.projects')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 text-blue-100 px-3 py-1 rounded-md text-xs font-medium border border-white/20">
                  <i className="fas fa-certificate" />
                  <span>{t('certificate.badges.certified')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 text-blue-100 px-3 py-1 rounded-md text-xs font-medium border border-white/20">
                  <i className="fas fa-star" />
                  <span>{t('certificate.badges.graduated')}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 text-blue-100 px-3 py-1 rounded-md text-xs font-medium border border-white/20">
                  <i className="fas fa-calendar-alt" />
                  <span>{t('certificate.badges.date')}</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <a 
                  href="https://erp.student.najottalim.uz/public/certificate/9d153d70-07b5-4dd9-ae1d-3ff0ea50f531" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg liquid-btn liquid-btn-primary text-white font-semibold text-sm"
                >
                  <i className="fas fa-certificate" />
                  {t('certificate.buttons.view')}
                </a>
                <a 
                  href="https://najottalim.uz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg liquid-btn text-white font-semibold text-sm"
                >
                  <i className="fas fa-school" />
                  {t('certificate.buttons.visit')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
