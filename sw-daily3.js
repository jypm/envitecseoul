const CACHE='sugeo-daily3-v10';
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
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  if(!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(e.request).then(cached=>{
      return cached || fetch(e.request).then(res=>{
        // Clone and cache
        const clone=res.clone();
        caches.open(CACHE).then(c=>c.put(e.request, clone));
        return res;
      }).catch(()=>caches.match('/envitecseoul/daily3.html'));
    })
  );
});
