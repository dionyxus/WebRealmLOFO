'use strict';
const cacheName = 'offline-mode-cache-v1',
  contentToCache = ['./images/logo.png'];

self.addEventListener('fetch', function (e) {
  e.respondWith(
    (async () => {
      try {
        const t = await caches.match(e.request);
        return t || (await fetch(e.request));
      } catch (e) {
        console.log(
          'You are not connected to the Internet. Connect and try again.',
        );
        const t = await caches.open(cacheName);
        return await t.match(contentToCache[0]);
      }
    })(),
  );
}),

  self.addEventListener('install', (e) => {
    e.waitUntil(
      (async () => {
        const e = await caches.open(cacheName);
        await e.addAll(contentToCache);
      })(),
    );
  }),
  
  self.addEventListener('activate', (e) => {
    e.waitUntil(
      caches.keys().then((e) =>
        Promise.all(
          e.map((e) => {
            if (e !== cacheName) return caches.delete(e);
          }),
        ),
      ),
    );
  });
