import { useTranslation } from 'react-i18next';
import '../../components/styles/CertificateSection.css';

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
    <section id="certificate" className="section certificate-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Professional Certification</h2>
          <p className="section-subtitle">Backend Development Bootcamp Achievement</p>
        </div>
        
        <div className="certificate-content">
          <div className="certificate-card">
            <div className="certificate-header">
              <div className="institution-logo">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="institution-info">
                <h3>Najot Ta'lim</h3>
                <p>Tashkent, Uzbekistan</p>
              </div>
            </div>
            
            <div className="certificate-main">
              <div className="certificate-image">
                <img 
                  src="/sertification.png" 
                  alt="Backend Python Django Bootcamp Certificate" 
                  loading="lazy"
                />
                <div className="certificate-overlay">
                  <a 
                    href="https://erp.student.najottalim.uz/public/certificate/9d153d70-07b5-4dd9-ae1d-3ff0ea50f531" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="verify-btn"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    Verify Certificate
                  </a>
                </div>
              </div>
              
              <div className="certificate-details">
                <div className="certificate-title">
                  <h4>Backend Python Django (Standard)</h4>
                  <span className="duration-badge">8 Months Intensive Program</span>
                </div>
                
                <div className="certificate-description">
                  <p>
                    Successfully completed an intensive 8-month Backend Development bootcamp specializing in 
                    Python and Django framework. The program covered comprehensive backend development skills including:
                  </p>
                  
                  <div className="skills-covered">
                    <ul>
                      {skillsCovered.map((skill, index) => (
                        <li key={index}>
                          <i className="fas fa-check-circle"></i>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="certificate-stats-modern">
                  <div className="stat-modern">
                    <i className="fas fa-clock"></i>
                    <span>240+ Hours</span>
                  </div>
                  <div className="stat-modern">
                    <i className="fas fa-project-diagram"></i>
                    <span>15+ Projects</span>
                  </div>
                  <div className="stat-modern">
                    <i className="fas fa-certificate"></i>
                    <span>Certified</span>
                  </div>
                </div>
                
                <div className="certificate-actions centered-actions">
                  <a 
                    href="https://erp.student.najottalim.uz/public/certificate/9d153d70-07b5-4dd9-ae1d-3ff0ea50f531" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn primary"
                  >
                    <i className="fas fa-certificate"></i>
                    View Certificate
                  </a>
                  
                  <a 
                    href="https://najottalim.uz" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn secondary"
                  >
                    <i className="fas fa-school"></i>
                    Visit Institution
                  </a>
                </div>
              </div>
            </div>
            
            <div className="certificate-footer">
              <div className="achievement-badge">
                <i className="fas fa-star"></i>
                <span>Successfully Graduated</span>
              </div>
              <div className="date-info">
                <i className="fas fa-calendar-alt"></i>
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
