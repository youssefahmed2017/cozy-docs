const CACHE_NAME = "cozykit-v2";

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
    event.respondWith(
        fetch(event.request).catch(() => {

            // If the iframe requests the game,
            // give it the cached game instead of offline.html
            if (event.request.url.includes("dino/dino.html")) {
                return caches.match("dino/dino.html");
            }

            // Main page navigations get the offline page
            if (event.request.mode === "navigate") {
                return caches.match("dino/offline.html");
            }

            return caches.match(event.request);
        })
    );
});
