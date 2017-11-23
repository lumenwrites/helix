/* Update: updated 1 */
self.addEventListener('install', function(event) {
    console.log('Service worker installed')

    event.waitUntil(
	caches.open('static')
	      .then(function(cache) {
		  cache.addAll([
		      '/',
		      '/styles/css/vendor.css',
		      '/styles/css/style.css',		      
		      '/client.js',
		      'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700',
		      'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,400,300,700',
		      'https://helix.startuplab.io/styles/fonts/fontawesome-webfont.woff2?v=4.7.0',
		      'https://helix.startuplab.io/img/logo_256x256.png',
		      'https://helix.startuplab.io/styles/fonts/fontawesome-webfont.woff?v=4.7.0',
		      'https://helix.startuplab.io/styles/fonts/fontawesome-webfont.ttf?v=4.7.0'
		      
		  ])
	      })
    )

})

/* Once a new service worker has installed and a previous version isn't being used, the new one activates, and you get an activate event. Because the old version is out of the way, it's a good time to delete unused caches.*/
self.addEventListener('activate', function(event) {
    console.log('Updated service worker activated, deleting cache.')
    event.waitUntil(
	caches.keys().then(function(cacheNames) {
	    return Promise.all(
		cacheNames.filter(function(cacheName) {
		    // Return true if you want to remove this cache,
		    // but remember that caches are shared across
		    // the whole origin
		    return !cacheName.includes('api/v1') 
		}).map(function(cacheName) {
		    return caches.delete(cacheName);
		})
	    );
	})
    );    
    return self.clients.claim() // some weird magic required to make stuff work
});

/* If a request doesn't match anything in the cache, get it from the network,
   send it to the page and add it to the cache at the same time. */
self.addEventListener('fetch', function(event) {
    event.respondWith(
	caches.open('helix-dynamic').then(function(cache) {
	    return cache.match(event.request).then(function (response) {
		return response || fetch(event.request).then(function(response) {
		    if (!event.request.includes('api/v1')) {
			cache.put(event.request, response.clone())
		    }
		    return response;
		});
	    });
	})
    );
});
