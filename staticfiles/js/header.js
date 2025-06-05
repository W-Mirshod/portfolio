// Header functionality - Language switcher and mobile menu
document.addEventListener('DOMContentLoaded', function() {

    // Language Switcher Functionality
    const languageDropdown = document.querySelector('#header .language-dropdown');
    const languageBtn = document.querySelector('#header .language-btn');
    const languageOptions = document.querySelector('#header .language-options');
    const dropdownArrow = document.querySelector('#header .dropdown-arrow');

    if (languageBtn && languageOptions) {
        // Toggle language dropdown
        languageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = languageOptions.classList.contains('show');
            
            if (isOpen) {
                languageOptions.classList.remove('show');
                languageDropdown.classList.remove('active');
            } else {
                languageOptions.classList.add('show');
                languageDropdown.classList.add('active');
            }
        });

        // Handle language option clicks
        const languageOptionBtns = document.querySelectorAll('#header .language-option');
        languageOptionBtns.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close dropdown
                languageOptions.classList.remove('show');
                languageDropdown.classList.remove('active');
                
                // Submit the form
                const form = this.closest('form');
                if (form) {
                    form.submit();
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageDropdown.contains(e.target)) {
                languageOptions.classList.remove('show');
                languageDropdown.classList.remove('active');
            }
        });

        // Close dropdown on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && languageOptions.classList.contains('show')) {
                languageOptions.classList.remove('show');
                languageDropdown.classList.remove('active');
                languageBtn.focus();
            }
        });
    }

    // Mobile Menu Functionality
    const menuToggle = document.querySelector('#header .menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const body = document.body;

    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMobile.classList.contains('active');
            
            if (isActive) {
                // Close mobile menu
                navMobile.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            } else {
                // Open mobile menu
                navMobile.classList.add('active');
                menuToggle.classList.add('active');
                body.style.overflow = 'hidden';
            }
        });

        // Close mobile menu when clicking on nav items
        const mobileNavItems = document.querySelectorAll('.nav-mobile .nav-item');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function() {
                navMobile.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close mobile menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMobile.classList.contains('active')) {
                navMobile.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
                menuToggle.focus();
            }
        });

        // Close mobile menu when clicking outside
        navMobile.addEventListener('click', function(e) {
            if (e.target === navMobile) {
                navMobile.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Mobile Language Switcher (if exists in mobile menu)
    const mobileLangDropdown = document.querySelector('.nav-mobile .language-dropdown');
    const mobileLangBtn = document.querySelector('.nav-mobile .language-btn');
    const mobileLangOptions = document.querySelector('.nav-mobile .language-options');

    if (mobileLangBtn && mobileLangOptions) {
        mobileLangBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = mobileLangOptions.classList.contains('show');
            
            if (isOpen) {
                mobileLangOptions.classList.remove('show');
                mobileLangDropdown.classList.remove('active');
            } else {
                mobileLangOptions.classList.add('show');
                mobileLangDropdown.classList.add('active');
            }
        });

        // Handle mobile language option clicks
        const mobileLangOptionBtns = document.querySelectorAll('.nav-mobile .language-option');
        mobileLangOptionBtns.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close dropdown
                mobileLangOptions.classList.remove('show');
                mobileLangDropdown.classList.remove('active');
                
                // Submit the form
                const form = this.closest('form');
                if (form) {
                    form.submit();
                }
            });
        });
    }

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = scrollY;
        });
    }

    // Active navigation highlighting
    const navItems = document.querySelectorAll('.nav-item[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveSection() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial call

});
