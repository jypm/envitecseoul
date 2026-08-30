const CACHE='sugeo-daily3-v7';
const FILES=[
  './daily3.html',
  './manifest_daily3.json',
  './icon_daily3.png',
  './icon_daily3-180.png',
  './icon_daily3-192.png',
  './icon_daily3-512.png'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
