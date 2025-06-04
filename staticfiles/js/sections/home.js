// Home Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Typing animation for hero text
    const typingText = document.querySelector('.typing-text');
    const typingCursor = document.querySelector('.typing-cursor');
    
    if (typingText && typingCursor) {
        const texts = [
            'Backend Developer & AI Engineer',
            'Microservices & APIs Specialist', 
            'DevOps & Cloud Expert',
            'AI APIs Enthusiast',
            'Performance Optimization Expert',
            'Full-Stack Python Developer'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        setTimeout(typeWriter, 1000);
    }

    // Parallax effect for floating cards
    const floatingCards = document.querySelectorAll('.tech-card');
    let ticking = false;

    // Store original index for consistent parallax calculation if needed later
    floatingCards.forEach((card, i) => {
        card.dataset.originalIndex = i;
    });

    function getParallaxTransformValue(index) {
        const scrolled = window.pageYOffset;
        // Original parallax calculation: (index % 3 + 1) * 0.2
        // Ensure 'index' is a number
        const numericIndex = parseInt(index);
        const parallaxMultiplier = ((numericIndex % 3) + 1) * 0.2;
        const rate = scrolled * -0.05 * parallaxMultiplier;
        return `translateY(${rate}px)`;
    }

    function restoreCardDefaultState(card, index) {
        const parallaxTransform = getParallaxTransformValue(index);
        card.style.transform = `${parallaxTransform} scale(1) rotate(0deg)`;
        card.style.zIndex = '1';
        card.style.filter = 'none';
        // Re-apply continuous animations if they were stopped by JS,
        // but prefer CSS to handle this if possible.
        // card.style.animation = 'techCardPulse 4s ease-in-out infinite'; // Example if needed
    }


    function updateParallax() {
        const scrolled = window.pageYOffset;
        floatingCards.forEach((card) => {
            // Only apply parallax if the card is not being actively interacted with
            // This check is basic; more robust state management might be needed if issues persist
            if (!card.classList.contains('is-hovered') && !card.classList.contains('is-clicking')) {
                const index = card.dataset.originalIndex;
                card.style.transform = getParallaxTransformValue(index);
            }
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Consolidated event listeners for tech cards
    floatingCards.forEach((card, index) => {
        // Add staggered reveal animation (from CSS)
        card.style.animationDelay = `${0.9 + (index * 0.1)}s`;

        card.addEventListener('mouseenter', () => {
            card.classList.add('is-hovered');
            const techType = card.getAttribute('data-tech');
            let rotation = index % 2 === 0 ? '8deg' : '-8deg';
            
            if (techType === 'python') rotation = '-12deg';
            if (techType === 'ai') rotation = '15deg';
            if (techType === 'docker') rotation = '10deg';
            if (techType === 'javascript') rotation = '12deg';
            
            const currentParallaxY = getParallaxTransformValue(index); // Get current Y due to parallax
            // Apply hover effects on top of current parallax Y
            card.style.transform = `${currentParallaxY} scale(1.2) translateY(-20px) rotate(${rotation})`;
            card.style.zIndex = '20';
            card.style.filter = 'brightness(1.2) saturate(1.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('is-hovered');
            if (!card.classList.contains('is-clicking')) { // Don't reset if a click animation is active
                restoreCardDefaultState(card, index);
            }
        });
        
        card.addEventListener('click', (e) => {
            e.preventDefault();
            card.classList.add('is-clicking');

            const currentParallaxY = getParallaxTransformValue(index);
            card.style.transform = `${currentParallaxY} scale(0.95) translateY(-5px) rotate(0deg)`;
            // card.style.filter = 'brightness(1.5) saturate(1.5)'; // Optional: click filter effect

            setTimeout(() => {
                card.classList.remove('is-clicking');
                // If mouse is still over, revert to hover state, else default state
                if (card.matches(':hover')) {
                    // Trigger mouseenter logic again or a specific post-click hover state
                    // For simplicity, just restore to default, mouseenter will re-apply if needed
                    card.dispatchEvent(new MouseEvent('mouseenter')); // Re-trigger hover if still over
                } else {
                    restoreCardDefaultState(card, index);
                }
                // card.style.filter = 'none'; // Reset filter if it was changed on click
            }, 200); // Duration of click effect
            
            const techName = card.getAttribute('title') || card.getAttribute('data-tech');
            if (techName) {
                showTechInfo(techName, e.pageX, e.pageY);
            }
        });
    });

    // Remove or comment out the old magnetic effect and other conflicting loops
    // The old forEach loops for magnetic effect and the second click listener are now removed/consolidated.

    // Add tech card performance metrics animation (createTechCardParticles function definition)
    // This function is defined but not called if particle effects are removed.
    function createTechCardParticles(card) {
        const particles = [];
        const techType = card.getAttribute('data-tech');
        const colors = {
            'python': ['#306998', '#ffd43b'],
            'django': ['#092E20', '#0C4B33'],
            'javascript': ['#f7df1e', '#323330'],
            'html5': ['#E34F26', '#F06529'],
            'css3': ['#1572B6', '#33A9DC'],
            'postgresql': ['#336791', '#4479A1'],
            'mysql': ['#4479A1', '#FF9B00'],
            'redis': ['#d82c20', '#a41f16'],
            'celery': ['#ff9933', '#ffa500'],
            'nginx': ['#009639', '#ffffff'],
            'apache': ['#d22128', '#fbc400'],
            'docker': ['#2496ed', '#0db7ed'],
            'linux': ['#fcc624', '#333333'],
            'github': ['#181717', '#FFFFFF'],
            'aws': ['#ff9900', '#232f3e'],
            'api': ['#ff6b35', '#e85a2b'],
            'openai': ['#4AA08C', '#191919'],
            'pygame': ['#6B9C39', '#A9D18E']
        };
        
        const techColors = colors[techType] || ['#3fa2f6', '#ffffff'];
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = techColors[Math.floor(Math.random() * techColors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '5';
            
            const angle = (i / 6) * Math.PI * 2;
            const radius = 40 + Math.random() * 20;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.transform = `translate(-50%, -50%)`;
            
            card.appendChild(particle);
            particles.push(particle);
            
            // Animate particle
            particle.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`, opacity: 1, offset: 0.3 },
                { transform: `translate(calc(-50% + ${x * 1.5}px), calc(-50% + ${y * 1.5}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            }).onfinish = () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
        }
    }

    // Enhanced click interaction
    // floatingCards.forEach((card, index) => { // THIS ENTIRE LOOP IS NOW REMOVED / CONSOLIDATED
    // card.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     
    //     // Create particles - REMOVED
    //     // createTechCardParticles(card); 
    //     
    //     // Add impact effect
    //     card.style.transform = 'scale(0.95)';
    // 
    //     setTimeout(() => {
    //         card.style.transform = '';
    //         card.style.filter = '';
    //     }, 200);
    //     
    //     // Show tech info (you can customize this)
    //     const techName = card.getAttribute('title') || card.getAttribute('data-tech');
    //     if (techName) {
    //         showTechInfo(techName, e.pageX, e.pageY);
    //     }
    // });
    // });
    
    function showTechInfo(techName, x, y) {
        const tooltip = document.createElement('div');
        tooltip.textContent = `${techName} - Click to learn more!`;
        tooltip.style.position = 'fixed';
        tooltip.style.left = x + 'px';
        tooltip.style.top = (y - 50) + 'px';
        tooltip.style.background = 'rgba(0, 0, 0, 0.9)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '8px 12px';
        tooltip.style.borderRadius = '8px';
        tooltip.style.fontSize = '0.9rem';
        tooltip.style.fontWeight = '500';
        tooltip.style.zIndex = '9999';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.animation = 'fadeInUp 0.3s ease';
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.style.animation = 'fadeOutUp 0.3s ease forwards';
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 300);
        }, 2000);
    }

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });

        // Hide scroll indicator when scrolling down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
            }
        });
    }

    // Add dynamic background particles
    createBackgroundParticles();

    function createBackgroundParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'background-particles';

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle-item';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`;
            particle.style.animationDuration = `${10 + Math.random() * 15}s`;
            particlesContainer.appendChild(particle);
        }

        document.body.insertBefore(particlesContainer, document.body.firstChild);
    }

    // Hero content reveal animation
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent && heroVisual) {
        // Add initial hidden state
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(30px)';
        
        // Reveal with delay
        setTimeout(() => {
            heroContent.style.transition = 'all 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
        
        setTimeout(() => {
            heroVisual.style.transition = 'all 0.8s ease';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateX(0)';
        }, 400);
    }

    // Play background music on user interaction
    const backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {
        const playMusic = () => {
            backgroundMusic.play().catch(error => console.log("Audio play failed:", error));
            document.removeEventListener('click', playMusic);
            document.removeEventListener('scroll', playMusic);
            document.removeEventListener('keypress', playMusic);
        };
        
        document.addEventListener('click', playMusic, { once: true });
        document.addEventListener('scroll', playMusic, { once: true });
        document.addEventListener('keypress', playMusic, { once: true });
    }

});
