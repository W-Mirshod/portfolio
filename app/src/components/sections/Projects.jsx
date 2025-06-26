import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import '../../components/styles/ProjectsSection.css';

const Projects = () => {
  const { t } = useTranslation();
  const projectsGridRef = useRef(null);
  const projectsObserver = useRef(null);
  const projectsCtaRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Yaklabs IoT Platform",
      description: "Innovative platform for IoT device management and data analytics with real-time capabilities.",
      icon: "fas fa-flask",
      technologies: ["Python", "Django", "WebSocket", "WebRTC", "Yaklabs"],
      githubUrl: "https://github.com/W-Mirshod/yaklabs-platform"
    },
    {
      id: 2,
      title: "Texnomart API",
      description: "Comprehensive API for online shopping website with full e-commerce functionality.",
      icon: "fas fa-shopping-cart",
      technologies: ["Python", "REST API", "E-commerce"],
      githubUrl: "https://github.com/W-Mirshod/texnomart-api"
    },
    {
      id: 3,
      title: "Online Shopping Platform",
      description: "Micro-service architecture e-shopping platform with modern design and scalable backend.",
      icon: "fas fa-store",
      technologies: ["CSS", "Microservices", "E-commerce"],
      githubUrl: "https://github.com/W-Mirshod/online-shopping"
    },
    {
      id: 4,
      title: "Online Course Platform",
      description: "E-Courses platform including teacher's and blog's own section with comprehensive features.",
      icon: "fas fa-graduation-cap",
      technologies: ["SCSS", "Education", "Platform"],
      githubUrl: "https://github.com/W-Mirshod/online-course"
    },
    {
      id: 5,
      title: "Hospital Management System",
      description: "Platform for hospitals where patients and doctors have their pages with patient records and departments.",
      icon: "fas fa-hospital",
      technologies: ["Python", "Healthcare", "Management"],
      githubUrl: "https://github.com/W-Mirshod/For-Grey_Scientific_Labs"
    },
    {
      id: 6,
      title: "GPT-Neo AI",
      description: "Basic Artificial Intelligence implementation running on local machine with advanced capabilities.",
      icon: "fas fa-robot",
      technologies: ["Python", "AI", "Machine Learning"],
      githubUrl: "https://github.com/W-Mirshod/GPT-Neo"
    }
  ];

  // Enhanced animations and interactive effects
  useEffect(() => {
    // Animation for section entrance
    if (projectsGridRef.current) {
      projectsGridRef.current.classList.add('animate-fade-up');
    }
    
    if (projectsCtaRef.current) {
      projectsCtaRef.current.classList.add('animate-fade-up');
    }

    // Intersection observer for progressive reveal
    projectsObserver.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add staggered animation to each card
          const siblings = Array.from(entry.target.parentNode.children);
          const index = siblings.indexOf(entry.target);
          const delay = index * 180;
          
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.classList.add('animate-elastic');
          }, delay);
          
          projectsObserver.current.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });

    // Apply enhanced initial state to each card
    const projectElements = document.querySelectorAll('.project-card');
    projectElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px) scale(0.9)';
      el.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      projectsObserver.current.observe(el);
    });

    // Add enhanced hover effects
    projectElements.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-20px) scale(1.05) rotateY(2deg)';
        card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.25), 0 0 40px rgba(63, 162, 246, 0.1)';
        card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Animate project image
        const projectImage = card.querySelector('.project-image');
        if (projectImage) {
          projectImage.style.transform = 'scale(1.15) rotate(5deg)';
          projectImage.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        
        // Reset project image
        const projectImage = card.querySelector('.project-image');
        if (projectImage) {
          projectImage.style.transform = 'scale(1) rotate(0deg)';
          projectImage.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        }
      });
    });
    
    // Project tag hover effects
    const projectTags = document.querySelectorAll('.project-tags span');
    projectTags.forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'scale(1.1)';
        tag.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
      });

      tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'scale(1)';
        tag.style.boxShadow = 'none';
      });
    });

    // Clean up
    return () => {
      if (projectsObserver.current) {
        projectsObserver.current.disconnect();
      }
      
      const projectElements = document.querySelectorAll('.project-card');
      projectElements.forEach(el => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
      
      const projectTags = document.querySelectorAll('.project-tags span');
      projectTags.forEach(tag => {
        tag.removeEventListener('mouseenter', () => {});
        tag.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t("Featured Projects")}</h2>
          <p className="section-subtitle">{t("Some of my recent work")}</p>
        </div>
        <div className="projects-grid" ref={projectsGridRef}>
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card" 
              data-tags={project.technologies.join(',').toLowerCase()}
              style={{ 
                animationDelay: `${0.4 + (index * 0.1)}s`,
              }}
            >
              <div className="project-image">
                <i className={project.icon}></i>
              </div>
              <div className="project-content">
                <h3 className="project-title">{t(project.title)}</h3>
                <p className="project-description">{t(project.description)}</p>
                <div className="project-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="project-tag">{t(tech)}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link primary"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    {t("View Project")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="projects-cta" ref={projectsCtaRef}>
          <a 
            href="https://github.com/W-Mirshod" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-outline"
          >
            <i className="fab fa-github"></i>
            {t("View All Projects")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
