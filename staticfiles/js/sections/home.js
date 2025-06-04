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

    function updateParallax() {
        const scrolled = window.pageYOffset;
        floatingCards.forEach((card, index) => {
            const rate = scrolled * -0.05 * (index % 3 + 1) * 0.2;
            card.style.transform = `translateY(${rate}px)`;
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Enhanced hover effects for tech cards with staggered animations
    floatingCards.forEach((card, index) => {
        // Add staggered reveal animation
        card.style.animationDelay = `${0.9 + (index * 0.1)}s`;
        
        card.addEventListener('mouseenter', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'tech-card-ripple';
            card.appendChild(ripple);
            
            // Enhanced transform with technology-specific rotation
            const techType = card.getAttribute('data-tech');
            let rotation = index % 2 === 0 ? '8deg' : '-8deg';
            
            // Special rotations for specific technologies
            if (techType === 'react') rotation = '12deg';
            if (techType === 'python') rotation = '-12deg';
            if (techType === 'ai') rotation = '15deg';
            
            card.style.transform = `scale(1.2) translateY(-20px) rotate(${rotation})`;
            card.style.zIndex = '20';
            
            // Add glow effect based on technology
            card.style.filter = 'brightness(1.2) saturate(1.3)';
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple && ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });

        card.addEventListener('mouseleave', () => {
            // Smooth return with parallax consideration
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.05 * (index % 3 + 1) * 0.2;
            card.style.transform = `scale(1) translateY(${rate}px) rotate(0deg)`;
            card.style.zIndex = '1';
            card.style.filter = 'none';
            
            // Re-enable pulse animation
            card.style.animation = 'techCardPulse 4s ease-in-out infinite';
        });
        
        // Add click effect
        card.addEventListener('click', () => {
            card.style.transform = `scale(0.95) translateY(-5px) rotate(0deg)`;
            setTimeout(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.05 * (index % 3 + 1) * 0.2;
                card.style.transform = `scale(1) translateY(${rate}px) rotate(0deg)`;
            }, 150);
        });
    });

    // Add magnetic effect to tech cards
    floatingCards.forEach((card, index) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;
            
            if (distance < maxDistance) {
                const angle = Math.atan2(y, x);
                const force = (maxDistance - distance) / maxDistance;
                const offsetX = Math.cos(angle) * force * 8;
                const offsetY = Math.sin(angle) * force * 8;
                
                card.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${1 + force * 0.1})`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Add tech card performance metrics animation
    function createTechCardParticles(card) {
        const particles = [];
        const techType = card.getAttribute('data-tech');
        const colors = {
            'python': ['#3776ab', '#ffd43b'],
            'javascript': ['#f7df1e', '#000000'],
            'react': ['#61dafb', '#20232a'],
            'docker': ['#2496ed', '#ffffff'],
            'aws': ['#ff9900', '#232f3e'],
            'git': ['#f05032', '#ffffff'],
            'linux': ['#fcc624', '#000000'],
            'django': ['#092e20', '#43a047'],
            'node': ['#339933', '#68a063'],
            'database': ['#336791', '#ffffff'],
            'api': ['#ff6b35', '#ffffff'],
            'ai': ['#9c27b0', '#e91e63']
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
    floatingCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create particles
            createTechCardParticles(card);
            
            // Add impact effect
            card.style.transform = 'scale(0.95)';
            card.style.filter = 'brightness(1.5) saturate(1.5)';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.filter = '';
            }, 200);
            
            // Show tech info (you can customize this)
            const techName = card.getAttribute('title') || card.getAttribute('data-tech');
            if (techName) {
                showTechInfo(techName, e.pageX, e.pageY);
            }
        });
    });
    
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
