const CACHE='sugeo-daily3-v9';
const FILES=[
  '/envitecseoul/daily3.html',
  '/envitecseoul/manifest_daily3.json',
  '/envitecseoul/icon_daily3.png',
  '/envitecseoul/icon_daily3-180.png',
  '/envitecseoul/icon_daily3-192.png',
  '/envitecseoul/icon_daily3-512.png'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  // Only handle same-origin
  if(!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    // update cache
    const copy=res.clone();
    caches.open(CACHE).then(c=>c.put(e.request, copy));
    return res;
  }).catch(()=>caches.match('/envitecseoul/daily3.html'))));
});
