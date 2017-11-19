if ('serviceWorker' in navigator) { /* if sw is supported */
    /* Register service worker */
    navigator.serviceWorker
	     .register('/sw.js')
	     .then(()=>{console.log("Service worker registered")})
}

/* Intersept prompt to trigger it later */
/* When chrome attempts to show add to the homescreen prompt */
/* 
   var deferredPrompt
   window.addEventListener('beforeinstallprompt',(e)=>{
   event.preventDefault()
   deferredPrompt = event
   return false
   })
 */
