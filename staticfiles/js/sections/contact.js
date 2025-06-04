// Contact Section JavaScript
// Handles contact form, reCAPTCHA, and professional network interactions

document.addEventListener('DOMContentLoaded', function() {
    
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

    // Professional network cards animations
    const networkCards = document.querySelectorAll('.network-card');
    const networkObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger animation
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                const delay = index * 150;
                entry.target.style.animationDelay = `${delay}ms`;
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe network cards
    networkCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        networkObserver.observe(card);

        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            
            // Animate network icon
            const icon = card.querySelector('.network-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            
            // Reset network icon
            const icon = card.querySelector('.network-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Contact information animations
    const contactInfo = document.querySelectorAll('.contact-info-item');
    contactInfo.forEach((item, index) => {
        const infoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                    infoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        infoObserver.observe(item);

        // Hover effects for contact info
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(10px) scale(1.02)';
            item.style.backgroundColor = 'rgba(63, 162, 246, 0.05)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
            item.style.backgroundColor = 'transparent';
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
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        sectionObserver.observe(contactSection);
    }

});
