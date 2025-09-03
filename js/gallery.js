// gallery.js
document.addEventListener('DOMContentLoaded', function() {
    initGalleryFilters();
    initLightbox();
    initLazyLoadingGallery();
});

// Фильтрация галереи
function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Лайтбокс
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img" src="" alt="">
            <div class="lightbox-nav">
                <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
                <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => ({
        src: item.querySelector('img').src,
        alt: item.querySelector('img').alt
    }));
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            currentIndex = index;
            openLightbox(currentIndex);
        });
    });
    
    function openLightbox(index) {
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        lightboxImg.src = images[index].src;
        lightboxImg.alt = images[index].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Закрытие лайтбокса
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Навигация
    lightbox.querySelector('.lightbox-prev').addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    });
    
    lightbox.querySelector('.lightbox-next').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox-prev').click();
        if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox-next').click();
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Ленивая загрузка для галереи
function initLazyLoadingGallery() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px',
            threshold: 0.1
        });
        
        galleryImages.forEach(img => {
            if (img.hasAttribute('data-src')) {
                observer.observe(img);
            }
        });
    }
}