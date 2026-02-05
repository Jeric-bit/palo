/* =====================================================
   MONOCHROME PORTFOLIO - JAVASCRIPT
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================================
        // UNIVERSE-CLASS LOADING SCREEN
    // =====================================================
    const loader = document.querySelector('.loader');
    const loaderProgress = document.querySelector('.loader-progress');
    const loaderProgressGlow = document.querySelector('.loader-progress-glow');
    const loaderPercent = document.querySelector('.loader-percent');
    const statusText = document.querySelector('.status-text');
    
    // Loading status messages for an epic experience
    const statusMessages = [
        'Initializing...',
        'Loading assets...',
        'Preparing experience...',
        'Rendering elements...',
        'Optimizing visuals...',
        'Almost there...',
        'Finalizing...',
        'Ready!'
    ];
    
    let progress = 0;
    let currentStatusIndex = 0;
    
    // Easing function for smooth number animation
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    // Animate the percentage counter with smooth counting
    function animateCounter(targetValue) {
        const currentValue = parseInt(loaderPercent.textContent) || 0;
        const duration = 150; // ms
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easedProgress = easeOutQuart(progress);
            const value = Math.floor(currentValue + (targetValue - currentValue) * easedProgress);
            
            loaderPercent.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Update status message based on progress
    function updateStatus(progress) {
        let newIndex;
        if (progress < 15) newIndex = 0;
        else if (progress < 30) newIndex = 1;
        else if (progress < 45) newIndex = 2;
        else if (progress < 60) newIndex = 3;
        else if (progress < 75) newIndex = 4;
        else if (progress < 90) newIndex = 5;
        else if (progress < 100) newIndex = 6;
        else newIndex = 7;
        
        if (newIndex !== currentStatusIndex) {
            currentStatusIndex = newIndex;
            // Animate status text change
            statusText.style.opacity = '0';
            statusText.style.transform = 'translateY(5px)';
            
            setTimeout(() => {
                statusText.textContent = statusMessages[newIndex];
                statusText.style.opacity = '1';
                statusText.style.transform = 'translateY(0)';
            }, 150);
        }
    }
    
    // Add transition to status text
    if (statusText) {
        statusText.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
    }
    
    const loadingInterval = setInterval(() => {
        // Variable speed loading for more realistic feel
        const increment = progress < 30 ? Math.random() * 8 + 2 :
                         progress < 60 ? Math.random() * 6 + 1 :
                         progress < 90 ? Math.random() * 4 + 0.5 :
                         Math.random() * 2 + 0.5;
        
        progress += increment;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Final animation
            animateCounter(100);
            updateStatus(100);
            
            if (loaderProgressGlow) {
                loaderProgressGlow.style.opacity = '1';
            }
            
            setTimeout(() => {
                loader.classList.add('hidden');
                
                // Trigger epic page transition
                const pageTransition = document.querySelector('.page-transition');
                const mainContent = document.querySelector('.main-content');
                const navbar = document.querySelector('.navbar');
                
                setTimeout(() => {
                    // Start the multi-layer transition
                    pageTransition.classList.add('active');
                    
                    // Hide loader completely
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 400);
                    
                    // Reveal main content as layers start coming down
                    setTimeout(() => {
                        document.body.classList.remove('loading');
                        mainContent.classList.add('revealed');
                    }, 600);
                    
                    // Reveal navbar with slight delay
                    setTimeout(() => {
                        navbar.classList.add('revealed');
                        
                        // Animate landing stats
                        animateLandingStats();
                    }, 1000);
                    
                    // Trigger scroll-based reveal animations
                    setTimeout(() => {
                        revealElements();
                        
                        // Clean up transition after complete
                        setTimeout(() => {
                            pageTransition.classList.remove('active');
                        }, 500);
                    }, 1200);
                }, 300);
            }, 500);
        } else {
            animateCounter(Math.floor(progress));
            updateStatus(progress);
            
            // Update progress glow position
            if (loaderProgressGlow) {
                loaderProgressGlow.style.left = `calc(${progress}% - 20px)`;
                loaderProgressGlow.style.opacity = progress > 5 ? '1' : '0';
            }
        }
        
        loaderProgress.style.width = progress + '%';
    }, 80);
    
    document.body.classList.add('loading');
    
    // =====================================================
    // CUSTOM CURSOR
    // =====================================================
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        // Cursor follows mouse instantly
        cursorX = mouseX;
        cursorY = mouseY;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower has smooth lag
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .about-card, .tech-tag');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
    
    // =====================================================
    // NAVIGATION
    // =====================================================
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNav();
    });
    
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scroll for nav links
    [...navLinks, ...mobileLinks].forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =====================================================
    // THEME TOGGLE
    // =====================================================
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // =====================================================
    // REVEAL ANIMATIONS
    // =====================================================
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach((el, index) => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                setTimeout(() => {
                    el.classList.add('revealed');
                }, index * 100);
            }
        });
    }
    
    // Initial check
    setTimeout(revealElements, 100);
    
    // On scroll
    window.addEventListener('scroll', () => {
        const reveals = document.querySelectorAll('.reveal:not(.revealed)');
        
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.classList.add('revealed');
            }
        });
        
        // Animate skill bars
        animateSkillBars();
    });
    
    // =====================================================
    // SKILL BARS ANIMATION
    // =====================================================
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const parent = bar.closest('.skill-category');
            if (!parent) return;
            
            const parentTop = parent.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (parentTop < windowHeight - 100 && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            }
        });
    }
    
    // =====================================================
    // PROJECT FILTERS
    // =====================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // =====================================================
    // CONTACT FORM
    // =====================================================
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        }
    });
    
    // =====================================================
    // BACK TO TOP BUTTON
    // =====================================================
    const backToTop = document.querySelector('.back-to-top');
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // =====================================================
    // PARALLAX EFFECT FOR FLOATING SHAPES
    // =====================================================
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // =====================================================
    // TYPING EFFECT (OPTIONAL)
    // =====================================================
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // =====================================================
    // INTERSECTION OBSERVER FOR BETTER PERFORMANCE
    // =====================================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Animate skill bars when skills section is visible
                if (entry.target.closest('.skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
    
    // =====================================================
    // LANDING HERO STATS ANIMATION
    // =====================================================
    function animateLandingStats() {
        const statValues = document.querySelectorAll('.landing-stat .stat-value');
        
        statValues.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            function updateValue(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(target * easeOutQuart);
                
                stat.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateValue);
                } else {
                    stat.textContent = target;
                }
            }
            
            requestAnimationFrame(updateValue);
        });
    }
    
    // Make function globally accessible
    window.animateLandingStats = animateLandingStats;
    
    // =====================================================
    // SMOOTH SCROLL FOR LANDING CTA
    // =====================================================
    const landingBtn = document.querySelector('.landing-btn');
    if (landingBtn) {
        landingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#home');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // =====================================================
    // LANDING HERO SCROLL MOTION EFFECTS - SMOOTH FLY AWAY (Bettina Style)
    // =====================================================
    const landingHero = document.querySelector('.landing-hero');
    const landingContent = document.querySelector('.landing-content');
    const landingTitle = document.querySelector('.landing-title');
    const landingTagline = document.querySelector('.landing-tagline');
    const landingBg = document.querySelector('.landing-bg');
    const landingOrbs = document.querySelectorAll('.landing-orb');
    const landingGrid = document.querySelector('.landing-grid');
    const landingGradient = document.querySelector('.landing-gradient');
    const landingParticles = document.querySelectorAll('.l-particle');
    const landingSideLeft = document.querySelector('.landing-side-left');
    const landingSideRight = document.querySelector('.landing-side-right');
    const landingScroll = document.querySelector('.landing-scroll');
    const landingFrames = document.querySelectorAll('.landing-frame');
    const titleChars = document.querySelectorAll('.title-char, .title-char-outline');
    const taglineChars = document.querySelectorAll('.tagline-char');
    const landingLines = document.querySelectorAll('.l-line');
    
    let scrollActivated = false;

    // Pre-calculate smooth flying directions for each character - fly ONLY up and down
    const charDirections = [];
    const totalChars = titleChars.length;
    titleChars.forEach((char, index) => {
        // Alternate between flying up and flying down
        const flyUp = index % 2 === 0;  // Even index = up, Odd index = down
        const yDirection = flyUp ? -1 : 1;  // -1 = up, +1 = down
        const yDistance = 300 + (Math.random() * 200);  // Distance: 300-500px
        
        charDirections.push({
            x: (Math.random() - 0.5) * 30,  // Very minimal horizontal drift (just ±15px)
            y: yDirection * yDistance,  // Fly up OR down
            rotation: (Math.random() - 0.5) * 180,  // Some rotation
            delay: index * 0.008  // Stagger delay
        });
    });

    // Pre-calculate tagline character directions
    const taglineDirections = [];
    taglineChars.forEach((char, index) => {
        const flyUp = index % 2 === 1;  // Opposite pattern from title
        const yDirection = flyUp ? -1 : 1;
        const yDistance = 200 + (Math.random() * 150);  // Smaller distance: 200-350px
        
        taglineDirections.push({
            x: (Math.random() - 0.5) * 20,  // Even less horizontal drift
            y: yDirection * yDistance,
            rotation: (Math.random() - 0.5) * 120,
            delay: index * 0.005  // Faster stagger
        });
    });

    function handleLandingScroll() {
        if (!landingHero) return;
        
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const heroHeight = landingHero.offsetHeight;
        const scrollProgress = Math.min(scrollY / (heroHeight * 0.8), 1); // Longer scroll - 80% of hero height
        
        // Add scroll-active class to disable CSS animations when user starts scrolling
        if (scrollY > 30 && !scrollActivated) {
            scrollActivated = true;
            if (landingTitle) landingTitle.classList.add('scroll-active');
            if (landingTagline) landingTagline.classList.add('scroll-active');
        } else if (scrollY <= 30 && scrollActivated) {
            scrollActivated = false;
            if (landingTitle) landingTitle.classList.remove('scroll-active');
            if (landingTagline) landingTagline.classList.remove('scroll-active');
        }
        
        // Reset to original position when at top
        if (scrollY <= 5) {
            titleChars.forEach((char) => {
                char.style.transform = '';
                char.style.opacity = '';
            });
            taglineChars.forEach((char) => {
                char.style.transform = '';
                char.style.opacity = '';
            });
            if (landingTitle) {
                landingTitle.style.transform = '';
            }
            if (landingTagline) {
                landingTagline.style.transform = '';
                landingTagline.style.opacity = '';
            }
            if (landingGrid) {
                landingGrid.style.transform = '';
                landingGrid.style.opacity = '';
            }
            if (landingGradient) {
                landingGradient.style.transform = '';
                landingGradient.style.opacity = '';
            }
            landingOrbs.forEach((orb) => {
                orb.style.transform = '';
                orb.style.opacity = '';
            });
            landingParticles.forEach((particle) => {
                particle.style.transform = '';
                particle.style.opacity = '';
            });
            if (landingSideLeft) {
                landingSideLeft.style.transform = '';
                landingSideLeft.style.opacity = '';
            }
            if (landingSideRight) {
                landingSideRight.style.transform = '';
                landingSideRight.style.opacity = '';
            }
            if (landingScroll) {
                landingScroll.style.transform = '';
                landingScroll.style.opacity = '';
            }
            landingFrames.forEach((frame) => {
                frame.style.transform = '';
                frame.style.opacity = '';
            });
            landingLines.forEach((line) => {
                line.style.transform = '';
                line.style.opacity = '';
            });
            return;
        }
        
        // Smooth cubic easing for Bettina-style elegance
        const easeOutCubic = 1 - Math.pow(1 - scrollProgress, 3);
        const easeOutQuart = 1 - Math.pow(1 - scrollProgress, 4);
        
        // Only apply effects while landing hero is visible
        if (scrollY > heroHeight * 1.5) return;
        
        // Individual characters - SMOOTH FLY AWAY (Bettina style)
        titleChars.forEach((char, index) => {
            const dir = charDirections[index];
            
            // Staggered progress for wave-like effect
            const staggeredProgress = Math.max(0, Math.min(1, (scrollProgress - dir.delay) * 1.3));
            const charEase = 1 - Math.pow(1 - staggeredProgress, 4); // Smooth quartic easing
            
            // Smooth translation - characters float up and spread out
            const x = dir.x * charEase;
            const y = dir.y * charEase;
            const rotation = dir.rotation * charEase * 0.5; // Subtle rotation
            
            // Smooth opacity fade
            const opacity = 1 - (staggeredProgress * 1.2);
            
            char.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            char.style.opacity = Math.max(opacity, 0);
        });
        
        // Tagline chars - fly away with slight delay after title
        taglineChars.forEach((char, index) => {
            const dir = taglineDirections[index];
            // Delay tagline animation slightly after title starts
            const taglineProgress = Math.max(0, (scrollProgress - 0.1) / 0.9);
            const adjustedProgress = Math.max(0, Math.min((taglineProgress - dir.delay), 1));
            const eased = 1 - Math.pow(1 - adjustedProgress, 3);
            
            const x = dir.x * eased;
            const y = dir.y * eased;
            const rotation = dir.rotation * eased;
            const opacity = 1 - (eased * 1.2);
            
            char.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            char.style.opacity = Math.max(opacity, 0);
        });
        
        // Background elements - subtle parallax
        if (landingGrid) {
            landingGrid.style.opacity = 1 - easeOutCubic;
        }
        
        if (landingGradient) {
            landingGradient.style.opacity = 1 - (easeOutCubic * 0.7);
        }
        
        // Orbs - gentle fade
        landingOrbs.forEach((orb) => {
            orb.style.opacity = 1 - easeOutCubic;
        });
        
        // Particles - fade out
        landingParticles.forEach((particle) => {
            particle.style.opacity = 1 - easeOutCubic;
        });
        
        // Animated lines - gentle fade
        landingLines.forEach((line) => {
            line.style.opacity = 1 - easeOutCubic;
        });
        
        // Side elements - gentle fade out
        if (landingSideLeft) {
            landingSideLeft.style.opacity = 1 - (scrollProgress * 2);
        }
        if (landingSideRight) {
            landingSideRight.style.opacity = 1 - (scrollProgress * 2);
        }
        
        // Scroll indicator - fade out
        if (landingScroll) {
            landingScroll.style.opacity = 1 - (scrollProgress * 2.5);
        }
        
        // Corner frames - gentle fade
        landingFrames.forEach((frame) => {
            frame.style.opacity = 0.5 - (easeOutCubic * 0.6);
        });
        
        // Reveal main hero section when landing page is mostly scrolled
        const heroContent = document.querySelector('.hero-content');
        const heroSection = document.querySelector('.hero');
        if (heroContent && scrollProgress > 0.7) {
            heroContent.classList.add('reveal-active');
            if (heroSection) heroSection.classList.add('reveal-active');
        } else if (heroContent && scrollProgress <= 0.5) {
            heroContent.classList.remove('reveal-active');
            if (heroSection) heroSection.classList.remove('reveal-active');
        }
    }
    
    // Smooth scroll handler with requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleLandingScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    handleLandingScroll();

    // =====================================================
    // HERO TO ABOUT TRANSITION - WORLD CLASS
    // =====================================================
    const heroSection = document.querySelector('.hero');
    const aboutSection = document.querySelector('.about');
    const heroContentEl = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero-title');
    const heroDesc = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroScrollEl = document.querySelector('.hero-scroll');
    const aboutStatement = document.querySelector('.about-statement');
    const aboutDetails = document.querySelector('.about-details');
    const aboutMetrics = document.querySelector('.about-metrics');
    
    function handleHeroToAboutTransition() {
        if (!heroSection || !aboutSection) return;
        
        const heroRect = heroSection.getBoundingClientRect();
        const aboutRect = aboutSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate hero exit progress (0 = hero fully visible, 1 = hero fully exited)
        const heroExitProgress = Math.max(0, Math.min(1, -heroRect.top / (heroRect.height * 0.5)));
        
        // Calculate about enter progress (0 = about not visible, 1 = about fully in view)
        const aboutEnterProgress = Math.max(0, Math.min(1, (windowHeight - aboutRect.top) / (windowHeight * 0.6)));
        
        // Ease functions
        const easeOut = 1 - Math.pow(1 - heroExitProgress, 3);
        const easeIn = Math.pow(aboutEnterProgress, 2);
        
        // Hero exit animations
        if (heroExitProgress > 0 && heroExitProgress < 1) {
            // Title characters fly up and fade
            const heroTitleChars = document.querySelectorAll('.hero .title-char');
            heroTitleChars.forEach((char, i) => {
                const delay = i * 0.03;
                const progress = Math.max(0, Math.min(1, (heroExitProgress - delay) * 2));
                const y = -progress * 80;
                const opacity = 1 - progress;
                char.style.transform = `translateY(${y}px)`;
                char.style.opacity = opacity;
            });
            
            // Description slides up and fades
            if (heroDesc) {
                heroDesc.style.transform = `translateY(${-easeOut * 60}px)`;
                heroDesc.style.opacity = 1 - easeOut;
            }
            
            // Buttons slide up and fade
            if (heroButtons) {
                heroButtons.style.transform = `translateY(${-easeOut * 40}px)`;
                heroButtons.style.opacity = 1 - easeOut * 1.2;
            }
            
            // Scroll indicator fades
            if (heroScrollEl) {
                heroScrollEl.style.opacity = 1 - heroExitProgress * 3;
            }
        }
        
        // Reset hero when scrolled back to top
        if (heroExitProgress <= 0) {
            const heroTitleChars = document.querySelectorAll('.hero .title-char');
            heroTitleChars.forEach((char) => {
                char.style.transform = '';
                char.style.opacity = '';
            });
            if (heroDesc) {
                heroDesc.style.transform = '';
                heroDesc.style.opacity = '';
            }
            if (heroButtons) {
                heroButtons.style.transform = '';
                heroButtons.style.opacity = '';
            }
            if (heroScrollEl) {
                heroScrollEl.style.opacity = '';
            }
        }
        
        // About section entrance animations
        if (aboutEnterProgress > 0) {
            // Statement slides in from left
            if (aboutStatement) {
                const statementX = (1 - easeIn) * -80;
                aboutStatement.style.transform = `translateX(${statementX}px)`;
                aboutStatement.style.opacity = easeIn;
            }
            
            // Details slide in from right
            if (aboutDetails) {
                const detailsX = (1 - easeIn) * 80;
                aboutDetails.style.transform = `translateX(${detailsX}px)`;
                aboutDetails.style.opacity = easeIn;
            }
            
            // Metrics fade up
            if (aboutMetrics) {
                const metricsY = (1 - easeIn) * 50;
                aboutMetrics.style.transform = `translateY(${metricsY}px)`;
                aboutMetrics.style.opacity = easeIn;
            }
        }
    }
    
    // Add to scroll handler
    window.addEventListener('scroll', () => {
        requestAnimationFrame(handleHeroToAboutTransition);
    });
    
    // Initial call
    handleHeroToAboutTransition();

});