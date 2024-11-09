//on instal event 
self.addEventListener('install', (event) => {
console.log ('[SW] Install:', event);

self.skipWaiting();

console.log(caches);
event.waitUntil(

    caches.open('cache-Assets')
    .then((cache) =>{ 
    console.log('cache:', cache);
    cache.add('/index.html');
    cache.add('/script.js');
    cache.add('/styles.css');
    cache.add("/manifest.json")
    cache.add('/icons/favicon.ico')
    cache.add('/icons/favicon.svg')
    cache.add('/icons/web-app-manifest-192x192.png')
    })
    .catch((error) =>{ 
    
        console.log('cache Failed:', error);
        
    })
 
);


});


self.addEventListener('activate', (event) =>{
console.log('[SW] Activate', event);

event.waitUntil(clients.claim());

});


self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((response) =>{
console.log('Response:', response);
return response;
    })
    .catch((error) =>{
        console.log('Match Failed', error );
    }
    )

  );
  

});