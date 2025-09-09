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
    // Правильные координаты салона красоты Ego (Севастополь, ул. 6-я Бастионная, 40)
    var myMap = new ymaps.Map('map', {
        center: [44.604007, 33.513197],
        zoom: 17,
        controls: ['zoomControl', 'fullscreenControl']
    });

    // Создаем кастомную иконку в стиле сайта
    var myPlacemark = new ymaps.Placemark([44.604007, 33.513197], {
        hintContent: 'Салон красоты Ego',
        balloonContent: `
            <div style="padding: 15px; max-width: 250px;">
                <h3 style="margin: 0 0 12px 0; color: #6a11cb; font-family: 'Playfair Display', serif;">Салон красоты Ego</h3>
                <p style="margin: 8px 0; color: #333;">
                    <i class="fas fa-map-marker-alt" style="color: #2575fc; width: 16px;"></i>
                    ул. 6-я Бастионная, 40, 2й этаж
                </p>
                <p style="margin: 8px 0; color: #666; font-size: 14px;">вход со двора</p>
                <p style="margin: 8px 0; color: #333;">
                    <i class="fas fa-phone" style="color: #2575fc; width: 16px;"></i>
                    <a href="tel:+79788590384" style="color: #2575fc; text-decoration: none;">+7 (978) 859-03-84</a>
                </p>
                <div style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee;">
                    <a href="#booking" style="background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); 
                    color: white; padding: 8px 16px; border-radius: 25px; text-decoration: none; 
                    display: inline-block; font-size: 14px;">Записаться</a>
                </div>
            </div>
        `
    }, {
        // Опции метки в стиле сайта
        iconLayout: 'default#image',
        iconImageHref: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9InVybCgjcGFpbnQwX2FuZ3VsYXIpIi8+CjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjEwIiBmaWxsPSJ3aGl0ZSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfYW5ndWxhciIgeDE9IjI1IiB5MT0iMCIgeDI9IjI1IiB5Mj0iNTAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzZhMTFDQiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyNTc1RkMiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4=',
        iconImageSize: [50, 50],
        iconImageOffset: [-25, -50],
        balloonCloseButton: true,
        balloonAutoPan: true,
        balloonPanelMaxMapArea: 0
    });

    myMap.geoObjects.add(myPlacemark);
    
    // Открываем балун при загрузке
    myPlacemark.balloon.open();
    
    // Добавляем кастомные элементы управления
    myMap.controls.add('routeButtonControl', {
        position: {top: 10, right: 10}
    });
}

function buildRoute() {
    // Запрос геолокации пользователя
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLat = position.coords.latitude;
            var userLon = position.coords.longitude;
            
            // Открываем маршрут от пользователя до салона в Яндекс.Навигаторе
            window.open(`https://yandex.ru/maps/?rtext=${userLat},${userLon}~44.604007,33.513197&rtt=auto`);
        }, function(error) {
            // Если пользователь отказался от геолокации, открываем карту без маршрута
            window.open('https://yandex.ru/maps/?ll=33.513197,44.604007&z=17');
        });
    } else {
        // Если геолокация не поддерживается
        window.open('https://yandex.ru/maps/?ll=33.513197,44.604007&z=17');
    }
}

// Функция для открытия карты в полный экран
function openFullScreenMap() {
    const mapContainer = document.getElementById('map');
    if (mapContainer.requestFullscreen) {
        mapContainer.requestFullscreen();
    } else if (mapContainer.webkitRequestFullscreen) {
        mapContainer.webkitRequestFullscreen();
    } else if (mapContainer.msRequestFullscreen) {
        mapContainer.msRequestFullscreen();
    }
}