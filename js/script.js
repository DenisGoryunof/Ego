// Общие скрипты для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Мобильное меню (если нужно)
    initMobileMenu();
});

function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '☰';
    menuToggle.className = 'menu-toggle';
    menuToggle.style.display = 'none';
    
    const header = document.querySelector('header .container');
    header.appendChild(menuToggle);
    
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Проверяем размер экрана
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            nav.style.display = 'none';
        } else {
            menuToggle.style.display = 'none';
            nav.style.display = 'block';
        }
    }
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}