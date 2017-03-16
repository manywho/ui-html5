(function (manywho, window, $) {

    var isAbsoluteUrl = new RegExp('^(?:[a-z]+:)?//', 'i');

    function appendScript(url) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = false;
        script.defer = true;
        script.src = url;
        script.onload = function() { 
            manywho.waitingToLoad--; 
        };
        document.head.appendChild(script);
    }

    function appendStylesheet(stylesheet) {
        var compiledStyles = document.createElement("link");
        compiledStyles.rel = "stylesheet";
        compiledStyles.href = stylesheet.href;
        if (stylesheet.id)
            compiledStyles.id = stylesheet.id;
        document.head.appendChild(compiledStyles);
    }

    function getUrl(cdnUrl, url) {
        return (url && url.match(isAbsoluteUrl)) ? url : cdnUrl + url;
    }

    function parseHashes(parsed, resources, cdnUrl) {
        var hashes = resources

        if (!Array.isArray(hashes)) {
            hashes = [];
            for (var resource in resources)
                hashes.push(resources[resource]);
        }

        for (var i = 0; i < hashes.length; i++) {
            if (hashes[i].match('\.css$'))
                parsed.stylesheets.push({ href: getUrl(cdnUrl, hashes[i]) });
            else if (hashes[i].match('\.js$'))
                parsed.scripts.push(getUrl(cdnUrl, hashes[i]));    
        }

        return parsed;
    }

    function loadHashes(urls, cdnUrl, callback, parsed, index) {
        if (!index)
            index = 0;

        if (!parsed)
            var parsed = {
                scripts: [],
                stylesheets: []
            }

        if (urls && index < urls.length) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {

                if (request.readyState == 4 && request.status == 200) {
                    parsed = parseHashes(parsed, JSON.parse(request.responseText), cdnUrl);
                    loadHashes(urls, cdnUrl, callback, parsed, index + 1);
                }
            }

            request.open('GET', urls[index], true);
            request.send(null);
        }
        else if (callback)
            callback(parsed);
    }

    function isManyWhoReady(callback) {
        (manywho.waitingToLoad === 0) ? callback() : requestAnimationFrame(function() { isManyWhoReady(callback) });
    }

    manywho.loader = {

        initialize: function(callback, cdnUrl, vendorHashesUrl, urls, customResources, initialTheme) {

            if (!window.React)
                urls.unshift(vendorHashesUrl);

            loadHashes(urls, cdnUrl, function(parsed) {
                if (customResources)
                    parsed = parseHashes(parsed, customResources, cdnUrl);

                if (!document.getElementById('theme'))
                    parsed.stylesheets.splice(1, 0, initialTheme ? { href: initialTheme, id: 'theme' } : { href: cdnUrl + '/css/themes/mw-paper.css', id: 'theme' });

                manywho.waitingToLoad = parsed.scripts.length;

                parsed.stylesheets.forEach(appendStylesheet);
                parsed.scripts.forEach(appendScript);
                requestAnimationFrame(function() { isManyWhoReady(callback) });
            });
        }
    }

    var urls = [manywho.cdnUrl + '/hashes.json']
                    .concat(manywho.customHashes)
                    .filter(function(hash) {
                        return !!hash;
                    });

    manywho.loader.initialize(manywho.initialize, manywho.cdnUrl, manywho.cdnUrl + '/js/vendor/vendor.json', urls, manywho.customResources, manywho.initialTheme);

}(manywho, window));
