/* Prevent multiple reCAPTCHA loading */
window.recaptchaLoadAttempts = window.recaptchaLoadAttempts || 0;

/* Global reCAPTCHA callback */
window.onRecaptchaLoad = function() {
    console.log('reCAPTCHA API loaded');
};

/* Improved error handling */
window.addEventListener('error', function(e) {
    if (e.message.includes('reCAPTCHA')) {
        console.warn('reCAPTCHA error handled:', e.message);
        return true; /* Prevent error from propagating */
    }
});

/* Debounce function to prevent multiple rapid calls */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* Initialize everything when DOM is ready */
document.addEventListener('DOMContentLoaded', function() {
    /* Prevent multiple initialization */
    if (window.portfolioInitialized) {
        return;
    }
    window.portfolioInitialized = true;

    /* Initialize all sections */
    initializeAnimations();
    initializeScrollEffects();
    
    /* Delayed reCAPTCHA initialization to prevent conflicts */
    setTimeout(() => {
        if (window.grecaptcha && window.recaptchaLoadAttempts < 1) {
            window.recaptchaLoadAttempts++;
            /* reCAPTCHA will be loaded by contact.js when needed */
        }
    }, 1000);
});

function initializeAnimations() {
    /* Add your animation initialization code here */
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
}

function initializeScrollEffects() {
    /* Add scroll-based effects */
    const debouncedScroll = debounce(function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 10);

    window.addEventListener('scroll', debouncedScroll, { passive: true });
}