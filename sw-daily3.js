const CACHE='sugeo-daily3-v2';
const FILES=['./daily3.html','./manifest_daily3.json','./icon_daily3.png','./icon_daily3-192.png','./icon_daily3-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
