const CACHE_NAME = "cozykit-v6";
const FILES_TO_CACHE = [
    "dino/offline.html"
];

// Install event: cache the offline page
self.addEventListener("install", event => {
    self.skipWaiting(); // Activate immediately
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

// Activate event: delete old caches and take control of clients
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event: serve offline page for navigation requests
self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                if (event.request.mode === "navigate") {
                    return caches.match("dino/offline.html");
                }
                return caches.match(event.request);
            })
    );
});
