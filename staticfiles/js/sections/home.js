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

    // Enhanced hover effects for tech cards
    floatingCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = `scale(1.15) translateY(-15px) rotate(${index % 2 === 0 ? '5deg' : '-5deg'})`;
            card.style.boxShadow = '0 25px 50px rgba(63, 162, 246, 0.4)';
            card.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', () => {
            // Re-apply parallax effect on mouseleave
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.05 * (index % 3 + 1) * 0.2;
            card.style.transform = `scale(1) translateY(${rate}px) rotate(0deg)`;
            card.style.boxShadow = '0 8px 15px rgba(63, 162, 246, 0.1)';
            card.style.zIndex = '1';
        });
    });

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
