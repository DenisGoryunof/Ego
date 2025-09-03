// sw.js - Service Worker для кеширования и оффлайн работы
const CACHE_NAME = 'ego-salon-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/services.html',
    '/gallery.html',
    '/reviews.html',
    '/about.html',
    '/contact.html',
    '/404.html',
    '/css/style.css',
    '/css/home.css',
    '/css/services.css',
    '/css/gallery.css',
    '/css/reviews.css',
    '/css/about.css',
    '/css/contact.css',
    '/css/404.css',
    '/js/script.js',
    '/js/home.js',
    '/js/form.js',
    '/js/gallery.js',
    '/js/reviews.js',
    '/js/map.js',
    '/js/404.js',
    '/js/error-handler.js',
    '/assets/images/logo.png',
    '/assets/icons/instagram.svg',
    '/assets/icons/facebook.svg',
    '/assets/icons/vk.svg'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Возвращаем кешированный response если он есть
                if (response) {
                    return response;
                }
                
                // Иначе делаем сетевой запрос
                return fetch(event.request)
                    .then(function(response) {
                        // Проверяем валидный ли response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Клонируем response
                        var responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(function() {
                        // Для страниц возвращаем 404
                        if (event.request.destination === 'document') {
                            return caches.match('/404.html');
                        }
                        // Для остальных запросов возвращаем пустой response
                        return new Response('Offline content not available');
                    });
            })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});