
const staticCacheName = 'restaurant-1';

const content = [
  '/',
  './restaurant.html',
  'restaurant.html?id=1',
  'restaurant.html?id=2',
  'restaurant.html?id=3',
  'restaurant.html?id=4',
  'restaurant.html?id=5',
  'restaurant.html?id=6',
  'restaurant.html?id=7',
  'restaurant.html?id=8',
  'restaurant.html?id=9',
  'restaurant.html?id=10',
  './css/styles.css',
  './js/main.js'
  //TODO: add all
]

self.addEventListener('install', function(event) {

    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            return cache.addAll(content);
        }).catch(error => {
            console.log(error);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.filter( cachename => {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != staticCacheName;
                }).map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then( response => {
            return response || fetch(event.request);
        })
    );
});
