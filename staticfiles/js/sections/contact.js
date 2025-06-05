// Contact Section JavaScript
// Handles contact form, reCAPTCHA, and professional network interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formMessages = document.getElementById('form-messages');
    let recaptchaToken = null;

<<<<<<< HEAD
    // reCAPTCHA handling with duplication prevention
    let recaptchaLoaded = false;
    let recaptchaWidgetId = null;

    function loadRecaptcha() {
        if (recaptchaLoaded || !window.grecaptcha) {
            return;
        }

        const recaptchaContainer = document.getElementById('recaptcha-container');
        if (!recaptchaContainer) {
            console.warn('reCAPTCHA container not found');
            return;
        }

        // Check if reCAPTCHA is already rendered
        if (recaptchaContainer.hasChildNodes()) {
            console.log('reCAPTCHA already rendered');
            return;
        }

        try {
            window.grecaptcha.ready(function() {
                if (!recaptchaLoaded) {
                    recaptchaWidgetId = window.grecaptcha.render('recaptcha-container', {
                        'sitekey': '***REMOVED***',
                        'callback': 'onRecaptchaCallback',
                        'expired-callback': 'onRecaptchaExpired'
                    });
                    recaptchaLoaded = true;
                }
            });
        } catch (error) {
            console.error('reCAPTCHA rendering error:', error);
        }
    }

    // Load reCAPTCHA when contact section is visible
    const contactSectionRecaptcha = document.getElementById('contact');
    if (contactSectionRecaptcha) {
        const contactObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !recaptchaLoaded) {
                    loadRecaptcha();
                }
            });
        }, { threshold: 0.1 });

        contactObserver.observe(contactSectionRecaptcha);
    }

    // Reset reCAPTCHA function
    window.resetRecaptcha = function() {
        if (recaptchaWidgetId !== null && window.grecaptcha) {
            try {
                window.grecaptcha.reset(recaptchaWidgetId);
            } catch (error) {
                console.error('reCAPTCHA reset error:', error);
            }
        }
    };

    // Initialize reCAPTCHA
=======
    // Initialize reCAPTCHA v2
>>>>>>> parent of 1482f2b (Enhance UI/UX across multiple sections)
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
                    'sitekey': '***REMOVED***',
                    'callback': 'onRecaptchaCallback',
                    'expired-callback': 'onRecaptchaExpired'
                });
            }
        });
    }

    // Contact form submission
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

    // Form field animations and validation
    const formFields = document.querySelectorAll('.form-field input, .form-field textarea');
    formFields.forEach(field => {
        const label = field.parentNode.querySelector('.form-label');
        
        // Field focus effects
        field.addEventListener('focus', () => {
            field.parentNode.classList.add('focused');
            if (label) {
                label.style.transform = 'translateY(-20px) scale(0.85)';
                label.style.color = 'var(--primary-color)';
            }
        });

        field.addEventListener('blur', () => {
            if (!field.value) {
                field.parentNode.classList.remove('focused');
                if (label) {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = 'var(--text-light)';
                }
            }
        });

        // Real-time validation
        field.addEventListener('input', () => {
            validateField(field);
        });

        // Initialize field state
        if (field.value) {
            field.parentNode.classList.add('focused');
            if (label) {
                label.style.transform = 'translateY(-20px) scale(0.85)';
            }
        }
    });

    function validateField(field) {
        const fieldContainer = field.parentNode;
        const errorMessage = fieldContainer.querySelector('.field-error');
        
        let isValid = true;
        let message = '';

        // Remove existing error
        if (errorMessage) {
            errorMessage.remove();
        }

        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }

        // Required field validation
        if (field.required && !field.value.trim()) {
            isValid = false;
            message = 'This field is required';
        }

        // Message length validation
        if (field.name === 'message' && field.value.length > 0 && field.value.length < 10) {
            isValid = false;
            message = 'Message must be at least 10 characters long';
        }

        // Update field appearance
        if (isValid) {
            fieldContainer.classList.remove('error');
            fieldContainer.classList.add('valid');
        } else {
            fieldContainer.classList.remove('valid');
            fieldContainer.classList.add('error');
            
            // Show error message
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            fieldContainer.appendChild(errorElement);
        }

        return isValid;
    }

    // Enhanced professional network cards animations
    const networkCards = document.querySelectorAll('.network-card');
    const networkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                const delay = index * 150;
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('animate-elastic');
                }, delay);
                
                networkObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    });

    // Enhanced network cards styling and observation
    networkCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.9)';
        card.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        networkObserver.observe(card);

        // Enhanced hover effects with 3D transforms
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.08) rotateX(5deg) rotateY(5deg)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2), 0 0 40px rgba(63, 162, 246, 0.15)';
            card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // Enhanced network icon animation
            const icon = card.querySelector('.network-icon');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(15deg)';
                icon.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
            card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            
            // Reset network icon
            const icon = card.querySelector('.network-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
            }
        });
    });

    // Enhanced contact information animations with cascade effect
    const contactInfo = document.querySelectorAll('.contact-info-item');
    contactInfo.forEach((item, index) => {
        const infoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0) scale(1)';
                        entry.target.classList.add('animate-cascade');
                    }, index * 120);
                    infoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        item.style.opacity = '0';
        item.style.transform = 'translateX(-40px) scale(0.9)';
        item.style.transition = 'all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        infoObserver.observe(item);

        // Enhanced hover effects for contact info
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(15px) scale(1.05) rotateY(3deg)';
            item.style.backgroundColor = 'rgba(63, 162, 246, 0.08)';
            item.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1) rotateY(0deg)';
            item.style.backgroundColor = 'transparent';
            item.style.transition = 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });

    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const textToCopy = btn.getAttribute('data-copy') || btn.parentNode.textContent.trim();
            
            try {
                await navigator.clipboard.writeText(textToCopy);
                
                // Show feedback
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i>';
                btn.style.color = '#4CAF50';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.color = '';
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });

    // Contact section reveal animation
    const contactSectionReveal = document.getElementById('contact');
    if (contactSectionReveal) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        sectionObserver.observe(contactSectionReveal);
    }

});
