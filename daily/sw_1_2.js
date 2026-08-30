const CACHE='sugeo-daily-v1';
const FILES=[
  './',
  './index.html',
  './daily.html',
  './manifest.json',
  './icon_daily3-192.png',
  './icon_daily3-512.png',
  './icon_daily3.png',
  './icon_daily3-180.png'
];
self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE).then(async c=>{
      for(const f of FILES){ try{ await c.add(f); }catch(e){ console.log('cache fail',f); } }
    })
  );
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  if(!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(e.request).then(cached=> cached || fetch(e.request).then(res=>{
      if(res.ok){ const clone=res.clone(); caches.open(CACHE).then(c=>c.put(e.request, clone)); }
      return res;
    }).catch(()=>caches.match('./index.html')))
  );
});
