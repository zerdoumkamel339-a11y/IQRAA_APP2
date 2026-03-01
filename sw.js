const CACHE_NAME = 'bookdz-pwa-v1';
const urlsToCache = [
    './customer.html',
    './index.css',
    './icon-192.svg'
];

// Install Event: Cache essential files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch Event: Serve from cache if available, else fetch from network (Offline-first approach for shell)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached response if found, else fetch from network
                return response || fetch(event.request);
            })
            // Fallback for offline (optional, we simply return the basic cache)
            .catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match('./customer.html');
                }
            })
    );
});

// Activate Event: Clear old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
