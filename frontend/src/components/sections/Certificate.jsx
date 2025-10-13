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
    <section id="certificate" className="bg-bg-secondary/30 py-14 px-2 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-8 animate-fadeInUp">
          <a
            href="https://university.pdp.uz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-2 rounded-lg bg-gradient-to-r from-primary via-blue-500 to-primary-dark text-white font-semibold text-lg shadow-lg border border-blue-500 transition mb-2 animate-glow hover:scale-105"
            style={{ boxShadow: '0 0 24px 4px #3b82f6, 0 2px 8px 0 #0002' }}
          >
            <i className="fas fa-university text-xl" />
            <span className="drop-shadow-lg">Accepted at PDP University</span>
          </a>
          <span className="text-blue-500 font-medium text-sm mb-2">Tashkent, Uzbekistan</span>
          <p className="text-center text-text-secondary text-base max-w-xl animate-fadeInUp delay-100">
            PDP University is a leading institution in Uzbekistan, renowned for its modern approach to IT education and strong industry connections. Being accepted here is a significant milestone, opening doors to advanced learning, innovative projects, and a vibrant tech community.
          </p>
        </div>
        <div className="text-center mb-10 sm:mb-12 animate-fadeInUp delay-200">
          <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-primary mb-2 drop-shadow-lg">Professional Certification</h2>
          <p className="text-base sm:text-lg text-text-secondary">Backend Development Bootcamp Achievement</p>
        </div>
        <div className="flex flex-col items-center animate-fadeInUp delay-300">
          <div className="bg-bg-tertiary/80 rounded-2xl p-4 sm:p-8 border border-border-color text-center shadow-neumorphism max-w-2xl w-full transition-all duration-300 hover:shadow-neumorphism-hover">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-6 justify-center">
              <div className="flex items-center gap-4 justify-center">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white text-2xl">
                  <i className="fas fa-graduation-cap" />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-primary leading-tight">Najot Ta'lim</h3>
                  <p className="text-xs sm:text-sm text-text-secondary">Tashkent, Uzbekistan</p>
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
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center animate-fadeInUp delay-400">
              <div className="flex-1 flex flex-col gap-4 items-center md:items-start">
                <div className="flex flex-col items-center md:items-start">
                  <h4 className="text-base sm:text-lg font-bold text-primary">Backend Python Django (Standard)</h4>
                  <span className="inline-block mt-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">8 Months Intensive Program</span>
                </div>
                <div className="text-text-secondary text-xs sm:text-sm md:text-base leading-relaxed">
                  <p>
                    Successfully completed an intensive 8-month Backend Development bootcamp specializing in Python and Django framework. The program covered comprehensive backend development skills including:
                  </p>
                  <ul className="list-none mt-2 space-y-1">
                    {skillsCovered.map((skill, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <i className="fas fa-check-circle text-primary text-base" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-3 sm:gap-4 mt-4 flex-wrap justify-center md:justify-start">
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    <i className="fas fa-clock" />
                    <span>240+ Hours</span>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    <i className="fas fa-project-diagram" />
                    <span>15+ Projects</span>
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    <i className="fas fa-certificate" />
                    <span>Certified</span>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4 mt-6 flex-wrap justify-center md:justify-start">
                  <a 
                    href="https://erp.student.najottalim.uz/public/certificate/9d153d70-07b5-4dd9-ae1d-3ff0ea50f531" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 rounded-lg bg-primary text-white font-semibold text-xs sm:text-base shadow hover:bg-primary-dark transition"
                  >
                    <i className="fas fa-certificate" />
                    View Certificate
                  </a>
                  <a 
                    href="https://najottalim.uz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-2 rounded-lg border-2 border-primary text-primary font-semibold text-xs sm:text-base bg-transparent shadow hover:bg-primary hover:text-white transition"
                  >
                    <i className="fas fa-school" />
                    Visit Institution
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4 animate-fadeInUp delay-500">
              <div className="flex items-center gap-2 bg-yellow-400/20 text-yellow-700 px-4 py-2 rounded-full font-semibold text-xs sm:text-sm">
                <i className="fas fa-star" />
                <span>Successfully Graduated</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-xs sm:text-sm">
                <i className="fas fa-calendar-alt" />
                <span>Completed: August 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
