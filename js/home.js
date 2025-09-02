// Скрипты для главной страницы
document.addEventListener('DOMContentLoaded', function() {
    // Слайдер отзывов
    initTestimonialsSlider();
    
    // Анимации при скролле
    initScrollAnimations();
});

function initTestimonialsSlider() {
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (!testimonialSlider) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    testimonialSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - testimonialSlider.offsetLeft;
        scrollLeft = testimonialSlider.scrollLeft;
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    testimonialSlider.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    testimonialSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimonialSlider.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialSlider.scrollLeft = scrollLeft - walk;
    });
    
    // Автопрокрутка для мобильных устройств
    if (window.innerWidth <= 768) {
        let scrollAmount = 0;
        const slideWidth = 300;
        
        setInterval(() => {
            testimonialSlider.scrollLeft += slideWidth;
            scrollAmount += slideWidth;
            
            if (scrollAmount >= testimonialSlider.scrollWidth - testimonialSlider.clientWidth) {
                testimonialSlider.scrollLeft = 0;
                scrollAmount = 0;
            }
        }, 4000);
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами, которые должны анимироваться
    document.querySelectorAll('.service-card, .advantage, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}