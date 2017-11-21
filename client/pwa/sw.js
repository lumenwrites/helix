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


self.addEventListener('activate', function(event) {
    /* console.log('Service worker activated')    */
    return self.clients.claim() // some weird magic required to make stuff work
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
	fetch(event.request).catch(function() {
	    return caches.match(event.request);
	})
    );
});
