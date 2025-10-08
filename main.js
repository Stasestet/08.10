// Typed.js initialization
document.addEventListener('DOMContentLoaded', function() {
    // Remove Typed.js initialization as we now have static title
    // The typed text element has been replaced with static title "Ключ на 17"

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add click handlers for buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Записаться') || this.textContent.includes('Позвонить')) {
                e.preventDefault();
                showComingSoon();
            }
        });
    });
});

// Price calculator
const servicePrices = {
    diagnostic: { base: 500, multiplier: { bmw: 1.5, mercedes: 1.6, audi: 1.4, volkswagen: 1.2, toyota: 1.1, honda: 1.1, ford: 1.2, other: 1.0 } },
    oil: { base: 750, multiplier: { bmw: 1.3, mercedes: 1.4, audi: 1.3, volkswagen: 1.2, toyota: 1.0, honda: 1.0, ford: 1.1, other: 1.0 } },
    brakes: { base: 1200, multiplier: { bmw: 1.4, mercedes: 1.5, audi: 1.4, volkswagen: 1.3, toyota: 1.1, honda: 1.1, ford: 1.2, other: 1.0 } },
    engine: { base: 20000, multiplier: { bmw: 1.6, mercedes: 1.7, audi: 1.5, volkswagen: 1.4, toyota: 1.2, honda: 1.2, ford: 1.3, other: 1.0 } },
    suspension: { base: 2500, multiplier: { bmw: 1.3, mercedes: 1.4, audi: 1.3, volkswagen: 1.2, toyota: 1.0, honda: 1.0, ford: 1.1, other: 1.0 } },
    transmission: { base: 15000, multiplier: { bmw: 1.5, mercedes: 1.6, audi: 1.5, volkswagen: 1.3, toyota: 1.2, honda: 1.2, ford: 1.3, other: 1.0 } }
};

function calculatePrice() {
    const serviceType = document.getElementById('serviceType').value;
    const carBrand = document.getElementById('carBrand').value;
    const workVolume = parseInt(document.getElementById('workVolume').value);
    
    if (!serviceType || !carBrand) {
        showNotification('Пожалуйста, выберите тип услуги и марку автомобиля', 'warning');
        return;
    }
    
    const service = servicePrices[serviceType];
    const multiplier = service.multiplier[carBrand] || 1.0;
    const volumeMultiplier = 0.5 + (workVolume * 0.3); // 0.8 to 2.0
    
    const finalPrice = Math.round(service.base * multiplier * volumeMultiplier);
    
    // Animate price change
    const priceDisplay = document.getElementById('priceDisplay');
    anime({
        targets: priceDisplay,
        innerHTML: [0, finalPrice],
        duration: 1000,
        round: 1,
        easing: 'easeOutExpo',
        update: function(anim) {
            priceDisplay.innerHTML = Math.round(anim.animatables[0].target.innerHTML) + ' ₽';
        }
    });
    
    // Add pulse effect
    priceDisplay.classList.add('pulse-orange');
    setTimeout(() => {
        priceDisplay.classList.remove('pulse-orange');
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300 ${
        type === 'warning' ? 'bg-yellow-600' : 
        type === 'error' ? 'bg-red-600' : 
        'bg-blue-600'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${
                type === 'warning' ? 'fa-exclamation-triangle' :
                type === 'error' ? 'fa-exclamation-circle' :
                'fa-info-circle'
            } mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function showComingSoon() {
    showNotification('Функция скоро будет доступна! Спасибо за интерес к нашему сервису.', 'info');
}

// Add hover effects for service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
});

// Add click handlers for service buttons
document.addEventListener('DOMContentLoaded', function() {
    const serviceButtons = document.querySelectorAll('.service-card button');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            showNotification(`Переход к услуге: ${serviceName}. Страница услуг скоро будет доступна!`, 'info');
        });
    });
});

// Add scroll-triggered animations for sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll('.service-card, .calculator-section, .text-center');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        anime({
                            targets: el,
                            opacity: [0, 1],
                            translateY: [30, 0],
                            duration: 600,
                            easing: 'easeOutQuad'
                        });
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Add click handler for calculator button
document.addEventListener('DOMContentLoaded', function() {
    const calculatorBtn = document.querySelector('.calculator-section button');
    if (calculatorBtn) {
        calculatorBtn.addEventListener('click', function() {
            if (this.textContent.includes('Записаться')) {
                showNotification('Запись на диагностику скоро будет доступна!', 'info');
            }
        });
    }
});

// Add parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
    }
});


/* Banner form functions - added by assistant */
function openBanner() {
    const overlay = document.getElementById('formOverlay');
    const card = document.getElementById('bannerCard');
    overlay.classList.remove('hidden');
    // allow time for overlay to render
    setTimeout(() => {
        card.classList.add('translate-y-0');
        card.style.transform = 'translateY(0)';
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeBanner() {
    const overlay = document.getElementById('formOverlay');
    const card = document.getElementById('bannerCard');
    card.style.transform = 'translateY(100%)';
    setTimeout(() => overlay.classList.add('hidden'), 300);
    document.body.style.overflow = '';
}

// Attach events when DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // open-form triggers
    document.querySelectorAll('.open-form').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            openBanner();
        });
    });
    // close button and overlay click
    const closeBtn = document.getElementById('closeBannerBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeBanner);
    const overlay = document.getElementById('formOverlay');
    if (overlay) overlay.addEventListener('click', closeBanner);

    // form submit
    const form = document.getElementById('bannerForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var phone = document.getElementById('bannerPhone').value.trim();
            if (!phone) {
                alert('Пожалуйста, укажите номер телефона.');
                return;
            }
            // show success message briefly then close
            var success = document.getElementById('bannerSuccess');
            success.classList.remove('hidden');
            setTimeout(function() {
                success.classList.add('hidden');
                form.reset();
                closeBanner();
                alert('Спасибо! Мы скоро свяжемся с вами.');
            }, 1500);
        });
    }
});
