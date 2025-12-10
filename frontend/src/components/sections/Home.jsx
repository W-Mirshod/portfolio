import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { initializeAudio } from '../../utils/audio';
import ParallaxBackground from '../ui/ParallaxBackground';

const Home = () => {
  const { t } = useTranslation();
  
  const enableEffects = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
    window.matchMedia('(min-width: 768px)').matches;

  useEffect(() => {
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const cleanup = initializeAudio('/warm-ambient-sound.mp3', 0.5);
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
    window.addEventListener('pointerdown', start, { once: true });
    window.addEventListener('keydown', start, { once: true });
    return () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
  }, []);

  const handleNavigation = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-10 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-20">
      {enableEffects && (
        <ParallaxBackground className="absolute inset-0">
          <div className="absolute inset-0 w-full h-full bg-bg-secondary/30" />
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-transparent via-transparent to-bg-secondary/20" />
        </ParallaxBackground>
      )}
      {!enableEffects && (
        <div className="absolute inset-0 w-full h-full bg-bg-secondary/30" />
      )}

      <div className="relative flex flex-col justify-center items-center w-full h-full max-w-7xl mx-auto z-10 py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-white/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="flex flex-col items-center justify-center text-center w-full max-w-7xl mx-auto relative space-y-8 sm:space-y-10 md:space-y-12">
          <div className="flex flex-col items-center justify-center text-center w-full space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 lg:items-start lg:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 layered-entrance lg:justify-start">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 rounded-full blur-xl animate-pulse"></div>
                <img
                  src="/Mirshod-optimized.webp"
                  alt="Mirshod Qayimov"
                  className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full object-cover border-4 border-white/20 shadow-2xl ring-2 ring-cyan-400/30"
                  loading="eager"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent lg:text-left">
                Mirshod Qayimov
              </h1>
            </div>

            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/90 font-semibold layered-entrance" style={{ animationDelay: '0.1s' }}>
              Backend Engineer + AI Integration
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl leading-relaxed layered-entrance flex items-center justify-center gap-2 sm:gap-3 lg:justify-start" style={{ animationDelay: '0.2s' }}>
              Building AI-powered product prototype <i className="fas fa-arrow-right-long text-cyan-400"></i> Production-Ready
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 layered-entrance lg:justify-start" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={() => handleNavigation('#projects')}
                className="px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white font-medium text-sm sm:text-base lg:text-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Projects
              </button>
              <button
                onClick={() => handleNavigation('#contact')}
                className="px-6 sm:px-8 lg:px-10 py-3 sm:py-3.5 lg:py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg text-white font-medium text-sm sm:text-base lg:text-lg hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Let's Talk
              </button>
            </div>
          </div>

          <div className="w-full max-w-6xl mx-auto layered-entrance mt-8" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
              <div className="flex-1">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 lg:p-8 xl:p-10 text-center lg:text-left h-full flex flex-col justify-center">
                  <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-2">99.7%</div>
                  <div className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-1">Uptime</div>
                  <div className="text-sm sm:text-base text-gray-400/70">System uptime</div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-4 lg:gap-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 lg:p-8 text-center hover:bg-white/8 hover:border-white/20 transition-all duration-300 flex flex-col justify-center">
                  <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2">15+</div>
                  <div className="text-base sm:text-lg lg:text-xl text-gray-300 mb-1">Projects</div>
                  <div className="text-sm sm:text-base text-gray-400/70">Projects delivered</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 sm:p-6 lg:p-8 text-center hover:bg-white/8 hover:border-white/20 transition-all duration-300 flex flex-col justify-center">
                  <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2">91%</div>
                  <div className="text-base sm:text-lg lg:text-xl text-gray-300 mb-1">Speed ↑</div>
                  <div className="text-sm sm:text-base text-gray-400/70">Performance gains</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-6xl mx-auto layered-entrance mt-6 lg:mt-8" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 lg:p-10">
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white mb-6 lg:mb-8 text-center lg:text-left">What I Do</h3>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
                <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-5 sm:p-6 lg:p-8 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-300 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 rounded-lg bg-white/10 flex items-center justify-center">
                    <i className="fas fa-server text-xl sm:text-2xl lg:text-3xl text-white/70"></i>
                  </div>
                  <h4 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-white mb-2">Backend APIs</h4>
                </div>
                <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-5 sm:p-6 lg:p-8 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-300 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 rounded-lg bg-white/10 flex items-center justify-center">
                    <i className="fas fa-brain text-xl sm:text-2xl lg:text-3xl text-white/70"></i>
                  </div>
                  <h4 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-white mb-2">AI/ML Systems</h4>
                </div>
                <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-5 sm:p-6 lg:p-8 border border-white/10 hover:bg-white/8 hover:border-white/20 transition-all duration-300 text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 lg:mb-6 rounded-lg bg-white/10 flex items-center justify-center">
                    <i className="fas fa-cloud text-xl sm:text-2xl lg:text-3xl text-white/70"></i>
                  </div>
                  <h4 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-semibold text-white mb-2">DevOps</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
