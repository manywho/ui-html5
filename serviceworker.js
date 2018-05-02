if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw-activate.js').then(function(registration) {
            if(registration.installing) {
                console.log('Service worker installing');
            } else if(registration.waiting) {
                console.log('Service worker installed');
            } else if(registration.active) {
                console.log('Service worker active');
            }
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });

};