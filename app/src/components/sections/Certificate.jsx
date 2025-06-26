import { useTranslation } from 'react-i18next';
import CertificateImg from '../../assets/images/Certification.png';

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
    <section id="certificate" className="bg-bg-secondary/30 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Professional Certification</h2>
          <p className="text-lg text-text-secondary">Backend Development Bootcamp Achievement</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="bg-bg-tertiary/80 rounded-2xl p-8 border border-border-color text-center shadow-neumorphism max-w-2xl w-full transition-all duration-300 hover:shadow-neumorphism-hover">
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white text-2xl">
                <i className="fas fa-graduation-cap" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-primary leading-tight">Najot Ta'lim</h3>
                <p className="text-sm text-text-secondary">Tashkent, Uzbekistan</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="relative flex flex-col items-center">
                <div className="w-40 h-40 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-4 overflow-hidden">
                  <img 
                    src={CertificateImg} 
                    alt="Backend Python Django Bootcamp Certificate" 
                    loading="lazy"
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity">
                    <a 
                      href="https://erp.student.najottalim.uz/public/certificate/9d153d70-07b5-4dd9-ae1d-3ff0ea50f531" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold text-sm shadow hover:bg-primary-dark transition"
                    >
                      <i className="fas fa-external-link-alt" />
                      Verify Certificate
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4 items-center md:items-start">
                <div className="flex flex-col items-center md:items-start">
                  <h4 className="text-lg font-bold text-primary">Backend Python Django (Standard)</h4>
                  <span className="inline-block mt-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">8 Months Intensive Program</span>
                </div>
                <div className="text-text-secondary text-sm md:text-base leading-relaxed">
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
                <div className="flex gap-4 mt-4 flex-wrap justify-center md:justify-start">
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
                <div className="flex gap-4 mt-6 flex-wrap justify-center md:justify-start">
                  <a 
                    href="https://erp.student.najottalim.uz/public/certificate/9d153d70-07b5-4dd9-ae1d-3ff0ea50f531" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-white font-semibold text-base shadow hover:bg-primary-dark transition"
                  >
                    <i className="fas fa-certificate" />
                    View Certificate
                  </a>
                  <a 
                    href="https://najottalim.uz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2 rounded-lg border-2 border-primary text-primary font-semibold text-base bg-transparent shadow hover:bg-primary hover:text-white transition"
                  >
                    <i className="fas fa-school" />
                    Visit Institution
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4">
              <div className="flex items-center gap-2 bg-yellow-400/20 text-yellow-700 px-4 py-2 rounded-full font-semibold text-sm">
                <i className="fas fa-star" />
                <span>Successfully Graduated</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary text-sm">
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
