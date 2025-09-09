// Замените все тексты "Записаться на прием" на "Записаться на процедуру"
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем тексты кнопок
    const bookingButtons = document.querySelectorAll('.btn');
    bookingButtons.forEach(button => {
        if (button.textContent.includes('Записаться на прием')) {
            button.textContent = 'Записаться на процедуру';
        }
    });
    
    // Обновляем placeholder в select
    const serviceSelects = document.querySelectorAll('select');
    serviceSelects.forEach(select => {
        const option = select.querySelector('option[disabled]');
        if (option && option.textContent.includes('прием')) {
            option.textContent = 'Выберите услугу';
        }
    });
});