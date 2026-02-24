import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import experienceData from '../../data/experience.json';

const Experience = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    gsap.set(contentRef.current, { opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.set(contentRef.current, { opacity: 1, y: 0 });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="liquid-section bg-bg-secondary/20 py-14 px-2 sm:px-4" 
      role="main" 
      aria-labelledby="experience-title"
    >
      <div ref={contentRef} className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h2 id="experience-title" className="text-3xl font-light liquid-title mb-3 tracking-wide">{t('experience.title')}</h2>
          <div className="liquid-divider mx-auto"></div>
        </header>
        <div className="flex flex-col gap-8 sm:gap-6 max-w-4xl mx-auto" role="list" aria-label="Professional experience timeline">
          {experienceData.map((exp, index) => (
            <article 
              key={index} 
              className="group relative liquid-panel liquid-panel-interactive rounded-xl p-6 border border-white/25 transition-all duration-500" 
              role="listitem"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-col space-y-1">
                    <h3 className="text-xl font-semibold text-blue-100 tracking-tight">{t(`experience.data.${exp.id}.title`, { defaultValue: exp.title })}</h3>
                    <h4 className="text-sm font-medium text-blue-100/75">{t(`experience.data.${exp.id}.company`, { defaultValue: exp.company })}</h4>
                  </div>
                  <time className="text-xs font-mono text-blue-100 bg-white/15 px-3 py-1 rounded-md border border-white/35 self-start sm:self-center backdrop-blur-sm" dateTime={exp.period.split(' - ')[0]}>
                    {t(`experience.data.${exp.id}.period`, { defaultValue: exp.period })}
                  </time>
                </div>
                <p className="text-sm text-blue-100/85 leading-relaxed max-w-3xl">{t(`experience.data.${exp.id}.description`, { defaultValue: exp.description })}</p>
              </div>
            </article>
          ))}
        </div>
        <aside className="mt-20 flex flex-col items-center justify-center">
          <a
            href="https://linkedin.com/in/wmirshod"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex flex-col items-center gap-2 px-8 py-6 rounded-2xl liquid-btn liquid-btn-primary text-white font-semibold text-base transition-all duration-500 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="flex items-center gap-3 relative z-10">
              <i className="fab fa-linkedin text-2xl group-hover:scale-110 transition-transform duration-300" />
              <span className="text-lg font-bold">{t('experience.linkedIn.profile')}</span>
              <div className="flex items-center gap-2 bg-white/25 text-white font-bold text-sm px-4 py-2 rounded-full border border-white/45 backdrop-blur-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 0A4 4 0 0012 4a4 4 0 00-1 7.87" /></svg>
                1,800+
                <span className="text-xs font-medium">{t('experience.linkedIn.connections')}</span>
              </div>
            </span>
            <span className="text-white/85 font-medium text-sm relative z-10 group-hover:text-white transition-colors duration-300">{t('experience.linkedIn.visit')}</span>
          </a>
        </aside>
      </div>
    </section>
  );
};

export default Experience;
