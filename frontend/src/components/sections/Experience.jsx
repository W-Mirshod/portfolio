import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const Experience = () => {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch('/api/experiences/')
      .then(res => res.json())
      .then(data => setExperiences(data))
      .catch(() => setExperiences([]));
  }, []);

  return (
    <section id="experience" className="bg-bg-secondary/30 py-14 px-2 sm:px-4" role="main" aria-labelledby="experience-title">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10 sm:mb-12">
          <h2 id="experience-title" className="text-2xl xs:text-3xl md:text-4xl font-bold text-primary mb-2 drop-shadow-lg animate-fadeInUp">Professional Experience</h2>
          <p className="text-base sm:text-lg text-text-secondary animate-fadeInUp delay-100">Building expertise through hands-on development</p>
        </header>
        <div className="flex flex-col gap-8 sm:gap-10 max-w-3xl mx-auto animate-fadeInUp delay-200" role="list" aria-label="Professional experience timeline">
          {experiences.map((exp, index) => (
            <article key={index} className="relative flex flex-col md:flex-row bg-bg-tertiary/80 rounded-2xl p-5 sm:p-8 border border-border-color shadow-neumorphism transition-all duration-300 hover:shadow-neumorphism-hover hover:scale-[1.01]" role="listitem">
              <div className="absolute left-4 top-8 w-4 h-4 rounded-full bg-primary shadow-lg border-4 border-bg-secondary z-10 hidden sm:block" aria-hidden="true"></div>
              <div className="md:w-1/4 flex-shrink-0 flex flex-col items-start md:items-end mb-4 md:mb-0 pr-0 md:pr-8">
                <time className="inline-block mb-2 font-semibold text-primary bg-primary/10 px-3 py-1 rounded-lg text-xs" dateTime={exp.period.split(' - ')[0]}>
                  {exp.period}
                </time>
              </div>
              <div className="md:w-3/4 flex flex-col gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-primary mb-1">{exp.title}</h3>
                <h4 className="text-sm sm:text-base font-medium text-text-secondary mb-1">{exp.company}</h4>
                <p className="text-sm sm:text-base text-text-secondary mb-2 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.isArray(exp.skills) && exp.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside className="mt-12 flex flex-col items-center justify-center animate-fadeInUp delay-300">
          <a
            href="https://linkedin.com/in/wmirshod"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center gap-1 px-6 py-3 rounded-xl bg-gradient-to-r from-primary via-cyan-500 to-primary-dark text-white font-semibold text-base shadow-neumorphism transition-all duration-300 hover:scale-105 hover:shadow-neumorphism-hover border border-cyan-500 animate-pulse-slow"
            style={{ boxShadow: '0 0 12px 2px #22d3ee, 0 2px 8px 0 #0002' }}
          >
            <span className="flex items-center gap-2">
              <i className="fab fa-linkedin text-xl" />
              <span>LinkedIn Profile</span>
              <span className="ml-2 flex items-center bg-white/10 text-cyan-100 font-bold text-lg px-3 py-1 rounded-full border border-cyan-400 animate-bounce-slow">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 0A4 4 0 0012 4a4 4 0 00-1 7.87" /></svg>
                900+
                <span className="ml-1 text-sm font-medium">Connections</span>
              </span>
            </span>
            <span className="text-cyan-200 font-medium text-xs mt-1">Visit LinkedIn profile</span>
          </a>
        </aside>
      </div>
    </section>
  );
};

export default Experience;
