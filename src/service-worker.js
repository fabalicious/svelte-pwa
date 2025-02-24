// service-worker.js
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

// Basic fetch handler
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Install handler
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-svelte-pwa-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json'
      ]);
    })
  );
});

// Activate handler
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith('my-svelte-pwa-'))
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});