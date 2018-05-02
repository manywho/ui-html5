importScripts('./build/js/localforage-1.5.0.min.js');

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

self.addEventListener('fetch', function(event) {

    const requestPayload = event.request.clone();

    requestPayload.json().then(function(data) {
        if(data) {
            let responseKey = null;

            if(data.navigationElementId) {
                responseKey = data.navigationElementId
            }

            if(data.currentMapElementId) {
                responseKey = data.currentMapElementId
            }

            if(data.typeElementBindingId) {
                responseKey = data.typeElementBindingId
            }
            console.log('Attempting request to ' + event.request.url + ' method is ' + event.request.method);
            
            fetch(event.request).then(function(response) {
        
                // If all is good then cache the response
                response.json().then(function(data) {
                    if(data) {
                        enqueueResponse(responseKey, data);
                    }
                })
                .catch(function(){
                    return
                });
        
            })
            .catch(function(){
        
                console.log('No network');
        
                // We also want to start caching requests to 
                // be synced with the server once reconnected
                /*requestPayload.json().then(function(data) {
                    if(data) {
                        enqueueRequest(data);
                    }
                })
                .catch(function(){
                    return
                })*/
            })

            
        }
    })
    .catch(function(){
        return
    })


    /*caches.match(event.request).then(function(response) {
        if (response) {
            // console.log('Found ', event.request.url, ' in cache');
            return response;
        }
        return fetch(event.request).then(function(response) {
            if (response) {
                // console.log('Network request for ', event.request.url);
                // console.log(response.status);
            }
        })
    })*/
});

function enqueueResponse(responseKey, response) {
    return localforage.getItem('responses').then(function(queue) {
        queue = queue || [];
        queue.push({'key': responseKey, 'response': JSON.stringify(response)});
        return localforage.setItem('responses', queue).then(function() {
            console.log('Response enqueued!');
        });
    });
}

function enqueueRequest(request) {
    return localforage.getItem('requests').then(function(queue) {
        queue = queue || [];
        queue.push(JSON.stringify(request));
        return localforage.setItem('requests', queue).then(function() {
            console.log('Request enqueued!');
        });
    });
}