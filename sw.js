const CACHE_NAME = "cozykit-v3";

const FILES_TO_CACHE = [
    "dino/offline.html"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            if (event.request.mode === "navigate") {
                return caches.match("dino/offline.html");
            }

            return caches.match(event.request);
        })
    );
});
