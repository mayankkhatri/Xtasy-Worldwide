document.addEventListener('DOMContentLoaded', () => {
    // --- Country Code Selector Logic ---
    const countrySelect = document.querySelector('.custom-select');
    const selectedFlag = document.getElementById('selected-flag');
    const selectedCode = document.getElementById('selected-code');
    const optionsContainer = document.querySelector('.select-options');
    const hiddenInput = document.getElementById('country-code-input');
    
    // Country Data (Extended list can be added here)
    const countries = [
        { code: '+1', flag: '🇺🇸', name: 'USA' },
        { code: '+44', flag: '🇬🇧', name: 'UK' },
        { code: '+91', flag: '🇮🇳', name: 'India' },
        { code: '+61', flag: '🇦🇺', name: 'Australia' },
        { code: '+81', flag: '🇯🇵', name: 'Japan' },
        { code: '+49', flag: '🇩🇪', name: 'Germany' },
        { code: '+33', flag: '🇫🇷', name: 'France' },
        { code: '+971', flag: '🇦🇪', name: 'UAE' },
    ];

    // Populate Options
    if (optionsContainer) {
        countries.forEach(country => {
            const option = document.createElement('div');
            option.className = 'select-option';
            option.innerHTML = `<span class="flag">${country.flag}</span> <span class="code">${country.code}</span> <span class="name">${country.name}</span>`;
            option.addEventListener('click', () => {
                selectCountry(country);
            });
            optionsContainer.appendChild(option);
        });

        // Toggle Dropdown
        countrySelect.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing immediately
            countrySelect.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!countrySelect.contains(e.target)) {
                countrySelect.classList.remove('active');
            }
        });
    }

    function selectCountry(country) {
        selectedFlag.textContent = country.flag;
        selectedCode.textContent = country.code;
        hiddenInput.value = country.code;
        // visual update
        const allOptions = document.querySelectorAll('.select-option');
        allOptions.forEach(opt => opt.classList.remove('selected'));
        // (Optional: add 'selected' class to the clicked option)
    }

    // --- Form Decoration (Floating Labels) ---
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        // Init Check
        if (input.value) {
            input.parentElement.classList.add('focused');
        }

        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // --- Form Submission (Prevent Default for Demo) ---
    // const contactForm = document.getElementById('contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', (e) => {
    //         e.preventDefault();
    //         // Simulate sending
    //         const btn = contactForm.querySelector('.submit-btn');
    //         const originalText = btn.innerHTML;
            
    //         btn.innerHTML = 'Sending...';
    //         btn.style.opacity = '0.7';
            
    //         setTimeout(() => {
    //             btn.innerHTML = 'Message Sent!';
    //             btn.style.background = 'rgba(46, 204, 113, 0.2)';
    //             btn.style.borderColor = '#2ecc71';
    //             contactForm.reset();
    //             inputs.forEach(i => i.parentElement.classList.remove('focused'));
                
    //             setTimeout(() => {
    //                btn.innerHTML = originalText;
    //                btn.style.background = ''; // reset
    //                btn.style.borderColor = '';
    //                btn.style.opacity = '1';
    //             }, 3000);
    //         }, 1500);
    //     });
    // }

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // --- Animated Underline Observer ---
    const underlinePath = document.querySelector('.hand-underline');
    if (underlinePath) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    underlinePath.classList.add('draw-active');
                    observer.unobserve(entry.target); // Run once
                }
            });
        }, { threshold: 1.0 }); // Wait until fully visible

        observer.observe(underlinePath);
    }

    // --- "Why Choose Us" Text Replacement Animation ---
    const whyTitleAnim = document.querySelector('.why-title');
    if (whyTitleAnim) {
        const whyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add class to container to start CSS animations
                    const animContainer = entry.target.querySelector('.anim-container');
                    if (animContainer) {
                        animContainer.classList.add('anim-active');
                    }
                    whyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 }); // Trigger when 80% visible
        whyObserver.observe(whyTitleAnim);
    }
});



    window.onload = function() {
        // Reset the form fields when the page loads
        document.getElementById("form")?.reset();
    };

    // --- Hero Video Progressive Loading ---
    window.addEventListener('load', () => {
        const heroWrapper = document.getElementById('hero-featured-wrapper');
        const heroThumb = document.getElementById('hero-thumb');

        if (heroWrapper) {
            // Delay slightly to confirm "stable" load
            setTimeout(() => {
                const video = document.createElement('video');
                video.src = 'assets/hero-featured/Chamcourt Demo.mp4';
                video.className = 'project-video';
                video.autoplay = true;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.setAttribute('disablePictureInPicture', '');
                video.controls = false; 

                // Wait for enough data to play smoothly
                video.addEventListener('canplaythrough', () => {
                     // Ensure explicit play attempt
                     const playPromise = video.play();
                     
                     if (playPromise !== undefined) {
                         playPromise.then(_ => {
                             video.classList.add('visible');
                             // Optional: Hide/Remove image after transition to save memory? 
                             // Keeping it is safer for fallback or if video fails later.
                         })
                         .catch(error => {
                             console.log("Video autoplay prevented or failed:", error);
                         });
                     }
                });
                
                heroWrapper.appendChild(video);
            }, 2000); // 2s delay after full load to ensure stability
        }
    });