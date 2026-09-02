const CACHE_NAME = 'envitec-daily-white-v20250902';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(['./','./index.html']))); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{ if(k!==CACHE_NAME) return caches.delete(k); }))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', e => {
  if(e.request.method!=='GET') return;
  const url=e.request.url;
  if(url.includes('firestore')||url.includes('firebase')||url.includes('googleapis')||url.includes('chrome-extension')||url.includes('analytics')) return;
  e.respondWith(fetch(e.request).then(r=>{
    if(!r||r.status!==200||r.type!=='basic') return r;
    const clone=r.clone();
    caches.open(CACHE_NAME).then(c=>c.put(e.request, clone));
    return r;
  }).catch(()=>caches.match(e.request).then(c=>c||caches.match('./index.html'))));
});
self.addEventListener('message', e=>{ if(e.data&&e.data.type==='SKIP_WAITING') self.skipWaiting(); });
