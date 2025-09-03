// Инициализация Яндекс Карты
document.addEventListener('DOMContentLoaded', function() {
    if (typeof ymaps !== 'undefined') {
        initMap();
    }
});

function initMap() {
    ymaps.ready(function() {
        const map = new ymaps.Map('map', {
            center: [44.604202, 33.522522], // Координаты ул. 6-я Бастионная, 40
            zoom: 17,
            controls: ['zoomControl', 'fullscreenControl']
        });

        // Метка салона
        const salonPlacemark = new ymaps.Placemark([44.604202, 33.522522], {
            balloonContent: `
                <strong>Салон красоты Ego</strong><br>
                ул. 6-я Бастионная, 40, 2й этаж<br>
                📞 +7 (978) 000-00-00<br>
                🕐 Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-20:00
            `
        }, {
            preset: 'islands#yellowIcon',
            iconColor: '#d4af37'
        });

        map.geoObjects.add(salonPlacemark);
        
        // Открываем балун при загрузке
        salonPlacemark.balloon.open();
    });
}

// Построение маршрута
function buildRoute() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            
            const yandexMapsUrl = `https://yandex.ru/maps/?rtext=${userLat},${userLon}~44.604202,33.522522&rtt=auto`;
            window.open(yandexMapsUrl, '_blank');
        }, function(error) {
            // Если геолокация недоступна, открываем карту с поиском маршрута
            const yandexMapsUrl = 'https://yandex.ru/maps/org/salon_krasoty_ego/1123456789/?ll=33.522522%2C44.604202&z=17&mode=routes';
            window.open(yandexMapsUrl, '_blank');
        });
    } else {
        const yandexMapsUrl = 'https://yandex.ru/maps/org/salon_krasoty_ego/1123456789/?ll=33.522522%2C44.604202&z=17&mode=routes';
        window.open(yandexMapsUrl, '_blank');
    }
}