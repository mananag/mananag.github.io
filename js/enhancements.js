/* Portfolio Enhancements */
(function() {
    'use strict';
    
    // Lazy Load Images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(function(img) {
                img.classList.add('loaded');
            });
        }
    }
    
    // Smooth scroll for anchor links
    function smoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target && target.offsetParent !== null) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    
    // Add animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.timeline-item, .certificate-item, .lm-info-block');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1
            });
            
            elements.forEach(function(el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }
    
    // Keyboard navigation improvements
    function improveKeyboardNav() {
        document.addEventListener('keydown', function(e) {
            // Skip to main content with Ctrl+/
            if (e.ctrlKey && e.key === '/') {
                e.preventDefault();
                const mainContent = document.querySelector('.content-area');
                if (mainContent) {
                    mainContent.focus();
                }
            }
        });
    }
    
    // Add focus visible class for better keyboard navigation
    function addFocusVisible() {
        let hadKeyboardEvent = false;
        
        document.addEventListener('keydown', function() {
            hadKeyboardEvent = true;
        });
        
        document.addEventListener('mousedown', function() {
            hadKeyboardEvent = false;
        });
        
        document.addEventListener('focusin', function(e) {
            if (hadKeyboardEvent) {
                e.target.classList.add('focus-visible');
            }
        });
        
        document.addEventListener('focusout', function(e) {
            e.target.classList.remove('focus-visible');
        });
    }
    
    // Performance: Reduce motion for users who prefer it
    function respectReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            const style = document.createElement('style');
            style.textContent = '* { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }';
            document.head.appendChild(style);
        }
    }
    
    // Initialize all enhancements
    function init() {
        lazyLoadImages();
        smoothScroll();
        animateOnScroll();
        improveKeyboardNav();
        addFocusVisible();
        respectReducedMotion();
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
