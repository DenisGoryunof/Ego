// error-handler.js
// Глобальный обработчик ошибок JavaScript
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    
    // Отправка ошибок в Analytics (если подключен)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'js_error', {
            'error_message': e.error?.message || 'Unknown error',
            'error_file': e.filename,
            'error_line': e.lineno,
            'error_column': e.colno
        });
    }
});

// Обработчик ошибок для Promise
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', 'promise_error', {
            'error_message': e.reason?.message || 'Unknown promise rejection'
        });
    }
});

// Мониторинг загрузки ресурсов
function monitorResourceLoading() {
    if (performance && performance.getEntriesByType) {
        try {
            const resources = performance.getEntriesByType('resource');
            const failedResources = resources.filter(resource => {
                return resource.responseStatus > 0;
            });
            
            if (failedResources.length > 0 && typeof gtag !== 'undefined') {
                gtag('event', 'resource_load_error', {
                    'failed_count': failedResources.length,
                    'resources': failedResources.map(r => r.name).join(', ')
                });
            }
        } catch (error) {
            console.warn('Resource monitoring error:', error);
        }
    }
}

// Запуск мониторинга после загрузки страницы
window.addEventListener('load', function() {
    setTimeout(monitorResourceLoading, 1000);
});

// Функция для проверки broken links
function checkBrokenLinks() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Проверяем только внутренние ссылки
            if (href && (href.startsWith('/') || href.startsWith(window.location.origin))) {
                // Пропускаем якорные ссылки
                if (href.includes('#')) return;
                
                fetch(href, { method: 'HEAD' })
                    .then(response => {
                        if (!response.ok) {
                            console.warn('Broken link detected:', href);
                            
                            if (typeof gtag !== 'undefined') {
                                gtag('event', 'broken_link', {
                                    'link_url': href,
                                    'link_text': this.textContent.trim().substring(0, 50)
                                });
                            }
                        }
                    })
                    .catch(error => {
                        console.warn('Link check failed:', href, error);
                    });
            }
        });
    });
}

// Запуск проверки ссылок
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkBrokenLinks, 2000);
});

// Обработка offline режима
window.addEventListener('online', function() {
    showNotification('Соединение восстановлено', 'success');
});

window.addEventListener('offline', function() {
    showNotification('Отсутствует интернет-соединение', 'error');
});

// Универсальная функция уведомлений
function showNotification(message, type = 'success') {
    // Проверяем, есть ли уже стили для уведомлений
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