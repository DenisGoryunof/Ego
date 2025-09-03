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