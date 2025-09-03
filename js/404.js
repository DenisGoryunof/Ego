// 404.js
document.addEventListener('DOMContentLoaded', function() {
    init404Page();
    initErrorSearch();
});

function init404Page() {
    // Логирование ошибки 404
    console.warn('404 Error: Page not found -', window.location.href);
    
    // Отправка данных в Analytics (если есть)
    if (typeof gtag !== 'undefined') {
        gtag('event', '404_error', {
            'page_location': window.location.href,
            'page_path': window.location.pathname
        });
    }
    
    // Показать предложения на основе текущего URL
    showRelevantSuggestions();
}

function initErrorSearch() {
    const searchInput = document.getElementById('errorSearch');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchSite();
            }
        });
        
        // Автофокус на поле поиска
        setTimeout(() => {
            searchInput.focus();
        }, 1000);
    }
}

function searchSite() {
    const searchInput = document.getElementById('errorSearch');
    if (!searchInput) return;
    
    const query = searchInput.value.trim();
    
    if (query) {
        // Простой поиск по основным страницам
        const pages = {
            'эпиляция': 'services.html#epilation',
            'загар': 'services.html#tan',
            'маникюр': 'services.html#nails',
            'педикюр': 'services.html#nails',
            'услуги': 'services.html',
            'галерея': 'gallery.html',
            'отзывы': 'reviews.html',
            'контакты': 'contact.html',
            'о нас': 'about.html',
            'главная': 'index.html'
        };
        
        const lowerQuery = query.toLowerCase();
        let foundPage = null;
        
        // Поиск точного совпадения
        for (const [key, value] of Object.entries(pages)) {
            if (lowerQuery.includes(key)) {
                foundPage = value;
                break;
            }
        }
        
        if (foundPage) {
            window.location.href = foundPage;
        } else {
            // Если не найдено, показать подсказку
            showNotification('Страница не найдена. Попробуйте другой запрос.', 'error');
        }
    }
}

function showRelevantSuggestions() {
    const path = window.location.pathname.toLowerCase();
    const suggestions = {
        'epilation': 'Лазерная эпиляция',
        'tan': 'Моментальный загар',
        'nails': 'Маникюр и педикюр',
        'gallery': 'Галерея работ',
        'reviews': 'Отзывы клиентов',
        'about': 'О нашем салоне',
        'contact': 'Контакты и карта'
    };
    
    let relevantSuggestion = null;
    
    for (const [key, value] of Object.entries(suggestions)) {
        if (path.includes(key)) {
            relevantSuggestion = value;
            break;
        }
    }
    
    if (relevantSuggestion) {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'relevant-suggestion';
        suggestionElement.innerHTML = `
            <p>Возможно, вы искали: <strong>${relevantSuggestion}</strong></p>
        `;
        
        const errorContent = document.querySelector('.error-content');
        if (errorContent) {
            const errorActions = errorContent.querySelector('.error-actions');
            if (errorActions) {
                errorContent.insertBefore(suggestionElement, errorActions);
            }
        }
    }
}

// Уведомления для 404 страницы
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Стили для уведомлений
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
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification.success {
                background: #4CAF50;
            }
            .notification.error {
                background: #f44336;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}