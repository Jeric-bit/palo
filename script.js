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
    const titleChars = document.querySelectorAll('.landing-hero .title-char, .landing-hero .title-char-outline');
    const taglineChars = document.querySelectorAll('.landing-hero .tagline-char');
    const landingLines = document.querySelectorAll('.l-line');
    const landingCursorGlow = document.querySelector('.landing-cursor-glow');
    
    // Cursor glow tracking for landing page
    if (landingCursorGlow && landingHero) {
        landingHero.addEventListener('mousemove', (e) => {
            landingCursorGlow.style.left = e.clientX + 'px';
            landingCursorGlow.style.top = e.clientY + 'px';
        });
    }
    
    let scrollActivated = false;

    // Pre-calculate smooth flying directions for each character - ENHANCED dramatic fly-away
    const charDirections = [];
    const totalChars = titleChars.length;
    titleChars.forEach((char, index) => {
        // Create more varied and dramatic direction patterns
        const row = Math.floor(index / 8); // Approximate row based on position
        const posInRow = index % 8;
        const centerOffset = (posInRow - 4) / 4; // -1 to 1 for position relative to center
        
        // Alternate patterns: fly up/down with slight outward spread
        const flyUp = (index + row) % 2 === 0;
        const yDirection = flyUp ? -1 : 1;
        const yDistance = 400 + (Math.random() * 300); // Distance: 400-700px (more dramatic)
        
        charDirections.push({
            x: centerOffset * 80 + (Math.random() - 0.5) * 60, // Spread outward from center
            y: yDirection * yDistance,
            rotation: (Math.random() - 0.5) * 360, // Full rotation range
            scale: 0.3 + Math.random() * 0.4, // Scale down to 0.3-0.7
            delay: index * 0.006, // Faster stagger
            blur: 5 + Math.random() * 10 // Add blur effect
        });
    });

    // Pre-calculate tagline character directions - enhanced
    const taglineDirections = [];
    taglineChars.forEach((char, index) => {
        const flyUp = index % 3 !== 0; // 2/3 fly up, 1/3 fly down
        const yDirection = flyUp ? -1 : 1;
        const yDistance = 250 + (Math.random() * 200);
        
        taglineDirections.push({
            x: (index - taglineChars.length/2) * 3 + (Math.random() - 0.5) * 40, // Fan out
            y: yDirection * yDistance,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.4 + Math.random() * 0.3,
            delay: index * 0.003,
            blur: 3 + Math.random() * 7
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
                char.style.filter = '';
            });
            taglineChars.forEach((char) => {
                char.style.transform = '';
                char.style.opacity = '';
                char.style.filter = '';
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
        const easeOutQuint = 1 - Math.pow(1 - scrollProgress, 5);
        
        // Only apply effects while landing hero is visible
        if (scrollY > heroHeight * 1.5) return;
        
        // Individual characters - ENHANCED dramatic fly-away
        titleChars.forEach((char, index) => {
            const dir = charDirections[index];
            
            // Staggered progress for wave-like effect
            const staggeredProgress = Math.max(0, Math.min(1, (scrollProgress - dir.delay) * 1.4));
            const charEase = 1 - Math.pow(1 - staggeredProgress, 5); // Smoother quint easing
            
            // Enhanced translation with scale
            const x = dir.x * charEase;
            const y = dir.y * charEase;
            const rotation = dir.rotation * charEase;
            const scale = 1 - ((1 - dir.scale) * charEase); // Scale down
            const blur = dir.blur * charEase;
            
            // Smoother opacity fade
            const opacity = 1 - (staggeredProgress * 1.3);
            
            char.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
            char.style.opacity = Math.max(opacity, 0);
            char.style.filter = `blur(${blur}px)`;
        });
        
        // Tagline chars - enhanced fly away with slight delay
        taglineChars.forEach((char, index) => {
            const dir = taglineDirections[index];
            // Delay tagline animation slightly after title starts
            const taglineProgress = Math.max(0, (scrollProgress - 0.08) / 0.92);
            const adjustedProgress = Math.max(0, Math.min((taglineProgress - dir.delay), 1));
            const eased = 1 - Math.pow(1 - adjustedProgress, 4);
            
            const x = dir.x * eased;
            const y = dir.y * eased;
            const rotation = dir.rotation * eased;
            const scale = 1 - ((1 - dir.scale) * eased);
            const blur = dir.blur * eased;
            const opacity = 1 - (eased * 1.3);
            
            char.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
            char.style.opacity = Math.max(opacity, 0);
            char.style.filter = `blur(${blur}px)`;
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
        const heroImage = document.querySelector('.hero-image');
        if (heroContent && scrollProgress > 0.5) {
            heroContent.classList.add('reveal-active');
            if (heroSection) heroSection.classList.add('reveal-active');
            if (heroImage) heroImage.classList.add('reveal-active');
        } else if (heroContent && scrollProgress <= 0.3) {
            heroContent.classList.remove('reveal-active');
            if (heroSection) heroSection.classList.remove('reveal-active');
            if (heroImage) heroImage.classList.remove('reveal-active');
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
    // HERO TO ABOUT CARD TRANSITION - WORLD CLASS
    // =====================================================
    const heroSection = document.querySelector('.hero');
    const aboutSection = document.querySelector('.about');
    const heroContentEl = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero-title');
    const heroDesc = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroScrollEl = document.querySelector('.hero-scroll');
    const heroImageEl = document.querySelector('.hero-image');
    const aboutStatement = document.querySelector('.about-statement');
    const aboutDetails = document.querySelector('.about-details');
    const aboutMetrics = document.querySelector('.about-metrics');
    
    let cardTransitionActive = false;
    
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
        
        // Card transition effects with threshold
        if (heroExitProgress > 0.15) {
            if (!cardTransitionActive) {
                cardTransitionActive = true;
                heroSection.classList.add('card-exit');
                aboutSection.classList.add('card-enter');
            }
        } else {
            if (cardTransitionActive) {
                cardTransitionActive = false;
                heroSection.classList.remove('card-exit');
                aboutSection.classList.remove('card-enter');
            }
        }
        
        // Hero exit animations with enhanced card-like movement
        if (heroExitProgress > 0 && heroExitProgress < 1) {
            // Add a slight 3D tilt based on scroll progress
            const tiltX = heroExitProgress * -5;
            const translateY = heroExitProgress * -50;
            
            // Title characters fly up and fade with card effect
            const heroTitleChars = document.querySelectorAll('.hero .title-char');
            heroTitleChars.forEach((char, i) => {
                const delay = i * 0.03;
                const progress = Math.max(0, Math.min(1, (heroExitProgress - delay) * 2));
                const y = -progress * 80;
                const opacity = 1 - progress;
                const scale = 1 - (progress * 0.2);
                const rotateX = progress * -10;
                char.style.transform = `translateY(${y}px) scale(${scale}) rotateX(${rotateX}deg)`;
                char.style.opacity = opacity;
            });
            
            // Description slides up and fades with 3D effect
            if (heroDesc) {
                const descRotateX = easeOut * -8;
                heroDesc.style.transform = `translateY(${-easeOut * 60}px) scale(${1 - easeOut * 0.1}) rotateX(${descRotateX}deg)`;
                heroDesc.style.opacity = 1 - easeOut;
            }
            
            // Buttons slide up and fade with 3D effect
            if (heroButtons) {
                const btnRotateX = easeOut * -12;
                heroButtons.style.transform = `translateY(${-easeOut * 40}px) scale(${1 - easeOut * 0.15}) rotateX(${btnRotateX}deg)`;
                heroButtons.style.opacity = 1 - easeOut * 1.2;
            }
            
            // Image tilts and fades
            if (heroImageEl) {
                const imgRotateY = easeOut * 15;
                const imgScale = 1 - (easeOut * 0.15);
                heroImageEl.style.transform = `scale(${imgScale}) rotateY(${imgRotateY}deg) translateZ(-${easeOut * 50}px)`;
                heroImageEl.style.opacity = 1 - easeOut * 1.5;
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
            if (heroImageEl) {
                heroImageEl.style.transform = '';
                heroImageEl.style.opacity = '';
            }
            if (heroScrollEl) {
                heroScrollEl.style.opacity = '';
            }
        }
        
        // About section card entrance animations with 3D effect
        if (aboutEnterProgress > 0) {
            // Statement slides in from left with card effect
            if (aboutStatement) {
                const statementX = (1 - easeIn) * -80;
                const statementRotateY = (1 - easeIn) * -15;
                aboutStatement.style.transform = `translateX(${statementX}px) rotateY(${statementRotateY}deg)`;
                aboutStatement.style.opacity = easeIn;
            }
            
            // Details slide in from right with card effect
            if (aboutDetails) {
                const detailsX = (1 - easeIn) * 80;
                const detailsRotateY = (1 - easeIn) * 15;
                aboutDetails.style.transform = `translateX(${detailsX}px) rotateY(${detailsRotateY}deg)`;
                aboutDetails.style.opacity = easeIn;
            }
            
            // Metrics fade up with card effect
            if (aboutMetrics) {
                const metricsY = (1 - easeIn) * 50;
                const metricsRotateX = (1 - easeIn) * 10;
                aboutMetrics.style.transform = `translateY(${metricsY}px) rotateX(${metricsRotateX}deg)`;
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

    // =====================================================
    // MAGNETIC HOVER EFFECT FOR ABOUT CARDS - PREMIUM INTERACTION
    // =====================================================
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    const credentialItems = document.querySelectorAll('.credential-item');
    const certificationCards = document.querySelectorAll('.certification-card');
    
    // Combine all magnetic elements
    const magneticCards = [...philosophyCards, ...credentialItems, ...certificationCards];
    
    magneticCards.forEach(card => {
        // Store original position
        card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.15s ease-out';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            // Calculate distance from center
            const deltaX = e.clientX - cardCenterX;
            const deltaY = e.clientY - cardCenterY;
            
            // Magnetic strength (reduced for subtle effect)
            const strength = 0.15;
            const magneticX = deltaX * strength;
            const magneticY = deltaY * strength;
            
            // Calculate 3D tilt based on mouse position
            const rotateX = (deltaY / rect.height) * 8; // 8 degrees max tilt
            const rotateY = (deltaX / rect.width) * -8;
            
            // Apply magnetic movement with 3D tilt
            const currentTransform = this.style.transform || '';
            const baseTransform = currentTransform.split('translate(')[0]; // Preserve other transforms
            
            this.style.transform = `translate(${magneticX}px, ${magneticY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            this.style.transform = '';
        });
    });
    
    // Enhanced parallax effect for card icons
    philosophyCards.forEach(card => {
        const icon = card.querySelector('.philosophy-icon');
        if (!icon) return;
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Icon moves in opposite direction (parallax)
            const moveX = (x - 0.5) * -15; // 15px max movement
            const moveY = (y - 0.5) * -15;
            
            if (icon) {
                icon.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1) rotate(5deg)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
    
    // Ripple effect on card click
    magneticCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.className = 'card-ripple';
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // =====================================================
    // ABOUT HEADER ENHANCED ANIMATIONS
    // =====================================================
    const aboutTitle = document.querySelector('.about-title');
    const aboutDescription = document.querySelector('.about-description');
    
    // Split description into words for animation
    if (aboutDescription) {
        const text = aboutDescription.textContent;
        const words = text.trim().split(/\s+/);
        
        aboutDescription.innerHTML = words.map((word, index) => {
            return `<span class="desc-word" style="display: inline-block; opacity: 0; transform: translateY(20px); transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.03}s;">${word}&nbsp;</span>`;
        }).join('');
        
        // Trigger animation when element is in view or on hover
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const words = entry.target.querySelectorAll('.desc-word');
                    words.forEach(word => {
                        word.style.opacity = '1';
                        word.style.transform = 'translateY(0)';
                    });
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        if (aboutDescription) {
            aboutObserver.observe(aboutDescription);
        }
        
        // Enhanced hover effect - word highlighting
        const descWords = aboutDescription.querySelectorAll('.desc-word');
        descWords.forEach((word, index) => {
            word.addEventListener('mouseenter', function() {
                this.style.color = 'var(--text-primary)';
                this.style.transform = 'translateY(-2px) scale(1.05)';
                this.style.textShadow = '0 2px 8px rgba(255,255,255,0.3)';
                this.style.fontWeight = '500';
            });
            
            word.addEventListener('mouseleave', function() {
                // Reset to default or inherit from parent hover state
                this.style.color = '';
                this.style.transform = 'translateY(0) scale(1)';
                this.style.textShadow = '';
                this.style.fontWeight = '';
            });
        });
    }
    
    // Title character split and animation (optional enhancement)
    if (aboutTitle) {
        const titleLines = aboutTitle.querySelectorAll('.title-line');
        
        titleLines.forEach(line => {
            if (!line.classList.contains('title-outline')) {
                const text = line.textContent;
                const chars = text.split('');
                
                line.innerHTML = chars.map((char, index) => {
                    return `<span class="title-char" style="display: inline-block; opacity: 0; transform: translateY(50px) rotate(-10deg); transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s;">${char}</span>`;
                }).join('');
            }
        });
        
        // Animate on scroll into view
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const chars = entry.target.querySelectorAll('.title-char');
                    chars.forEach(char => {
                        char.style.opacity = '1';
                        char.style.transform = 'translateY(0) rotate(0deg)';
                    });
                    titleObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        if (aboutTitle) {
            titleObserver.observe(aboutTitle);
        }
        
        // Parallax effect on title hover
        aboutTitle.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const moveX = (x - 0.5) * 20;
            const moveY = (y - 0.5) * 20;
            
            const chars = this.querySelectorAll('.title-char');
            chars.forEach((char, index) => {
                const delay = index * 0.01;
                const charMoveX = moveX * (1 + delay);
                const charMoveY = moveY * (1 + delay);
                
                char.style.transform = `translate(${charMoveX}px, ${charMoveY}px) rotate(${moveX * 0.5}deg)`;
            });
        });
        
        aboutTitle.addEventListener('mouseleave', function() {
            const chars = this.querySelectorAll('.title-char');
            chars.forEach(char => {
                char.style.transform = '';
            });
        });
    }
    
    // Animated particles around about header
    const aboutHeader = document.querySelector('.about-header');
    if (aboutHeader) {
        // Create floating particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'about-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: var(--text-tertiary);
                border-radius: 50%;
                opacity: ${Math.random() * 0.3 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
                animation: particleFloat ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            aboutHeader.appendChild(particle);
        }
        
        // Cursor glow effect
        const cursorGlow = document.createElement('div');
        cursorGlow.className = 'about-cursor-glow';
        cursorGlow.style.cssText = `
            position: absolute;
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            transform: translate(-50%, -50%);
            z-index: 0;
        `;
        aboutHeader.appendChild(cursorGlow);
        
        aboutHeader.addEventListener('mouseenter', () => {
            cursorGlow.style.opacity = '1';
        });
        
        aboutHeader.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
        
        aboutHeader.addEventListener('mousemove', (e) => {
            const rect = aboutHeader.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            cursorGlow.style.left = x + 'px';
            cursorGlow.style.top = y + 'px';
        });
    }
    
    // Enhanced section number animation
    const sectionNumber = document.querySelector('.section-number');
    if (sectionNumber) {
        const number = sectionNumber.querySelector('.number');
        const label = sectionNumber.querySelector('.label');
        
        // Counter animation on scroll into view
        const numberObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && number) {
                    let count = 0;
                    const target = parseInt(number.textContent);
                    const duration = 1000;
                    const increment = target / (duration / 16);
                    
                    const counter = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            number.textContent = String(target).padStart(2, '0');
                            clearInterval(counter);
                        } else {
                            number.textContent = String(Math.floor(count)).padStart(2, '0');
                        }
                    }, 16);
                    
                    numberObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        if (sectionNumber) {
            numberObserver.observe(sectionNumber);
        }
    }

    // =====================================================
    // CURSOR FOLLOW IMAGE FOR PROJECT HOVER - PREMIUM EFFECT
    // =====================================================
    const cursorImage = document.getElementById('cursorImage');
    const cursorImageImg = cursorImage ? cursorImage.querySelector('img') : null;
    const hoverProjectCards = document.querySelectorAll('.project-card[data-hover-image]');
    
    if (cursorImage && cursorImageImg && hoverProjectCards.length > 0) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        let isHovering = false;
        let velocityX = 0;
        let velocityY = 0;
        
        // Smooth cursor follow animation with momentum
        function animateCursorImage() {
            if (isHovering) {
                // Calculate velocity for smooth deceleration
                const dx = mouseX - currentX;
                const dy = mouseY - currentY;
                
                // Add slight momentum/easing for premium feel
                velocityX += (dx - velocityX) * 0.15;
                velocityY += (dy - velocityY) * 0.15;
                
                currentX += velocityX * 0.12;
                currentY += velocityY * 0.12;
                
                // Add subtle rotation based on movement direction
                const rotation = velocityX * 0.02;
                const maxRotation = 3;
                const clampedRotation = Math.max(-maxRotation, Math.min(maxRotation, rotation));
                
                cursorImage.style.left = currentX + 'px';
                cursorImage.style.top = currentY + 'px';
                
                // Apply subtle tilt based on movement
                if (cursorImage.classList.contains('visible')) {
                    cursorImage.style.transform = `translate(-50%, -50%) scale(1) rotate(${clampedRotation}deg)`;
                }
            }
            requestAnimationFrame(animateCursorImage);
        }
        animateCursorImage();
        
        hoverProjectCards.forEach(card => {
            const imageUrl = card.getAttribute('data-hover-image');
            
            card.addEventListener('mouseenter', (e) => {
                if (imageUrl) {
                    // Preload image
                    const preloadImg = new Image();
                    preloadImg.src = imageUrl;
                    
                    cursorImageImg.src = imageUrl;
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                    currentX = mouseX;
                    currentY = mouseY;
                    velocityX = 0;
                    velocityY = 0;
                    cursorImage.style.left = mouseX + 'px';
                    cursorImage.style.top = mouseY + 'px';
                    isHovering = true;
                    
                    // Slight delay for smoother appearance
                    setTimeout(() => {
                        if (isHovering) {
                            cursorImage.classList.add('visible');
                        }
                    }, 30);
                }
            });
            
            card.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            card.addEventListener('mouseleave', () => {
                isHovering = false;
                cursorImage.classList.remove('visible');
                // Reset transform on leave
                cursorImage.style.transform = '';
            });
        });
    }

    // =====================================================
    // SCROLL DEPTH INDICATOR
    // =====================================================
    
    // Scroll Depth Indicator with 25%, 50%, 75%, 100% markers
    function initScrollDepth() {
        const depthIndicator = document.createElement('div');
        depthIndicator.className = 'scroll-depth-indicator';
        depthIndicator.innerHTML = `
            <div class="depth-bar">
                <div class="depth-segment" data-depth="25">25%</div>
                <div class="depth-segment" data-depth="50">50%</div>
                <div class="depth-segment" data-depth="75">75%</div>
                <div class="depth-segment" data-depth="100">100%</div>
            </div>
        `;
        document.body.appendChild(depthIndicator);
        
        function updateDepth() {
            const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            const segments = document.querySelectorAll('.depth-segment');
            
            segments.forEach(segment => {
                const depth = parseInt(segment.getAttribute('data-depth'));
                if (scrollPercent >= depth) {
                    segment.classList.add('reached');
                } else {
                    segment.classList.remove('reached');
                }
            });
        }
        
        window.addEventListener('scroll', () => {
            requestAnimationFrame(updateDepth);
        }, { passive: true });
        
        updateDepth();
    }
    
    // Initialize scroll depth indicator
    setTimeout(() => {
        initScrollDepth();
    }, 100);

});