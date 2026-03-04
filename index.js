/* ===========================
   32 CARAT DENTAL — INTERACTIONS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // 1. NAVBAR SCROLL STATE
    // ===========================
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    function updateNavbar() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // ===========================
    // 2. MOBILE HAMBURGER MENU
    // ===========================
    const hamburger = document.getElementById('navHamburger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===========================
    // 3. SMOOTH SCROLL
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const offset = navbar.offsetHeight + 10;
                const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================
    // 4. SCROLL REVEAL ANIMATIONS
    // ===========================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===========================
    // 5. ANIMATED COUNTERS
    // ===========================
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;

        statNumbers.forEach(counter => {
            const target = parseFloat(counter.dataset.target);
            const isDecimal = counter.dataset.decimal === 'true';
            const suffix = counter.dataset.suffix || '';
            const duration = 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = target * eased;

                if (isDecimal) {
                    counter.textContent = current.toFixed(1) + suffix;
                } else {
                    counter.textContent = Math.floor(current).toLocaleString() + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    if (isDecimal) {
                        counter.textContent = target.toFixed(1) + suffix;
                    } else {
                        counter.textContent = target.toLocaleString() + suffix;
                    }
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // Observe trust stats section
    const trustStatsSection = document.getElementById('trustStats');
    if (trustStatsSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counterObserver.observe(trustStatsSection);
    }

    // ===========================
    // 6. ACTIVE NAV LINK ON SCROLL
    // ===========================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a, .mobile-nav-link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ===========================
    // 7. APPOINTMENT FORM
    // ===========================
    const form = document.getElementById('appointmentForm');
    const formContainer = document.getElementById('appointmentFormContainer');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            const name = document.getElementById('patientName').value.trim();
            const phone = document.getElementById('patientPhone').value.trim();

            if (!name || !phone) {
                alert('Please fill in your name and phone number.');
                return;
            }

            // Show success state
            formContainer.style.display = 'none';
            formSuccess.classList.add('active');

            // Reset form data
            form.reset();

            // Restore form after 8 seconds
            setTimeout(() => {
                formSuccess.classList.remove('active');
                formContainer.style.display = 'block';
            }, 8000);
        });
    }

    // ===========================
    // 8. PARALLAX EFFECT ON HERO
    // ===========================
    const heroBg = document.querySelector('.hero-bg img');

    if (heroBg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
            }
        }, { passive: true });
    }

    // ===========================
    // 9. FORM INPUT ANIMATIONS
    // ===========================
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });

    // ===========================
    // 10. PRELOAD & INITIAL STATE
    // ===========================
    // Remove any initial opacity if needed
    document.body.classList.add('loaded');

    // Console brand message
    console.log(
        '%c🦷 32 Carat Dental Hospital',
        'color: #b8972e; font-size: 18px; font-weight: bold; font-family: serif;'
    );
    console.log(
        '%cRajkamal Square, Amravati | Precision Dental Care, Rooted in Trust.',
        'color: #1a5276; font-size: 12px;'
    );

});
