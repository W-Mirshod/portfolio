// Certificate Section JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Certificate card hover effects
    const certificateCard = document.querySelector('.certificate-card');
    if (certificateCard) {
        certificateCard.addEventListener('mouseenter', () => {
            certificateCard.style.transform = 'translateY(-10px)';
        });

        certificateCard.addEventListener('mouseleave', () => {
            certificateCard.style.transform = 'translateY(0)';
        });
    }

    // Skill items stagger animation
    const skillItems = document.querySelectorAll('.certificate-section .skill-item');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        skillObserver.observe(item);
    });

    // Certificate stats counter animation
    const certificateStats = document.querySelectorAll('.certificate-stats .stat-info h5');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                // Only animate if it contains numbers
                if (/\d/.test(text)) {
                    const number = parseInt(text.match(/\d+/)[0]);
                    if (!isNaN(number) && number > 1) {
                        animateNumber(target, number, text);
                    }
                }
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    certificateStats.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateNumber(element, target, originalText) {
        let current = 0;
        const duration = 1000;
        const increment = Math.ceil(target / (duration / 16));
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Replace the number in the original text
            const newText = originalText.replace(/\d+/, current);
            element.textContent = newText;
        }, 16);
    }

    // Certificate image modal functionality (optional enhancement)
    const certificateImage = document.querySelector('.certificate-image img');
    if (certificateImage) {
        certificateImage.addEventListener('click', () => {
            const modal = createImageModal(certificateImage.src);
            document.body.appendChild(modal);
        });
    }

    function createImageModal(imageSrc) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            cursor: pointer;
        `;

        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 10px;
        `;

        modal.appendChild(img);

        // Close modal on click
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        return modal;
    }

    // Enhanced button interactions
    const certificateButtons = document.querySelectorAll('.certificate-actions a');
    certificateButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.02)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });

        // Add click effect
        button.addEventListener('click', (e) => {
            button.style.transform = 'translateY(0) scale(0.98)';
            setTimeout(() => {
                button.style.transform = 'translateY(-2px) scale(1.02)';
            }, 150);
        });
    });

    // Verification link tracking (optional analytics)
    const verifyButton = document.querySelector('.verify-btn');
    if (verifyButton) {
        verifyButton.addEventListener('click', () => {
            console.log('Certificate verification link clicked');
            // Add analytics tracking here if needed
        });
    }

    // Scroll-triggered certificate card animation
    const certificateSection = document.querySelector('.certificate-section');
    if (certificateSection) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    
                    // Trigger stagger animations for child elements
                    const elements = entry.target.querySelectorAll('.certificate-header, .certificate-main, .certificate-footer');
                    elements.forEach((el, index) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.2 });

        // Initialize elements for animation
        const elements = certificateSection.querySelectorAll('.certificate-header, .certificate-main, .certificate-footer');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        sectionObserver.observe(certificateSection);
    }
});
