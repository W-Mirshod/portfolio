// Header JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Language switcher functionality
    const languageBtn = document.getElementById('languageBtn');
    const languageOptions = document.getElementById('languageOptions');
    const languageDropdown = document.querySelector('.language-dropdown');
    
    if (languageBtn && languageOptions) {
        // Toggle dropdown
        languageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = languageOptions.classList.contains('show');
            
            if (isOpen) {
                closeLanguageDropdown();
            } else {
                openLanguageDropdown();
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageDropdown.contains(e.target)) {
                closeLanguageDropdown();
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeLanguageDropdown();
            }
        });
        
        // Handle language option clicks
        const languageOptionButtons = document.querySelectorAll('.language-option');
        languageOptionButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Add loading state
                button.style.opacity = '0.7';
                button.style.transform = 'scale(0.95)';
                
                // Close dropdown after selection
                setTimeout(() => {
                    closeLanguageDropdown();
                }, 100);
            });
        });
        
        function openLanguageDropdown() {
            languageOptions.classList.add('show');
            languageDropdown.classList.add('active');
            languageBtn.setAttribute('aria-expanded', 'true');
            
            // Add subtle animation to options
            const options = languageOptions.querySelectorAll('.language-option');
            options.forEach((option, index) => {
                option.style.animation = `fadeInUp 0.3s ease ${index * 0.05}s both`;
            });
        }
        
        function closeLanguageDropdown() {
            languageOptions.classList.remove('show');
            languageDropdown.classList.remove('active');
            languageBtn.setAttribute('aria-expanded', 'false');
        }
        
        // Add ripple effect to language button
        languageBtn.addEventListener('mousedown', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    
    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', function() {
            const isOpen = navMobile.classList.contains('active');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Close mobile menu when clicking nav items
        const mobileNavItems = navMobile.querySelectorAll('.nav-item');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        function openMobileMenu() {
            navMobile.classList.add('active');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMobileMenu() {
            navMobile.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
    
    // Header scroll effect
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-item[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav item
                updateActiveNavItem(this);
            }
        });
    });
    
    // Update active navigation item based on scroll position
    function updateActiveNavItem(activeLink = null) {
        const navItems = document.querySelectorAll('.nav-item');
        
        if (activeLink) {
            navItems.forEach(item => item.classList.remove('active'));
            activeLink.classList.add('active');
        } else {
            // Auto-detect based on scroll position
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + header.offsetHeight + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navItems.forEach(item => item.classList.remove('active'));
                    const activeNavItem = document.querySelector(`.nav-item[href="#${sectionId}"]`);
                    if (activeNavItem) {
                        activeNavItem.classList.add('active');
                    }
                }
            });
        }
    }
    
    // Update active nav item on scroll
    window.addEventListener('scroll', updateActiveNavItem);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
