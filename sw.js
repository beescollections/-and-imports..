const CACHE_NAME = 'bees-store-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './app.js'
];

// Install the service worker and save the website files to the phone
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Load the app from the phone's memory for instant loading
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the saved version if it exists, otherwise fetch from the internet
        return response || fetch(event.request);
      })
  );
});
