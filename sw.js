const C='pip2',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET')return;
  if(u.hostname==='cdn.jsdelivr.net'){
    e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put(r,y));return x})));
    return;
  }
  if(u.origin!==location.origin)return;
  e.respondWith(fetch(r).catch(()=>caches.match(r)));
});
