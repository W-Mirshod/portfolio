// Enhanced JavaScript for V2 Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.nav-mobile');
    const body = document.body;

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking nav items
        const mobileNavItems = document.querySelectorAll('.nav-mobile .nav-item');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                mobileToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing animation for hero text
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
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

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger animation for cards
                if (entry.target.classList.contains('skill-category') || 
                    entry.target.classList.contains('project-card')) {
                    const siblings = Array.from(entry.target.parentNode.children);
                    const index = siblings.indexOf(entry.target);
                    const delay = index * 150;
                    entry.target.style.animationDelay = `${delay}ms`;
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat-item, .stat-card, .org-card, .badge, .experience-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('.section[id]');
    const navItems = document.querySelectorAll('.nav-item[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Parallax effect for floating cards
    const floatingCards = document.querySelectorAll('.tech-card');
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        floatingCards.forEach((card, index) => {
            const rate = scrolled * -0.05 * (index % 3 + 1) * 0.2; // Adjusted parallax rate
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

    // Stats counter animation
    const statsItems = document.querySelectorAll('.stat-item h3, .stat-card .stat-info h3');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValueText = target.textContent.replace('+', '').trim();
                const finalValue = parseInt(finalValueText);
                if (!isNaN(finalValue)) {
                    animateCounter(target, finalValue);
                    statsObserver.unobserve(target);
                }
            }
        });
    }, { threshold: 0.5 });

    statsItems.forEach(item => {
        statsObserver.observe(item);
    });

    function animateCounter(element, target) {
        let current = 0;
        const duration = 1500; // Animation duration in ms
        const stepTime = Math.abs(Math.floor(duration / target));
        const increment = Math.max(1, Math.floor(target / (duration / 16))); // Adjust increment for smoother animation

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }, 16); // Roughly 60 FPS
    }

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
            card.style.boxShadow = '0 8px 15px rgba(63, 162, 246, 0.1)'; // Keep a subtle shadow
            card.style.zIndex = '1';
        });
    });

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Smooth reveal animations for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                sectionObserver.unobserve(entry.target); // Observe only once
            }
        });
    }, { threshold: 0.15 }); // Trigger a bit earlier

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add dynamic background particles
    createBackgroundParticles();

    function createBackgroundParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'background-particles';
        // Styles are applied via CSS for better organization

        for (let i = 0; i < 30; i++) { // Reduced particle count for subtlety
            const particle = document.createElement('div');
            particle.className = 'particle-item'; // Use class for styling
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 10}s`; // Increased delay variation
            particle.style.animationDuration = `${10 + Math.random() * 15}s`; // Varied duration
            particlesContainer.appendChild(particle);
        }

        document.body.insertBefore(particlesContainer, document.body.firstChild); // Insert before other content
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');
    let recaptchaToken = null;

    // Initialize reCAPTCHA v2
    window.onRecaptchaCallback = function(token) {
        recaptchaToken = token;
    };

    window.onRecaptchaExpired = function() {
        recaptchaToken = null;
    };

    // Initialize reCAPTCHA
    if (typeof grecaptcha !== 'undefined' && grecaptcha.ready) {
        grecaptcha.ready(function() {
            if (document.getElementById('recaptcha-container')) {
                grecaptcha.render('recaptcha-container', {
                    'sitekey': '6Ld5slAqAAAAAOQ7IN70HQVoUKL7x6uGKrN5i7aZ',
                    'callback': 'onRecaptchaCallback',
                    'expired-callback': 'onRecaptchaExpired'
                });
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Validate reCAPTCHA
            if (!recaptchaToken) {
                showMessage('Please complete the reCAPTCHA verification.', 'error');
                return;
            }
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                'g-recaptcha-response': recaptchaToken
            };
            
            try {
                const response = await fetch('/contact/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                    },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showMessage(result.message, 'success');
                    contactForm.reset();
                    if (typeof grecaptcha !== 'undefined' && grecaptcha.reset) {
                        grecaptcha.reset();
                    }
                    recaptchaToken = null;
                } else {
                    showMessage(result.message || 'An error occurred. Please try again.', 'error');
                }
            } catch (error) {
                showMessage('Network error. Please try again.', 'error');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }

    function showMessage(message, type) {
        if (!formMessages) return;
        formMessages.textContent = message;
        formMessages.className = `form-messages ${type}`;
        formMessages.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessages.style.display = 'none';
        }, 5000);
    }

    // Phone number click handling (ensure tel: links work properly)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default behavior for tel: links
            // This will open the phone dialer on mobile devices
            console.log('Phone link clicked:', this.getAttribute('href'));
        });
    });

    // Play background music on user interaction
    const backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {
        const playMusic = () => {
            backgroundMusic.play().catch(error => console.log("Audio play failed:", error));
            // Remove event listeners after first interaction to prevent multiple plays
            document.removeEventListener('click', playMusic);
            document.removeEventListener('scroll', playMusic);
            document.removeEventListener('keypress', playMusic);
        };
        // Listen for various user interactions
        document.addEventListener('click', playMusic, { once: true });
        document.addEventListener('scroll', playMusic, { once: true });
        document.addEventListener('keypress', playMusic, { once: true });
    }

});

// Remove the entire enhancedStyles block from here
