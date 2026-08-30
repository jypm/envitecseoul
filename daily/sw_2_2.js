const CACHE='sugeo-daily-v2';
const FILES=[
  './',
  './index.html',
  './manifest.json',
  './icon_daily3-192.png',
  './icon_daily3-512.png'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES).catch(async ()=>{
    for(const f of FILES){ try{ await c.add(f); }catch(e){} }
  })));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    if(res.ok) caches.open(CACHE).then(c=>c.put(e.request, res.clone()));
    return res;
  }).catch(()=>caches.match('./index.html'))));
});
