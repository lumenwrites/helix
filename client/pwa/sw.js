self.addEventListener('install', function(event) {
    event.waitUntil(
	caches.open('helix')
	      .then(function(cache) {
		  cache.addAll([
		      '/',
		      '/styles/css/vendor.css',
		      '/styles/css/style.css',		      
		      '/client.js'
		  ])
	      })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
	caches.match(event.request)
	      .then(function(res) {
		  return res;
	      })
    );
});
