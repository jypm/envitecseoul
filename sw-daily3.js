const CACHE='sugeo-daily3-v8';
const FILES=[
  '/envitecseoul/daily3.html',
  '/envitecseoul/manifest_daily3.json',
  '/envitecseoul/icon_daily3.png',
  '/envitecseoul/icon_daily3-180.png',
  '/envitecseoul/icon_daily3-192.png',
  '/envitecseoul/icon_daily3-512.png',
  './daily3.html',
  './manifest_daily3.json',
  './icon_daily3.png',
  './icon_daily3-180.png',
  './icon_daily3-192.png',
  './icon_daily3-512.png'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES).catch(err=>console.log('cache fail',err))));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
