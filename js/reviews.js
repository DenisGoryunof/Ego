// reviews.js
document.addEventListener('DOMContentLoaded', function() {
    initReviewForm();
    initRatingStars();
    initReviewAnimations();
});

// Форма отзыва
function initReviewForm() {
    const reviewForm = document.querySelector('.review-form');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                service: this.querySelector('select').value,
                message: this.querySelector('textarea').value,
                rating: this.querySelector('.star.active')?.getAttribute('data-value') || 0
            };
            
            if (formData.rating === 0) {
                showNotification('Пожалуйста, выберите оценку', 'error');
                return;
            }
            
            // Здесь отправка данных на сервер
            console.log('Отзыв отправлен:', formData);
            
            showNotification('Спасибо за ваш отзыв! Он появится после модерации.', 'success');
            this.reset();
            resetStars();
        });
    }
}

// Рейтинг звездами
function initRatingStars() {
    const stars = document.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-value');
            
            // Убираем активный класс у всех звезд
            stars.forEach(s => s.classList.remove('active'));
            
            // Добавляем активный класс выбранной и всем предыдущим
            stars.forEach(s => {
                if (s.getAttribute('data-value') >= rating) {
                    s.classList.add('active');
                }
            });
        });
        
        // Эффект при наведении
        star.addEventListener('mouseenter', function() {
            const rating = this.getAttribute('data-value');
            
            stars.forEach(s => {
                s.style.color = s.getAttribute('data-value') <= rating ? '#ffd700' : '#ddd';
            });
        });
        
        star.addEventListener('mouseleave', function() {
            stars.forEach(s => {
                s.style.color = s.classList.contains('active') ? '#ffd700' : '#ddd';
            });
        });
    });
}

function resetStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.classList.remove('active');
        star.style.color = '#ddd';
    });
}

// Анимация отзывов
function initReviewAnimations() {
    const reviewCards = document.querySelectorAll('.review-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    reviewCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
}

// Уведомления
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}