// Инициализация карты
document.addEventListener('DOMContentLoaded', function() {
    // Создаем элемент script для загрузки API Яндекс.Карт
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=313800e8-70de-41cb-85db-ed97511ea52c&lang=ru_RU';
    script.onload = function() {
        // Инициализация карты после загрузки API
        ymaps.ready(initMap);
    };
    document.head.appendChild(script);
});

function initMap() {
    // Координаты салона красоты Ego (Севастополь, ул. 6-я Бастионная, 40)
    var myMap = new ymaps.Map('map', {
        center: [44.604101, 33.520722],
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl']
    });

    // Добавляем метку
    var myPlacemark = new ymaps.Placemark([44.604101, 33.520722], {
        hintContent: 'Салон красоты Ego',
        balloonContent: `
            <div style="padding: 10px;">
                <h3 style="margin: 0 0 10px 0; color: #6a11cb;">Салон красоты Ego</h3>
                <p style="margin: 5px 0;">ул. 6-я Бастионная, 40, 2й этаж</p>
                <p style="margin: 5px 0;">вход со двора</p>
                <p style="margin: 5px 0;"><strong>Телефон:</strong> +7 (978) 859-03-84</p>
                <a href="tel:+79788590384" style="color: #2575fc; text-decoration: none;">Позвонить</a>
            </div>
        `
    }, {
        // Опции метки
        iconLayout: 'default#image',
        iconImageHref: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMyNTc1RkMiIGZpbGwtb3BhY2l0eT0iMC44Ii8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjgiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==',
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -40],
        balloonCloseButton: true,
        balloonAutoPan: true
    });

    myMap.geoObjects.add(myPlacemark);
    
    // Открываем балун при загрузке
    myPlacemark.balloon.open();
}

function buildRoute() {
    // Запрос геолокации пользователя
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLat = position.coords.latitude;
            var userLon = position.coords.longitude;
            
            // Открываем маршрут от пользователя до салона в Яндекс.Навигаторе
            window.open(`https://yandex.ru/maps/?rtext=${userLat},${userLon}~44.604101,33.520722&rtt=auto`);
        }, function(error) {
            // Если пользователь отказался от геолокации, открываем карту без маршрута
            window.open('https://yandex.ru/maps/?ll=33.520722,44.604101&z=16');
        });
    } else {
        // Если геолокация не поддерживается
        window.open('https://yandex.ru/maps/?ll=33.520722,44.604101&z=16');
    }
}