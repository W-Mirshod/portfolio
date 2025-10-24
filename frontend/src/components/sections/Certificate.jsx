import { useTranslation } from 'react-i18next';
// Use optimized certificate image for better performance
import CertificateImg from '/Certification-optimized.webp';

const Certificate = () => {
  const { t } = useTranslation();

  const skillsCovered = [
    "Python Programming",
    "Django Framework",
    "REST API Development",
    "Database Design",
    "Authentication & Security",
    "Deployment & DevOps"
  ];

  return (
    <section id="certificate" className="py-20 px-4 bg-bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="text-3xl font-light text-white mb-3 tracking-wide animate-fadeInUp">Professional Certification</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto animate-fadeInUp delay-100"></div>
        </header>
        <div className="flex flex-col items-center animate-fadeInUp delay-200">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-center max-w-3xl w-full transition-all duration-500 hover:bg-white/8 hover:border-white/20 hover:shadow-xl hover:shadow-primary/5">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-6 justify-center">
              <div className="flex items-center gap-4 justify-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white text-2xl">
                  <i className="fas fa-graduation-cap" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white leading-tight">Najot Ta'lim</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Tashkent, Uzbekistan</p>
                </div>
              </div>
              <div className="relative flex flex-col items-center mt-4 md:mt-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-4 overflow-hidden shadow-lg">
                  <img
                    src={CertificateImg}
                    alt="Backend Python Django Bootcamp Certificate"
                    loading="lazy"
                    className="w-full h-full object-contain rounded-xl"
                    onError={(e) => {
                      console.error('Certificate image failed to load:', e);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => console.log('Certificate image loaded successfully')}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                    <a 
                      href="https://erp.student.najottalim.uz/public/certificate/9d153d70-07b5-4dd9-ae1d-3ff0ea50f531" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold text-xs shadow hover:bg-primary-dark transition"
                    >
                      <i className="fas fa-external-link-alt" />
                      Verify Certificate
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 animate-fadeInUp delay-200">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-white mb-2">Backend Python Django (Standard)</h4>
                <span className="inline-block px-3 py-1 rounded-md bg-gray-900/50 text-gray-300 text-xs font-medium border border-gray-800">8 Months Intensive Program</span>
              </div>
              
              <div className="text-gray-300 text-sm leading-relaxed">
                <p className="mb-3">
                  Successfully completed an intensive 8-month Backend Development bootcamp specializing in Python and Django framework. The program covered comprehensive backend development skills including:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {skillsCovered.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <i className="fas fa-check-circle text-white text-sm" />
                      <span className="text-xs">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <div className="flex items-center gap-2 bg-gray-900/50 text-gray-300 px-3 py-1 rounded-md text-xs font-medium border border-gray-800">
                  <i className="fas fa-clock" />
                  <span>240+ Hours</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-900/50 text-gray-300 px-3 py-1 rounded-md text-xs font-medium border border-gray-800">
                  <i className="fas fa-project-diagram" />
                  <span>15+ Projects</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-900/50 text-gray-300 px-3 py-1 rounded-md text-xs font-medium border border-gray-800">
                  <i className="fas fa-certificate" />
                  <span>Certified</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-900/50 text-gray-300 px-3 py-1 rounded-md text-xs font-medium border border-gray-800">
                  <i className="fas fa-star" />
                  <span>Successfully Graduated</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-900/50 text-gray-300 px-3 py-1 rounded-md text-xs font-medium border border-gray-800">
                  <i className="fas fa-calendar-alt" />
                  <span>August 2024</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <a 
                  href="https://erp.student.najottalim.uz/public/certificate/9d153d70-07b5-4dd9-ae1d-3ff0ea50f531" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white font-semibold text-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <i className="fas fa-certificate" />
                  View Certificate
                </a>
                <a 
                  href="https://najottalim.uz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-white font-semibold text-sm bg-transparent hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  <i className="fas fa-school" />
                  Visit Institution
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
