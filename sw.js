const CACHE_NAME = 'snake-game-v2'; // Энд v2 гэж өөрчиллөө

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Шинэ хувилбар гарвал шууд хүлээлгүйгээр идэвхжүүлнэ
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(['./', './index.html']))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) { // Хуучин хувилбарыг (v1) устгана
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
