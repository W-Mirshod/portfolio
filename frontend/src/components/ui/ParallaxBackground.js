import { setupMultiLayerParallax, setupFloatingParticles } from '../../utils/parallax.js';

/**
 * Creates a parallax background element with floating particles and parallax layers.
 * @param {string} innerHTMLContent - HTML for the content inside
 * @param {string} className
 * @param {number} particleCount
 * @returns {{ element: HTMLElement, cleanup: Function }}
 */
export default function createParallaxBackground(innerHTMLContent = '', className = '', particleCount = 15) {
  const container = document.createElement('div');
  container.className = `relative overflow-hidden ${className}`;

  container.innerHTML = `
    <div class="floating-particles"></div>
    <div class="parallax-layer-1 absolute inset-0 opacity-30" style="background: radial-gradient(ellipse at 20% 30%, rgba(57, 255, 20, 0.14) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(26, 170, 10, 0.12) 0%, transparent 50%)"></div>
    <div class="parallax-layer-2 absolute inset-0 opacity-20" style="background: radial-gradient(ellipse at 60% 20%, rgba(57, 255, 20, 0.1) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(18, 90, 10, 0.1) 0%, transparent 60%)"></div>
    <div class="parallax-layer-3 absolute inset-0 opacity-10" style="background: linear-gradient(135deg, rgba(57, 255, 20, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%)"></div>
    <div class="relative z-10">${innerHTMLContent}</div>
  `;

  const layer1 = container.querySelector('.parallax-layer-1');
  const layer2 = container.querySelector('.parallax-layer-2');
  const layer3 = container.querySelector('.parallax-layer-3');

  const cleanupParallax = setupMultiLayerParallax(layer1, layer2, layer3);
  const cleanupParticles = setupFloatingParticles(particleCount);

  return {
    element: container,
    cleanup: () => {
      cleanupParallax();
      cleanupParticles();
    }
  };
}
