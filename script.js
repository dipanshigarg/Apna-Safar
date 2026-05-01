document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Reveal content as it enters the viewport.
    const revealItems = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealItems.length) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });

        revealItems.forEach(item => revealObserver.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add('is-visible'));
    }

    // Hero search demo: show a useful first result instead of a dead input.
    const safetySearch = document.getElementById('safetySearch');
    const searchInput = document.getElementById('searchInput');
    const searchResult = document.getElementById('searchResult');
    const resultTitle = document.getElementById('resultTitle');
    const resultTip = document.getElementById('resultTip');
    const resultRisk = document.getElementById('resultRisk');
    const resultPrice = document.getElementById('resultPrice');
    const resultTrust = document.getElementById('resultTrust');
    const exampleSearches = document.querySelectorAll('.example-searches button');

    const showSearchResult = (query = '') => {
        const cleanQuery = query.trim();
        const lowerQuery = cleanQuery.toLowerCase();

        if (lowerQuery.includes('beach') || lowerQuery.includes('night')) {
            resultTitle.textContent = 'Stay near the main crowd and lit road.';
            resultRisk.textContent = 'Medium';
            resultPrice.textContent = 'Ask locally';
            resultTrust.textContent = '74%';
            resultTip.textContent = 'Avoid quiet lanes after dark. Keep your return ride planned before you leave.';
        } else if (lowerQuery.includes('fare') || lowerQuery.includes('auto')) {
            resultTitle.textContent = 'Check the fare before you sit.';
            resultRisk.textContent = 'Low';
            resultPrice.textContent = '₹80-₹120';
            resultTrust.textContent = '79%';
            resultTip.textContent = 'Confirm the price clearly, then share your route with someone you trust.';
        } else {
            resultTitle.textContent = cleanQuery ? 'Main road route looks safer right now.' : 'Try a route or place to see guidance.';
            resultRisk.textContent = 'Low';
            resultPrice.textContent = '₹120-₹150';
            resultTrust.textContent = '82%';
            resultTip.textContent = 'Stay on the lit road, confirm the fare before you sit, and avoid the inner lane after 9 PM.';
        }

        searchResult.classList.add('visible');
    };

    if (safetySearch && searchInput && searchResult) {
        safetySearch.addEventListener('submit', (event) => {
            event.preventDefault();
            showSearchResult(searchInput.value);
        });

        exampleSearches.forEach(button => {
            button.addEventListener('click', () => {
                searchInput.value = button.textContent;
                showSearchResult(searchInput.value);
            });
        });
    }

    // Smooth Scrolling for Anchor Links (with header offset)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only strictly local anchors
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 90; // Adjust for header height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulation of form submission
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Thank you for reaching out! We will get back to you soon.');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
