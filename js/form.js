// Обработка форм
document.addEventListener('DOMContentLoaded', function() {
    initForms();
});

function initForms() {
    // Обработка формы записи
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, 'Бронирование');
        });
    }
    
    // Обработка формы контактов
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, 'Контактная форма');
        });
    }
    
    // Валидация телефона
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^\d\+]/g, '');
        });
    });
}

function handleFormSubmit(form, formName) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Здесь должна быть логика отправки данных на сервер
    // Для GitHub Pages можно использовать Formspree или аналогичный сервис
    
    console.log(`${formName} данные:`, data);
    
    // Показываем сообщение об успехе
    showSuccessMessage('Спасибо! Мы свяжемся с вами в ближайшее время.');
    
    // Очищаем форму
    form.reset();
}

function showSuccessMessage(message) {
    // Создаем элемент для сообщения
    const messageEl = document.createElement('div');
    messageEl.className = 'success-message';
    messageEl.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <p>${message}</p>
        </div>
    `;
    
    // Добавляем стили
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(messageEl);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}