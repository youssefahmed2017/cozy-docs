const CACHE_NAME = "cozykit-v1";

const FILES_TO_CACHE = [
    "dino/offline.html",
    "dino/dino.html"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("fetch", event => {
    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request)
                .catch(() => caches.match("dino/offline.html"))
        );
    }
});
