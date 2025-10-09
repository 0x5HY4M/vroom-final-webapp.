// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// Main Initialization - Enhanced for 2025 Futuristic Experience
function initializeApp() {
    hideLoadingScreen();
    initParticles();
    initGSAPAnimations();
    // Theme toggle removed for unified premium theme
    initSmoothScroll();
    initCounters();
    initForms();
    initModals();
    initMobileMenu();
    initScrollEffects();
    init3DEffects();
    initVanillaTilt();
    initLeafletMap();
    initSearchUI();

    console.log('%c✨ VROOM LUXURY DARK THEME - 2025 ✨', 'color: #007BFF; font-size: 18px; font-weight: bold;');
    console.log('%c🎨 Pure Black (#07070A) + Electric Blue (#007BFF) + Royal Purple (#6F42C1)', 'color: #6F42C1; font-size: 14px;');
    console.log('%c⚡ Performance Optimized | 3D Parallax | Glassmorphism Active', 'color: #AAB7D9; font-size: 12px;');
    console.log('%c🚀 All Systems Ready', 'color: #10B981; font-size: 12px; font-weight: bold;');
}

// ==========================================================================
// Loading Screen
// ==========================================================================

function hideLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('loaded');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
}

// ==========================================================================
// Theme Management (removed)
// ==========================================================================

// (intentionally left blank)

// ==========================================================================
// Smooth Scroll
// ==========================================================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                scrollToElement(target);
            }
        });
    });
}

function scrollToElement(element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        scrollToElement(element);
    }
}

// ==========================================================================
// Counter Animation
// ==========================================================================

function initCounters() {
    const counters = document.querySelectorAll('.counter');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target === 98 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target === 98 ? '%' : '+');
        }
    }, 16);
}

// ==========================================================================
// Form Handling
// ==========================================================================

function initForms() {
    const contactForm = document.getElementById('contactForm');
    const devisForm = document.getElementById('devisForm');
    const locationForm = document.getElementById('locationForm');

    if (contactForm) contactForm.addEventListener('submit', handleContactForm);
    if (devisForm) devisForm.addEventListener('submit', handleDevisForm);
    if (locationForm) locationForm.addEventListener('submit', handleLocationForm);
}

async function handleContactForm(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.btn-submit');

    submitBtn.classList.add('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));

    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');

    setTimeout(() => {
        submitBtn.classList.remove('success');
        showNotification('Message envoyé avec succès! Nous vous contacterons bientôt.', 'success');
        this.reset();
    }, 1500);
}

async function handleDevisForm(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.btn-submit');

    submitBtn.classList.add('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));

    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');

    setTimeout(() => {
        submitBtn.classList.remove('success');
        showNotification('Demande de devis soumise avec succès! Nous vous contacterons sous 24h.', 'success');
        this.reset();
        closeDevisModal();
    }, 1500);
}

async function handleLocationForm(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.btn-submit');

    submitBtn.classList.add('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));

    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');

    setTimeout(() => {
        submitBtn.classList.remove('success');
        showNotification('Réservation confirmée! Un conseiller vous contactera pour finaliser les détails.', 'success');
        this.reset();
        closeLocationModal();
    }, 1500);
}

// ==========================================================================
// Modal Management
// ==========================================================================

function initModals() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function openDevisModal() {
    const modal = document.getElementById('devisModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeDevisModal() {
    const modal = document.getElementById('devisModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openLocationModal() {
    const modal = document.getElementById('locationModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeLocationModal() {
    const modal = document.getElementById('locationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function closeAllModals() {
    closeDevisModal();
    closeLocationModal();
}

// ==========================================================================
// Mobile Menu
// ==========================================================================

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Close on hash navigation, ESC, and link tap
    document.querySelectorAll('#mobileNav a').forEach(a => {
        a.addEventListener('click', () => {
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav && mobileNav.classList.contains('active')) {
                setTimeout(() => toggleMobileMenu(), 100);
            }
        });
    });
    
    // Close mobile menu when action buttons are clicked
    document.querySelectorAll('.mobile-actions button').forEach(btn => {
        btn.addEventListener('click', () => {
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav && mobileNav.classList.contains('active')) {
                setTimeout(() => toggleMobileMenu(), 100);
            }
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav && mobileNav.classList.contains('active')) toggleMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    }
}

// ==========================================================================
// Scroll Effects - Optimized with debouncing
// ==========================================================================

function initScrollEffects() {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

function handleScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;

    if (navbar) {
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// ==========================================================================
// 3D Effects & Parallax
// ==========================================================================

function init3DEffects() {
    // Optimized mouse move parallax effect with throttling
    let ticking = false;

    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const carImage = document.querySelector('.car-image-3d');
                if (carImage) {
                    const relX = e.clientX / window.innerWidth - 0.5;
                    const relY = e.clientY / window.innerHeight - 0.5;
                    const rotY = relX * 8;
                    const rotX = -relY * 4;
                    carImage.style.transform = `perspective(1000px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(1.03)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add smooth reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card-3d, .vehicle-card-3d, .testimonial-card-3d').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Lightweight scroll parallax for hero background orbs and grid
    const heroBg = document.querySelector('.hero-bg-3d');
    if (heroBg) {
        const orbs = heroBg.querySelectorAll('.gradient-orb');
        const grid = heroBg.querySelector('.grid-pattern');
        let lastY = window.scrollY;

        const onScroll = () => {
            const y = window.scrollY;
            const delta = y - lastY;
            lastY = y;
            const factor = Math.max(0.5, Math.min(1.5, window.innerHeight / 900));
            orbs.forEach((orb, i) => {
                const speed = (i + 1) * 0.05 * factor;
                orb.style.transform = `translateY(${y * speed}px)`;
            });
            if (grid) {
                grid.style.transform = `translateY(${y * 0.02}px)`;
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
}

// ==========================================================================
// Contact & Social Functions
// ==========================================================================

function openWhatsApp() {
    const phone = '+33768790959';
    const message = 'Bonjour VROOM, je suis intéressé par vos services automobiles.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function makeCall() {
    const phone = '+33768790959';
    window.open(`tel:${phone}`, '_self');
}

function sendEmail() {
    const email = 'contact@vroo-m.com';
    const subject = 'Demande d\'information - VROOM';
    const body = 'Bonjour VROOM,\n\nJe souhaiterais obtenir des informations sur vos services.';
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
}

function openSocial(platform) {
    const urls = {
        facebook: 'https://facebook.com/vroomci',
        instagram: 'https://instagram.com/vroomci',
        linkedin: 'https://linkedin.com/company/vroomci',
        twitter: 'https://twitter.com/vroomci',
        whatsapp: 'https://wa.me/+33768790959'
    };

    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    }
}

function rentVehicle(vehicleName) {
    openLocationModal();

    setTimeout(() => {
        const vehicleSelect = document.getElementById('locationVehicle');
        if (vehicleSelect) {
            const option = Array.from(vehicleSelect.options).find(opt =>
                opt.text.includes(vehicleName)
            );
            if (option) {
                vehicleSelect.value = option.value;
            }
        }
    }, 100);
}

// ==========================================================================
// Electric Charging Functions
// ==========================================================================

function findNearestCharging() {
    if (navigator.geolocation) {
        showNotification('📍 Localisation en cours...', 'info');

        navigator.geolocation.getCurrentPosition(
            function (position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                showNotification(`🚗 Stations trouvées près de vous! (${lat.toFixed(2)}, ${lng.toFixed(2)})`, 'success');

                setTimeout(() => {
                    openDevisModal();
                }, 1500);
            },
            function (error) {
                showNotification('❌ Localisation non disponible. Veuillez activer la géolocalisation.', 'error');
            }
        );
    } else {
        showNotification('❌ Géolocalisation non supportée par votre navigateur.', 'error');
    }
}

// ==========================================================================
// Notification System
// ==========================================================================

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
        border: 1px solid rgba(255,255,255,0.2);
    `;

    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0.25rem;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        ">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#0066FF'
    };
    return colors[type] || '#0066FF';
}

// ==========================================================================
// Language Toggle
// ==========================================================================

const languageBtn = document.getElementById('languageBtn');
if (languageBtn) {
    languageBtn.addEventListener('click', function () {
        const currentLang = this.textContent.trim();
        const newLang = currentLang === 'FR' ? 'EN' : 'FR';

        this.innerHTML = `<i class="fas fa-globe"></i> ${newLang}`;
        showNotification(`Langue changée en ${newLang}`, 'info');
    });
}

// ==========================================================================
// Performance & Error Handling
// ==========================================================================

// Lazy loading images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// Error handling
window.addEventListener('error', function (e) {
    console.error('Website Error:', e.error);
});

// ==========================================================================
// Add notification animations to CSS
// ==========================================================================

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// ==========================================================================
// Modern Features - Particles, GSAP, Tilt, Leaflet
// ==========================================================================

function initParticles() {
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 900 } },
                color: { value: ['#007BFF', '#6F42C1', '#AAB7D9'] },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.4,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    animation: {
                        enable: true,
                        speed: 2,
                        minimumValue: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#007BFF',
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true,
            fpsLimit: 60
        });
        console.log('✨ Luxury particle background initialized');
    }
}

function initGSAPAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.from('.hero-title .title-line', {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.utils.toArray('.service-card-3d').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 0.6,
                delay: i * 0.1
            });
        });

        console.log('⚡ GSAP animations initialized');
    }
}

function initVanillaTilt() {
    if (typeof VanillaTilt !== 'undefined') {
        const tiltElements = document.querySelectorAll('.vehicle-card-3d, .testimonial-card-3d');
        VanillaTilt.init(tiltElements, {
            max: 15,
            speed: 400,
            glare: true,
            'max-glare': 0.3
        });
        console.log('🎨 3D Tilt effects initialized');
    }
}

function initLeafletMap() {
    const mapContainer = document.getElementById('charging-map');
    if (mapContainer && typeof L !== 'undefined') {
        const map = L.map('charging-map').setView([5.3600, -4.0083], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const customIcon = L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        L.marker([5.3600, -4.0083], { icon: customIcon })
            .addTo(map)
            .bindPopup('<b>Station VROOM</b><br>Plateau, Abidjan')
            .openPopup();

        console.log('🗺️ Interactive map initialized');
    }
}

// ==========================================================================
// Export functions for global access
// ==========================================================================

window.scrollToSection = scrollToSection;
window.openDevisModal = openDevisModal;
window.closeDevisModal = closeDevisModal;
window.openLocationModal = openLocationModal;
window.closeLocationModal = closeLocationModal;
window.toggleMobileMenu = toggleMobileMenu;
window.openWhatsApp = openWhatsApp;
window.makeCall = makeCall;
window.sendEmail = sendEmail;
window.openSocial = openSocial;
window.rentVehicle = rentVehicle;
window.findNearestCharging = findNearestCharging;

console.log('');



function initSearchUI() {
    const locationSection = document.getElementById('location');
    if (!locationSection) return;

    const container = locationSection.querySelector('.container');
    if (!container) return;

    // Avoid duplicate injection
    if (container.querySelector('.search-panel-3d')) return;

    // Build panel
    const panel = document.createElement('div');
    panel.className = 'search-panel-3d';
    panel.innerHTML = `
        <div class="search-fields">
            <div class="field">
                <label>Immatriculation</label>
                <input id="searchRegistration" type="text" placeholder="AA-123-BB" inputmode="latin" autocomplete="off"/>
            </div>
            <div class="field">
                <label>Modèle</label>
                <input id="searchModel" type="text" placeholder="Ex: Duster, Polo, Captur" autocomplete="off"/>
            </div>
            <div class="field">
                <label>Localisation</label>
                <input id="searchLocation" type="text" placeholder="Ville, quartier..." autocomplete="off"/>
            </div>
            <div class="actions">
                <button id="searchReset" class="btn-search reset"><i class="fas fa-rotate-left"></i><span>Réinitialiser</span></button>
                <button id="searchLocate" class="btn-search locate"><i class="fas fa-location-crosshairs"></i><span>Autour de moi</span></button>
            </div>
        </div>
        
    `;

    // Insert before vehicles grid
    const vehiclesGrid = container.querySelector('.vehicles-grid');
    if (vehiclesGrid) {
        container.insertBefore(panel, vehiclesGrid);
    } else {
        container.prepend(panel);
    }

    // Build runtime dataset for vehicles (registration and location tags)
    seedVehicleMetadata();

    // Restore previous search
    const saved = getSavedSearch();
    const regInput = document.getElementById('searchRegistration');
    const modelInput = document.getElementById('searchModel');
    const locInput = document.getElementById('searchLocation');

    if (saved) {
        if (regInput) regInput.value = saved.registration || '';
        if (modelInput) modelInput.value = saved.model || '';
        if (locInput) locInput.value = saved.location || '';
    }

    // Events (debounced)
    const handler = debounce(applySearchFilters, 120);
    [regInput, modelInput, locInput].forEach(el => {
        if (!el) return;
        el.addEventListener('input', handler);
        el.addEventListener('change', handler);
    });

    const resetBtn = document.getElementById('searchReset');
    const locateBtn = document.getElementById('searchLocate');
    if (resetBtn) resetBtn.addEventListener('click', resetSearch);
    if (locateBtn) locateBtn.addEventListener('click', geoAssistSearch);

    // Initial apply
    applySearchFilters();
}

function seedVehicleMetadata() {
    const cards = document.querySelectorAll('.vehicles-grid .vehicle-card-3d');
    const fallbackTags = [
        { model: 'Dacia Duster', regs: ['AA-123-BB', 'DC-908-ZZ'], loc: ['Plateau', 'Abidjan'] },
        { model: 'Renault Captur', regs: ['EE-456-CC', 'RT-221-GH'], loc: ['Cocody', 'Abidjan'] },
        { model: 'Volkswagen Polo', regs: ['WW-789-DD', 'PL-778-KL'], loc: ['Marcory', 'Abidjan'] }
    ];

    cards.forEach((card, idx) => {
        const title = card.querySelector('h3');
        if (!title) return;
        const text = title.textContent || '';
        const meta = fallbackTags[idx] || fallbackTags[0];
        card.dataset.model = normalize(text);
        card.dataset.registrations = meta.regs.join(',');
        card.dataset.locations = meta.loc.join(',');
    });
}

function applySearchFilters() {
    const reg = (document.getElementById('searchRegistration')?.value || '').trim();
    const model = (document.getElementById('searchModel')?.value || '').trim();
    const location = (document.getElementById('searchLocation')?.value || '').trim();

    saveSearch({ registration: reg, model, location });

    const cards = Array.from(document.querySelectorAll('.vehicles-grid .vehicle-card-3d'));
    let visibleCount = 0;

    // Clear previous highlights
    clearHighlights(cards);

    cards.forEach(card => {
        const modelText = card.dataset.model || '';
        const regs = (card.dataset.registrations || '').toLowerCase();
        const locs = (card.dataset.locations || '').toLowerCase();

        const matchesReg = !reg || regs.includes(reg.toLowerCase());
        const matchesModel = !model || modelText.includes(normalize(model));
        const matchesLoc = !location || locs.includes(location.toLowerCase());

        const isMatch = matchesReg && matchesModel && matchesLoc;
        card.style.display = isMatch ? '' : 'none';
        if (isMatch) {
            visibleCount++;
            // Subtle focus animation
            card.style.transform = 'translateY(-12px) scale(1.02)';
            setTimeout(() => { card.style.transform = ''; }, 260);
            // Highlight in title
            const h3 = card.querySelector('h3');
            if (h3) h3.innerHTML = highlightTerms(h3.textContent || '', [reg, model, location]);
        }
    });

    // Empty state
    renderEmptyState(visibleCount === 0);
}

function highlightTerms(text, terms) {
    let result = text;
    terms.filter(Boolean).forEach(term => {
        const safe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(`(${safe})`, 'ig');
        result = result.replace(re, '<mark class="hl">$1</mark>');
    });
    return result;
}

function clearHighlights(cards) {
    cards.forEach(card => {
        const h3 = card.querySelector('h3');
        if (!h3) return;
        h3.innerHTML = (h3.textContent || '').trim();
    });
}

function renderEmptyState(show) {
    const grid = document.querySelector('.vehicles-grid');
    if (!grid) return;
    let empty = grid.parentElement.querySelector('.search-empty');
    if (show) {
        if (!empty) {
            empty = document.createElement('div');
            empty.className = 'search-empty';
            empty.innerHTML = '<i class="fas fa-car-burst"></i><p>Aucun véhicule ne correspond à votre recherche.</p>';
            grid.parentElement.insertBefore(empty, grid.nextSibling);
        }
    } else if (empty) {
        empty.remove();
    }
}

function resetSearch() {
    const regInput = document.getElementById('searchRegistration');
    const modelInput = document.getElementById('searchModel');
    const locInput = document.getElementById('searchLocation');
    if (regInput) regInput.value = '';
    if (modelInput) modelInput.value = '';
    if (locInput) locInput.value = '';
    saveSearch({ registration: '', model: '', location: '' });
    applySearchFilters();
}

function geoAssistSearch() {
    const locInput = document.getElementById('searchLocation');
    if (!navigator.geolocation) {
        showNotification('Géolocalisation non supportée', 'warning');
        return;
    }
    showNotification('Localisation en cours…', 'info');
    navigator.geolocation.getCurrentPosition(
        () => {
            
            if (locInput) locInput.value = 'Abidjan';
            applySearchFilters();
            showNotification('Filtrage sur votre zone approximative', 'success');
        },
        () => {
            showNotification('Impossible d\'obtenir votre position', 'error');
        },
        { enableHighAccuracy: false, maximumAge: 60000, timeout: 6000 }
    );
}

function getSavedSearch() {
    try {
        return JSON.parse(localStorage.getItem('vroom:search') || 'null');
    } catch {
        return null;
    }
}

function saveSearch(values) {
    try {
        localStorage.setItem('vroom:search', JSON.stringify(values));
    } catch { }
}

function debounce(fn, wait) {
    let t;
    return function () {
        clearTimeout(t);
        const args = arguments;
        t = setTimeout(() => fn.apply(this, args), wait);
    }
}

function normalize(str) {
    return (str || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function submitHeroSearch(e) {
    e.preventDefault();
    const reg = document.getElementById('hsReg')?.value || '';
    const model = document.getElementById('hsModel')?.value || '';
    const loc = document.getElementById('hsLoc')?.value || '';

    const regInput = document.getElementById('searchRegistration');
    const modelInput = document.getElementById('searchModel');
    const locInput = document.getElementById('searchLocation');
    if (regInput) regInput.value = reg;
    if (modelInput) modelInput.value = model;
    if (locInput) locInput.value = loc;

    saveSearch({ registration: reg, model, location: loc });
    applySearchFilters();
    scrollToSection('location');
    return false;
}

window.submitHeroSearch = submitHeroSearch;

// ==========================================================================
// Auth Modal Functions
// ==========================================================================

function openAuthModal(mode = 'login') {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        switchAuthTab(mode);
    }
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchAuthTab(tab) {
    const loginTab = document.getElementById('authTabLogin');
    const signupTab = document.getElementById('authTabSignup');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authHint = document.getElementById('authHint');

    if (tab === 'login') {
        loginTab?.classList.add('active');
        signupTab?.classList.remove('active');
        loginForm?.classList.remove('hidden');
        signupForm?.classList.add('hidden');
        if (authHint) {
            authHint.innerHTML = 'Nouveau chez VROOM ? <a href="#" class="auth-link" onclick="switchAuthTab(\'signup\'); event.preventDefault();">Créer un compte</a>';
        }
    } else {
        signupTab?.classList.add('active');
        loginTab?.classList.remove('active');
        signupForm?.classList.remove('hidden');
        loginForm?.classList.add('hidden');
        if (authHint) {
            authHint.innerHTML = 'Déjà membre ? <a href="#" class="auth-link" onclick="switchAuthTab(\'login\'); event.preventDefault();">Se connecter</a>';
        }
    }
}

async function socialAuth(provider) {
    showNotification(`🔐 Connexion avec ${provider === 'google' ? 'Google' : 'Apple'} en cours...`, 'info');
    await new Promise(resolve => setTimeout(resolve, 1500));
    showNotification(`✅ Connexion réussie!`, 'success');
    setTimeout(() => closeAuthModal(), 1000);
}

function startPasswordReset(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail')?.value;
    if (!email) {
        showNotification('Veuillez entrer votre email d\'abord', 'warning');
        return;
    }
    showNotification(`📧 Instructions envoyées à ${email}`, 'success');
}

// Login form handler
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.btn-submit');
    
    submitBtn.classList.add('loading');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');
    
    setTimeout(() => {
        submitBtn.classList.remove('success');
        showNotification('🎉 Connexion réussie! Bienvenue sur VROOM', 'success');
        this.reset();
        closeAuthModal();
    }, 1000);
});

// Signup form handler
document.getElementById('signupForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.btn-submit');
    
    submitBtn.classList.add('loading');
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    submitBtn.classList.remove('loading');
    submitBtn.classList.add('success');
    
    setTimeout(() => {
        submitBtn.classList.remove('success');
        showNotification('🎉 Compte créé avec succès! Bienvenue sur VROOM', 'success');
        this.reset();
        closeAuthModal();
    }, 1000);
});

// Export auth functions globally
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthTab = switchAuthTab;
window.socialAuth = socialAuth;
window.startPasswordReset = startPasswordReset;