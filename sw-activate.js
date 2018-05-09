/**
 * A service worker primarily used to cache all
 * engine requests and responses as a user goes
 * through a flow.
 */

importScripts('./build/js/localforage-1.5.0.min.js');

// Caching some static files to load
self.addEventListener('install', function(event) {   
    event.waitUntil(
        caches.open('STATIC').then(function(cache) {
            console.log('Caching static files');
            return cache.addAll(
                [
                    '/build/css/mw-bootstrap.css ',
                    '/build/css/themes/mw-paper.css',
                    '/build/css/ui-bootstrap.css',
                    '/build/css/ui-offline.css',
                ]
            );
        })
    ); 
});

self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
});

// Intercepting api calls to the engine
self.addEventListener('fetch', function(event) {

    const requestPayload = event.request.clone();

    requestPayload.json().then(function(data) {
        if(data) {
            let requestResponseKey = guid();
            enqueueRequest(requestResponseKey, data);

            console.log('Attempting request to ' + event.request.url + ' method is ' + event.request.method);
            
            fetch(event.request).then(function(response) {
                response.json().then(function(data) {
                    if(data) {
                        if (data.invokeType !== 'WAIT') {
                            enqueueResponse(requestResponseKey, data);
                        }
                    }
                })
                .catch(function(){
                    console.log('No response payload so do not cache response');
                    return
                });
        
            })
            .catch(function(){
                console.log('No network');
            })

            
        }
    })
    .catch(function(){
        console.log('No request payload so do not cache request');
        return
    })
});

// Caching engine responses
function enqueueResponse(responseKey, response) {
    return localforage.getItem('responses').then(function(queue) {
        queue = queue || [];
        queue.push({'key': responseKey, 'response': JSON.stringify(response)});
        return localforage.setItem('responses', queue).then(function() {
            console.log('Response enqueued!');
        });
    });
}

// Caching requests to the engine
function enqueueRequest(requestResponseKey, request) {
    return localforage.getItem('requests').then(function(queue) {
        queue = queue || [];
        queue.push({'key': requestResponseKey, 'response': JSON.stringify(request)});
        return localforage.setItem('requests', queue).then(function() {
            console.log('Request enqueued!');
        });
    });
}

// We need guids to relate cached requests to their responses
function guid() {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};