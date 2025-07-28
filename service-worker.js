const CACHE_NAME = 'botnova-cache-v1'; // Name for this version of the cache
const URLS_TO_CACHE = [ // List of files to store in the cache for offline use
  './',
  './index.html',
  './manifest.json',
  './icon.png',
];

self.addEventListener('install', (event) => {
  // During installation, open the cache and add all specified files to it
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Intercept network requests
  event.respondWith(
    caches.match(event.request) // Try to find the requested file in the cache
      .then((response) => {
        return response || fetch(event.request); // If found, return cached; else, fetch from network
      })
  );
});