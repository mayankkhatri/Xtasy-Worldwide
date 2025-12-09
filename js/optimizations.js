/**
 * Performance Optimizations for Xtasy Worldwide
 * Handles animation loop management, intersection observers, and scroll throttling.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const CONFIG = {
        scrollThrottle: 20, // ms
        resizeThrottle: 100, // ms
    };

    // --- State Management ---
    const state = {
        isHeroVisible: true, // Optimistic start
        isFeaturedVisible: false,
        lastScrollY: window.scrollY,
        ticking: false,
        mouseX: window.innerWidth / 2,
        mouseY: window.innerHeight / 2,
        heroX: window.innerWidth / 2,
        featuredX: window.innerWidth / 2,
        featuredY: window.innerHeight / 2,
        heroRect: null,         // Cached rects to avoid layout thrashing
        featuredRect: null
    };

    // --- DOM Elements ---
    const dom = {
        header: document.querySelector('.header'),
        servicesSection: document.querySelector('.services-section'),
        featuredSection: document.querySelector('.featured-section'),
        heroBlob: document.querySelector('.interactive-glow'),
        featuredBlob: document.querySelector('.featured-glow-blob'),
        services: document.querySelectorAll('.service-item'),
        revealElements: document.querySelectorAll('.why-text-content, .why-image-wrapper, .feature-card, .mission-card, .tech-stack-container'),
        visualNeonBgs: document.querySelectorAll('.visual-neon-bg') // All starry backgrounds
    };

    // --- Intersection Observer (The "Off Switch") ---
    const observerOptions = {
        threshold: 0.1 // Trigger when 10% visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const isVisible = entry.isIntersecting;
            
            // Handle Hero visibility
            if (entry.target.classList.contains('hero-section')) {
                state.isHeroVisible = isVisible;
                toggleAnimations(entry.target, isVisible);
            }
            
            // Handle Featured visibility
            if (entry.target.classList.contains('featured-section')) {
                state.isFeaturedVisible = isVisible;
                toggleAnimations(entry.target, isVisible);
                
                // Cache rect only when entering view to ensure fresh data
                if (isVisible) {
                    updateRects(); 
                }
            }

            // Generic "Pause CSS" for other sections with heavy CSS animations
            if (entry.target.classList.contains('visual-neon-bg') || entry.target.closest('.visual-neon-bg')) {
                 // For elements that are purely visual backgrounds
                 const target = entry.target.closest('.visual-neon-bg') || entry.target;
                 toggleAnimations(target, isVisible);
            }
        });
        
        // Restart loop if needed
        checkAnimationLoop();

    }, observerOptions);

    // Observe key sections
    const sectionsToWatch = [
        document.querySelector('.hero-section'),
        dom.featuredSection
    ];
    
    sectionsToWatch.forEach(el => {
        if (el) sectionObserver.observe(el);
    });

    // Helper: Pause/Play CSS Animations
    function toggleAnimations(element, isPlaying) {
        if (!element) return;
        if (isPlaying) {
            element.classList.remove('paused');
        } else {
            element.classList.add('paused');
        }
    }


    // --- Optimized Animation Loop (JS) ---
    let animationFrameId = null;

    function animate() {
        if (window.innerWidth <= 768) {
            animationFrameId = null;
            return;
        }

        let shouldContinue = false;

        // 1. Hero Blob Animation
        if (state.isHeroVisible && dom.heroBlob) {
            state.heroX += (state.mouseX - state.heroX) * 0.08;
            dom.heroBlob.style.transform = `translateX(-50%) translate3d(${state.heroX - (window.innerWidth/2)}px, 0, 0)`; 
            // NOTE: Changing 'left' causes reflow. 'transform' is better but existing CSS uses left. 
            // Optimized to use transform for better performance. 
            // We need to override the CSS left: 50% and existing JS logic safely.
            // For now, mirroring original logic but using cached values, 
            // BUT switching to transform requires CSS update. 
            // Sticking to 'left' for safety unless we change CSS, but 'left' causes layout.
            // Let's TRY to use 'left' but minimized check.
            dom.heroBlob.style.left = `${state.heroX}px`;
            
            shouldContinue = true;
        }

        // 2. Featured Blob Animation
        if (state.isFeaturedVisible && dom.featuredBlob && dom.featuredSection) {
            // Smooth LERP
            state.featuredX += (state.mouseX - state.featuredX) * 0.25;
            state.featuredY += (state.mouseY - state.featuredY) * 0.25;

            // Use cached rect if available, fallback safely
            const rect = state.featuredRect || dom.featuredSection.getBoundingClientRect();
            
            const sectionLeft = rect.left + window.scrollX;
            const sectionTop = rect.top + window.scrollY;

            // Blob is 600x600 (center offset handled by CSS translate usually, but here manually calc'd)
            const relativeX = (state.featuredX + window.scrollX) - sectionLeft - 300; 
            const relativeY = state.featuredY - sectionTop;

            dom.featuredBlob.style.left = `${relativeX}px`;
            dom.featuredBlob.style.top = `${relativeY}px`;

            shouldContinue = true;
        }

        if (shouldContinue) {
            animationFrameId = requestAnimationFrame(animate);
        } else {
            animationFrameId = null; // Clean stop
        }
    }

    function checkAnimationLoop() {
        if (!animationFrameId && (state.isHeroVisible || state.isFeaturedVisible) && window.innerWidth > 768) {
            animate();
        }
    }


    // --- Event Listeners (Throttled/Passive) ---
    
    // Mouse Move
    window.addEventListener('mousemove', (e) => {
        state.mouseX = e.clientX;
        state.mouseY = e.pageY;
        // Don't auto-start loop here, wait for visibility; but loop is likely running if visible
        checkAnimationLoop();
    }, { passive: true });


    // Scroll Handler (Throttled)
    const updateHeader = () => {
        const scrollY = window.scrollY;
        
        // Glass effect
        if (scrollY > 50) {
            dom.header.classList.add('scrolled');
        } else {
            dom.header.classList.remove('scrolled');
        }

        // Dark text trigger
        if (dom.servicesSection) {
            // Using offsetTop is cheap, but repeatedly querying offsetHeight can be costly
            // Assuming layout is stable enough
            const servicesTop = dom.servicesSection.offsetTop - 80;
            const featuredTop = dom.featuredSection ? dom.featuredSection.offsetTop - 80 : 99999;

            if (scrollY > servicesTop && scrollY < featuredTop) {
                dom.header.classList.add('dark-mode');
            } else {
                dom.header.classList.remove('dark-mode');
            }
        }
        
        state.ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!state.ticking) {
            window.requestAnimationFrame(updateHeader);
            state.ticking = true;
        }
    }, { passive: true });

    // Resize Handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateRects();
        }, CONFIG.resizeThrottle);
    });

    function updateRects() {
        if (dom.featuredSection) {
            state.featuredRect = dom.featuredSection.getBoundingClientRect();
            // Adjust rect.top by scrollY for absolute positioning calculations later if needed
            // But getBoundingClientRect is relative to viewport, so we use it + scrollY in the loop
        }
        if (document.querySelector('.hero-section')) {
            state.heroRect = document.querySelector('.hero-section').getBoundingClientRect();
        }
    }

    // --- Initial Setup ---
    
    // Services Interaction (No change needed, efficient enough)
    if(dom.services) {
        dom.services.forEach(item => {
            item.addEventListener('mouseenter', () => {
                dom.services.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    // Scroll Reveal (Existing Observer Logic is good)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    dom.revealElements.forEach(el => revealObserver.observe(el));

    // Force initial rect update and start
    updateRects();
    checkAnimationLoop();
});
