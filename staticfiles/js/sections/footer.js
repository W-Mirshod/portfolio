// Footer Section JavaScript
// Handles footer interactions, social links, and phone number functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Phone number click handling (ensure tel: links work properly)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default behavior for tel: links
            // This will open the phone dialer on mobile devices
            console.log('Phone link clicked:', this.getAttribute('href'));
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Social media links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1)';
            link.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            
            // Add glow effect based on platform
            const platform = link.getAttribute('data-platform');
            switch(platform) {
                case 'linkedin':
                    link.style.boxShadow = '0 10px 20px rgba(0, 119, 181, 0.4)';
                    break;
                case 'github':
                    link.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.4)';
                    break;
                case 'twitter':
                    link.style.boxShadow = '0 10px 20px rgba(29, 161, 242, 0.4)';
                    break;
                case 'instagram':
                    link.style.boxShadow = '0 10px 20px rgba(228, 64, 95, 0.4)';
                    break;
                default:
                    link.style.boxShadow = '0 10px 20px rgba(63, 162, 246, 0.4)';
            }
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
            link.style.boxShadow = '0 5px 10px rgba(0, 0, 0, 0.1)';
        });

        // Click animation for social links
        link.addEventListener('click', () => {
            link.style.transform = 'scale(0.9)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // Footer navigation links
    const footerNavLinks = document.querySelectorAll('.footer-nav a');
    footerNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Handle internal anchor links
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const header = document.getElementById('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });

        // Hover effects for footer nav links
        link.addEventListener('mouseenter', () => {
            link.style.color = 'var(--primary-color)';
            link.style.transform = 'translateX(5px)';
        });

        link.addEventListener('mouseleave', () => {
            link.style.color = '';
            link.style.transform = 'translateX(0)';
        });
    });

    // Back to top button functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Smooth scroll to top
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        backToTopBtn.addEventListener('mouseenter', () => {
            backToTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
        });

        backToTopBtn.addEventListener('mouseleave', () => {
            backToTopBtn.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Footer reveal animation
    const footer = document.querySelector('footer');
    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('footer-visible');
                    footerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        footerObserver.observe(footer);
    }

    // Footer elements stagger animation
    const footerElements = document.querySelectorAll('.footer-section');
    footerElements.forEach((element, index) => {
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                    elementObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        elementObserver.observe(element);
    });

    // Copyright year update
    const copyrightYear = document.querySelector('.copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Email link click tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Email link clicked:', link.getAttribute('href'));
            
            // Add click animation
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Newsletter subscription (if exists)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showFooterMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Update button state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            try {
                // Simulate newsletter subscription
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                showFooterMessage('Thank you for subscribing!', 'success');
                newsletterForm.reset();
                
            } catch (error) {
                showFooterMessage('Subscription failed. Please try again.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    function showFooterMessage(message, type) {
        // Create or update footer message
        let messageEl = document.querySelector('.footer-message');
        
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'footer-message';
            const footer = document.querySelector('footer');
            footer.insertBefore(messageEl, footer.firstChild);
        }
        
        messageEl.textContent = message;
        messageEl.className = `footer-message ${type}`;
        messageEl.style.display = 'block';
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }

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
