// Performance optimized script with modern JavaScript
document.addEventListener("DOMContentLoaded", () => {
    // Quote loading with error handling
    loadRandomQuote();
    
    // Skill bar animations
    animateSkillBars();
    
    // Smooth scroll behavior for better UX
    initSmoothScrolling();
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }
});

// Optimized quote loading function
async function loadRandomQuote() {
    try {
        const response = await fetch('assets/quotes.json');
        if (!response.ok) throw new Error('Failed to load quotes');
        
        const data = await response.json();
        const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        
        // Use requestAnimationFrame for smooth DOM updates
        requestAnimationFrame(() => {
            const quoteText = document.querySelector(".quote-text");
            const quoteAuthor = document.querySelector(".quote-author");
            
            if (quoteText && quoteAuthor) {
                quoteText.textContent = `"${randomQuote.quote}"`;
                quoteAuthor.textContent = `- ${randomQuote.author}`;
            }
        });
    } catch (error) {
        console.warn('Quote loading failed:', error);
        // Fallback quote is already in HTML
    }
}

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target;
                const width = skillLevel.style.width;
                
                // Reset and animate
                skillLevel.style.width = '0%';
                requestAnimationFrame(() => {
                    skillLevel.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    skillLevel.style.width = width;
                });
                
                observer.unobserve(skillLevel);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Enhanced smooth scrolling
function initSmoothScrolling() {
    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);
    
    // Update scroll progress
    let ticking = false;
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollProgress);
            ticking = true;
        }
    }, { passive: true });
}

// Lazy loading for images (if needed in future)
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Skip to main content with Tab key
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.focus();
            e.preventDefault();
        }
    }
});

// Performance: Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'assets/avatar.jpg',
        'assets/railways.png',
        'assets/rental.png',
        'assets/portfolio.png'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalResources);
} else {
    preloadCriticalResources();
}