import { useEffect } from 'react';
import { useMultiLayerParallax, useFloatingParticles } from '../../utils/parallax';

const ParallaxBackground = ({ children, className = "", particleCount = 15 }) => {
  const { layer1Ref, layer2Ref, layer3Ref } = useMultiLayerParallax();
  useFloatingParticles(particleCount);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Floating particles background */}
      <div className="floating-particles" />

      {/* Parallax layers */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 parallax-layer-1 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 20% 30%, rgba(63, 162, 246, 0.15) 0%, transparent 50%),
                       radial-gradient(ellipse at 80% 70%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)`,
        }}
      />

      <div
        ref={layer2Ref}
        className="absolute inset-0 parallax-layer-2 opacity-20"
        style={{
          background: `radial-gradient(ellipse at 60% 20%, rgba(63, 162, 246, 0.12) 0%, transparent 60%),
                       radial-gradient(ellipse at 30% 80%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)`,
        }}
      />

      <div
        ref={layer3Ref}
        className="absolute inset-0 parallax-layer-3 opacity-10"
        style={{
          background: `linear-gradient(135deg, rgba(63, 162, 246, 0.05) 0%, rgba(37, 99, 235, 0.03) 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;
