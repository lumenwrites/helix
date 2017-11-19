self.addEventListener('install', function(event) {
    console.log('Service worker installed')
})


self.addEventListener('activate', function(event) {
    console.log('Service worker activated')    
    event.waitUntil(
	caches.open('helix')
	      .then(function(cache) {
		  cache.addAll([
		      '/',
		      '/styles/css/vendor.css',
		      '/styles/css/style.css',		      
		      '/client.js',
		      'https://fonts.googleapis.com/css?family=Roboto+Mono:400,700',
		      'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,700italic,400,300,700',
		      'http://localhost:3020/styles/fonts/fontawesome-webfont.woff2?v=4.7.0',
		      'http://localhost:3020/img/logo_256x256.png',
		      'http://localhost:3020/styles/fonts/fontawesome-webfont.woff?v=4.7.0',
		      'http://localhost:3020/styles/fonts/fontawesome-webfont.ttf?v=4.7.0'
		      
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
    )    
})
