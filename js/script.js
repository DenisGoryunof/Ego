// script.js (дополненный)
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollToTop();
    initSmoothScroll();
    initLazyLoading();
    initCurrentPage();
    initHeaderScroll();
    initErrorHandling();
});

// Новая функция для обработки ошибок
function initErrorHandling() {
    // Проверка поддержки Service Worker для кеширования
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }
    
    // Обработка offline режима
    window.addEventListener('online', function() {
        showNotification('Соединение восстановлено', 'success');
    });
    
    window.addEventListener('offline', function() {
        showNotification('Отсутствует интернет-соединение', 'error');
    });
    
    // Перехват ошибок AJAX запросов
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        return originalFetch.apply(this, args)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response;
            })
            .catch(error => {
                console.error('Fetch error:', error);
                throw error;
            });
    };
}

// Функция для показа уведомлений
function showNotification(message, type = 'success') {
    // Убедимся, что стили для уведомлений добавлены
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 350px;
                backdrop-filter: blur(10px);
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification.success {
                background: rgba(76, 175, 80, 0.9);
            }
            .notification.error {
                background: rgba(244, 67, 54, 0.9);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        `;
        document.head.appendChild(styles);
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}


// Обработчик формы подписки
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Здесь отправка email на сервер
                console.log('Email подписки:', email);
                
                showNotification('Спасибо за подписку! Проверьте вашу почту.', 'success');
                this.reset();
            }
        });
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initNewsletterForm();
});

// Проверка существования элементов перед добавлением обработчиков
function safeAddEventListener(selector, event, handler) {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener(event, handler);
    }
}

// Запасная функция уведомлений
if (typeof showNotification === 'undefined') {
    window.showNotification = function(message, type) {
        console.log(`${type}: ${message}`);
    };
}


// Инициализация мобильного меню
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Закрытие меню при клике на ссылку
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Закрытие меню при клике вне его области
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && 
                !e.target.closest('.main-nav') && 
                !e.target.closest('.menu-toggle')) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Анимация появления элементов при скролле
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Инициализация плавающих кнопок
function initFloatingButtons() {
    const floatingButtons = document.querySelector('.floating-button');
    if (!floatingButtons) {
        // Создаем плавающие кнопки если их нет
        const floatingDiv = document.createElement('div');
        floatingDiv.className = 'floating-button';
        floatingDiv.innerHTML = `
            <a href="tel:+79780000000" class="call-button">
                <i class="fas fa-phone"></i>
            </a>
            <a href="https://wa.me/79780000000" class="whatsapp-button" target="_blank">
                <i class="fab fa-whatsapp"></i>
            </a>
            <a href="https://t.me/egosevastopol" class="telegram-button" target="_blank">
                <i class="fab fa-telegram"></i>
            </a>
        `;
        document.body.appendChild(floatingDiv);
    }
}

// Добавление классов анимации к элементам
function addAnimationClasses() {
    // Добавляем классы для анимации
    const elementsToAnimate = [
        '.service-card',
        '.advantage', 
        '.gallery-item',
        '.review-card',
        '.team-member',
        '.testimonial'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.classList.add('reveal');
            element.style.transitionDelay = `${index * 0.1}s`;
        });
    });
}

// Инициализация всех анимаций
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initScrollAnimations();
    initFloatingButtons();
    addAnimationClasses();
    
    // Добавляем Font Awesome если нет
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(faLink);
    }
});

// Обработчик resize для меню
window.addEventListener('resize', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (window.innerWidth > 768 && mainNav) {
        mainNav.classList.remove('active');
        if (menuToggle) menuToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});