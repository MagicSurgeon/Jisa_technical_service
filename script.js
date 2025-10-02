// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    initLoader();
    
    // Initialize all functionality after loader
    setTimeout(() => {
        initNavigation();
        initScrollAnimations();
        initCounterAnimations();
        initContactForm();
        initSmoothScrolling();
        initParallaxEffects();
        initGallery(); // Add gallery initialization
    }, 100);
});

// Loader functionality
function initLoader() {
    const loader = document.getElementById('loader');
    const progressFill = document.querySelector('.progress-fill');
    const loadingText = document.querySelector('.loading-text');
    
    const loadingMessages = [
        'Loading Excellence...',
        'Preparing Services...',
        'Initializing Quality...',
        'Almost Ready...'
    ];
    
    let messageIndex = 0;
    
    // Change loading text
    const textInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        loadingText.textContent = loadingMessages[messageIndex];
    }, 800);
    
    // Hide loader after animation completes
    setTimeout(() => {
        clearInterval(textInterval);
        loader.classList.add('hidden');
        
        // Remove loader from DOM after transition
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 3200);
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Active link highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for service cards
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    const currentIndex = Array.from(cards).indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, currentIndex * 100);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.section-title, .section-line, .section-subtitle, .service-card, .supply-item, .testimonial-card, .gallery-item, .fade-in, .slide-in-left, .slide-in-right, .scale-in'
    );
    
    animateElements.forEach(el => observer.observe(el));

    // Add animation classes to elements
    document.querySelectorAll('.about-text').forEach(el => el.classList.add('slide-in-left'));
    document.querySelectorAll('.about-image').forEach(el => el.classList.add('slide-in-right'));
    document.querySelectorAll('.contact-info').forEach(el => el.classList.add('slide-in-left'));
    document.querySelectorAll('.contact-form').forEach(el => el.classList.add('slide-in-right'));
    document.querySelectorAll('.location-info').forEach(el => el.classList.add('slide-in-left'));
    document.querySelectorAll('.location-map').forEach(el => el.classList.add('slide-in-right'));
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Form field animations
    const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Loading animation
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
        <p>Loading...</p>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        color: white;
    `;
    
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #333;
            border-top: 5px solid #ff6b35;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(spinnerStyle);
    document.body.appendChild(loader);
    
    return loader;
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Enhanced scroll performance
const optimizedScroll = throttle(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    
    // Update progress indicator if exists
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    // Parallax effects for performance
    requestAnimationFrame(() => {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScroll);

// Intersection Observer for better performance
const createObserver = (callback, options = {}) => {
    const defaultOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Lazy loading for images (if any are added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = createObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service
});

// Performance monitoring
window.addEventListener('load', () => {
    setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
    }, 0);
});

// Accessibility enhancements
document.addEventListener('keydown', (e) => {
    // Skip to main content with Tab key
    if (e.key === 'Tab' && !e.shiftKey) {
        const focusableElements = document.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        
        // Add focus indicators
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid #ff6b35';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = 'none';
            });
        });
    }
});

// Dark mode toggle (optional feature)
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #ff6b35;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Save preference
        localStorage.setItem('darkMode', isDark);
    });
    
    // Load saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    document.body.appendChild(darkModeToggle);
}

// Initialize dark mode (uncomment if desired)
// initDarkMode();

// Map loading verification
function initMapVerification() {
    const mapIframe = document.querySelector('.google-map iframe');
    
    if (mapIframe) {
        mapIframe.addEventListener('load', () => {
            console.log('Google Maps loaded successfully');
        });
        
        mapIframe.addEventListener('error', (e) => {
            console.error('Error loading Google Maps:', e);
            // Show fallback message
            const mapContainer = document.querySelector('.google-map');
            mapContainer.innerHTML = `
                <div style="height: 400px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; flex-direction: column; border-radius: 15px;">
                    <i class="fas fa-map-marker-alt" style="font-size: 3rem; color: #ff6b35; margin-bottom: 1rem;"></i>
                    <p style="color: #666; text-align: center; margin-bottom: 1rem;">Unable to load map</p>
                    <a href="https://www.google.com/maps/place/Jisa+Technical+Services/@25.44214562173429,55.537161676213756,17z" target="_blank" class="btn btn-primary">View on Google Maps</a>
                </div>
            `;
        });
        
        // Check if iframe is blocked
        setTimeout(() => {
            try {
                if (mapIframe.contentDocument === null) {
                    console.log('Map iframe may be blocked by browser security settings');
                }
            } catch (e) {
                // This is expected due to cross-origin restrictions
            }
        }, 3000);
    }
}

// Enhanced Gallery functionality
function initGallery() {
    console.log('Initializing gallery...');
    
    // Wait for DOM to be fully loaded
    setTimeout(() => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const modal = document.getElementById('galleryModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const closeModal = document.querySelector('.close-modal');

        console.log('Gallery items found:', galleryItems.length);
        console.log('Filter buttons found:', filterButtons.length);

        // Ensure all elements are visible initially
        galleryItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
            item.style.display = 'block';
            item.classList.remove('hidden');
        });

        // Filter functionality - simplified and robust
        filterButtons.forEach((button, index) => {
            console.log(`Setting up button ${index}:`, button.textContent, button.getAttribute('data-filter'));
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Button clicked:', this.textContent);
                
                const filter = this.getAttribute('data-filter');
                console.log('Filter:', filter);

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter gallery items
                filterGalleryItems(filter);
            });
        });

        function filterGalleryItems(filter) {
            console.log('Filtering with:', filter);
            
            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                console.log(`Item ${index}: category="${category}", filter="${filter}"`);

                if (filter === 'all' || category === filter) {
                    // Show item
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, index * 50);
                    console.log(`Showing item ${index}`);
                } else {
                    // Hide item
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px) scale(0.95)';
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                    console.log(`Hiding item ${index}`);
                }
            });
        }

        // Modal functionality
        let currentImageIndex = 0;
        const galleryImages = Array.from(galleryItems);

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                console.log('Gallery item clicked:', index);
                
                const image = item.querySelector('img');
                const title = item.querySelector('h3');
                const description = item.querySelector('p');
                const features = Array.from(item.querySelectorAll('.feature-tag'));

                if (image && title && description && modal && modalImage && modalTitle && modalDescription) {
                    modalImage.src = image.src;
                    modalImage.alt = image.alt;
                    modalTitle.textContent = title.textContent;
                    modalDescription.textContent = description.textContent;

                    // Add features to modal
                    updateModalFeatures(features.map(tag => tag.textContent));

                    currentImageIndex = index;
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';

                    // Add navigation info
                    updateModalNavigationInfo(index);
                }
            });
        });

        // Modal close functionality
        function closeGalleryModal() {
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
                // Remove navigation info
                const navInfo = document.querySelector('.modal-nav-info');
                if (navInfo) navInfo.remove();
            }
        }

        if (closeModal) {
            closeModal.addEventListener('click', closeGalleryModal);
        }

        // Close modal on background click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeGalleryModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!modal || !modal.classList.contains('show')) return;

            switch(e.key) {
                case 'Escape':
                    closeGalleryModal();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    navigateGallery(-1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    navigateGallery(1);
                    break;
            }
        });

        // Gallery navigation function
        function navigateGallery(direction) {
            const visibleItems = galleryImages.filter(item => !item.classList.contains('hidden'));
            currentImageIndex = (currentImageIndex + direction + visibleItems.length) % visibleItems.length;

            const targetItem = visibleItems[currentImageIndex];
            if (targetItem) {
                targetItem.click();
            }
        }

        function updateModalFeatures(features) {
            if (!modalTitle) return;
            
            // Remove existing features
            const existingFeatures = document.querySelector('.modal-features');
            if (existingFeatures) existingFeatures.remove();

            if (features.length > 0) {
                const featuresContainer = document.createElement('div');
                featuresContainer.className = 'modal-features';
                featuresContainer.style.cssText = `
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                    justify-content: center;
                `;

                features.forEach(feature => {
                    const featureElement = document.createElement('span');
                    featureElement.className = 'modal-feature-tag';
                    featureElement.textContent = feature;
                    featureElement.style.cssText = `
                        background: rgba(255, 107, 53, 0.2);
                        backdrop-filter: blur(10px);
                        padding: 0.3rem 0.8rem;
                        border-radius: 15px;
                        font-size: 0.8rem;
                        font-family: 'Orbitron', monospace;
                        font-weight: 600;
                        letter-spacing: 0.5px;
                        border: 1px solid rgba(255, 107, 53, 0.3);
                        color: var(--white);
                    `;
                    featuresContainer.appendChild(featureElement);
                });

                modalTitle.parentNode.appendChild(featuresContainer);
            }
        }

        function updateModalNavigationInfo(currentIndex) {
            if (!modal) return;
            
            // Remove existing nav info
            const existingNav = document.querySelector('.modal-nav-info');
            if (existingNav) existingNav.remove();

            const navInfo = document.createElement('div');
            navInfo.className = 'modal-nav-info';
            navInfo.style.cssText = `
                position: absolute;
                top: 2rem;
                left: 2rem;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(10px);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-family: 'Orbitron', monospace;
                font-size: 0.9rem;
                color: var(--white);
            `;

            const visibleItems = galleryImages.filter(item => !item.classList.contains('hidden'));
            navInfo.textContent = `${currentIndex + 1} / ${visibleItems.length}`;

            modal.appendChild(navInfo);
        }

        // Image loading states
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            if (!img) return;

            img.addEventListener('loadstart', () => {
                item.classList.add('loading');
            });

            img.addEventListener('load', () => {
                item.classList.remove('loading');
            });

            img.addEventListener('error', () => {
                item.classList.remove('loading');
                // Show fallback image
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik00MDAgMjUwTDM1MCAyMDBINDUwTDQwMCAyNTBaIiBmaWxsPSIjZmY2YjM1Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiPkltYWdlIE5vdCBBdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
                img.alt = 'Image not available';
            });
        });

        // Add modal navigation arrows
        if (modal) {
            addModalNavigationArrows();
        }

        function addModalNavigationArrows() {
            // Remove existing arrows
            const existingArrows = modal.querySelectorAll('.modal-nav-arrow');
            existingArrows.forEach(arrow => arrow.remove());

            const prevArrow = document.createElement('button');
            prevArrow.innerHTML = '‹';
            prevArrow.className = 'modal-nav-arrow modal-nav-prev';
            prevArrow.style.cssText = `
                position: absolute;
                top: 50%;
                left: 2rem;
                transform: translateY(-50%);
                background: rgba(255, 107, 53, 0.8);
                backdrop-filter: blur(10px);
                border: none;
                color: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 2rem;
                transition: all 0.3s ease;
                opacity: 0.7;
                z-index: 1002;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            const nextArrow = document.createElement('button');
            nextArrow.innerHTML = '›';
            nextArrow.className = 'modal-nav-arrow modal-nav-next';
            nextArrow.style.cssText = `
                position: absolute;
                top: 50%;
                right: 2rem;
                transform: translateY(-50%);
                background: rgba(255, 107, 53, 0.8);
                backdrop-filter: blur(10px);
                border: none;
                color: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 2rem;
                transition: all 0.3s ease;
                opacity: 0.7;
                z-index: 1002;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            modal.appendChild(prevArrow);
            modal.appendChild(nextArrow);

            // Navigation arrow hover effects
            [prevArrow, nextArrow].forEach(arrow => {
                arrow.addEventListener('mouseenter', () => {
                    arrow.style.opacity = '1';
                    arrow.style.transform = 'translateY(-50%) scale(1.1)';
                    arrow.style.background = 'rgba(255, 107, 53, 1)';
                });

                arrow.addEventListener('mouseleave', () => {
                    arrow.style.opacity = '0.7';
                    arrow.style.transform = 'translateY(-50%) scale(1)';
                    arrow.style.background = 'rgba(255, 107, 53, 0.8)';
                });
            });

            // Navigation arrow click handlers
            prevArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateGallery(-1);
            });
            
            nextArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                navigateGallery(1);
            });
        }

        console.log('Gallery initialization complete');
    }, 100);
}
