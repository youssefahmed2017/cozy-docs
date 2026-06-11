const CACHE_NAME = "cozykit-v5";

const FILES_TO_CACHE = [
    "dino/offline.html"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

// Intercept all fetch requests
self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                // If the request is for a page (navigation), return offline.html
                if (event.request.mode === "navigate") {
                    return caches.match("dino/offline.html");
                }
                // Otherwise, try cache (but nothing else is cached)
                return caches.match(event.request);
            })
    );
});
