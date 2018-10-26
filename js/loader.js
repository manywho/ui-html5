(function (manywho, window, $) {

    var isAbsoluteUrl = new RegExp('^(?:[a-z]+:)?//', 'i');


    /**
     * Appends a script tag to the document 
     * and decrements manywho.waitingToLoad when loaded or failed
     *
     * @param {string} url
     */
    function appendScript(url) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = false;
        script.defer = true;
        script.src = url;
        script.onload = function () {
            manywho.waitingToLoad--;
        };
        script.onerror = function () {
            manywho.waitingToLoad--;
        };

        document.head.appendChild(script);
    }


    /**
     * Appends a link tag to the document
     *
     * @param {Object} stylesheet
     * @param {string} stylesheet.id - Id for link tag
     * @param {string} stylesheet.href - href for link tag
     */
    function appendStylesheet(stylesheet) {
        var compiledStyles = document.createElement("link");
        compiledStyles.rel = "stylesheet";
        compiledStyles.href = stylesheet.href;
        if (stylesheet.id)
            compiledStyles.id = stylesheet.id;
        document.head.appendChild(compiledStyles);
    }


    /**
     * Checks if the supplied url is absolute, if not prepends the cdnUrl
     *
     * @param {string} cdnUrl
     * @param {string} url - If not absolute, the cdnUrl is prepended
     * @returns {string} - An absolute url 
     */
    function getUrl(cdnUrl, url) {
        return (url && url.match(isAbsoluteUrl)) ? url : cdnUrl + url;
    }

    /**
     * Splits the supplied list of resources into stylesheets and scripts
     * and adds them to the parsed collection
     *
     * @param {Object} parsed - The container to hold parsed urls
     * @param {string[]} parsed.stylesheets - List of already parsed stylesheet urls
     * @param {string[]} parsed.scripts - List of already parsed script urls
     * @param {(string[]|Object)} resources - List of urls to add to the parsed urls collection
     * @param {string} cdnUrl
     * @returns the container of parsed urls
     */
    function parseHashes(parsed, resources, cdnUrl) {
        var hashes = resources

        // If hashes is an object, convert it to an array
        if (!Array.isArray(hashes)) {
            hashes = [];
            for (var resource in resources)
                hashes.push(resources[resource]);
        }

        // Split urls by file type and add to the corresponding list
        for (var i = 0; i < hashes.length; i++) {
            if (hashes[i].match('\.css$'))
                parsed.stylesheets.push({ href: getUrl(cdnUrl, hashes[i]) });
            else if (hashes[i].match('\.js$'))
                parsed.scripts.push(getUrl(cdnUrl, hashes[i]));
        }

        return parsed;
    }

     
    /**
     * Loads all required url hash files (json)
     *
     * @param {Object} parsed - The container to hold parsed urls
     * @param {string[]} parsed.stylesheets - List of already parsed stylesheet urls
     * @param {string[]} parsed.scripts - List of already parsed script urls
     * @param {string[]} urls - List of urls of required url hash files
     * @param {string} cdnUrl
     * @param {Function} callback - Called when the hash files have all been loaded, passed the 'parsed' container 
     * @param {number} [index] - Incremented when calling recursively
     */
    function loadHashes(parsed, urls, cdnUrl, callback, index) {
        if (!index)
            index = 0;

        if (urls && index < urls.length && urls[index]) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {

                if (request.readyState == 4 && request.status == 200) {
                    parsed = parseHashes(parsed, JSON.parse(request.responseText), cdnUrl);
                    loadHashes(parsed, urls, cdnUrl, callback, index + 1);
                }
            }

            request.open('GET', urls[index], true);
            request.send(null);
        }
        else if (callback)
            callback(parsed);
    }


    /**
     * Loads bundles.json then matches the list of requires to property names in the returned json response.
     * The values of properties in the response are lists of asset urls.
     * Urls contained in the matched lists are then parsed and added to the parsed collection 
     *
     * @param {Object} parsed - The container to hold parsed urls
     * @param {string[]} parsed.stylesheets - List of already parsed stylesheet urls
     * @param {string[]} parsed.scripts - List of already parsed script urls
     * @param {string} cdnUrl
     * @param {string[]} requires - List of names of url collections referenced in bundles.json 
     * @param {function} callback - Called when the bundles have been added to 'parsed' container, passed the 'parsed' container 
     */
    function loadRequires(parsed, cdnUrl, requires, callback) {
        if (requires && requires.length > 0) {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {

                if (request.readyState == 4 && request.status == 200) {
                    var bundles = JSON.parse(request.responseText);
                    for (var i = 0; i < requires.length; i++) {
                        // pull out the collections of urls referenced in the requires list
                        parsed = parseHashes(parsed, bundles[requires[i]], cdnUrl);
                    }
                    // Call the callback with new urls added to 'parsed'
                    callback(parsed)
                }
            }

            request.open('GET', cdnUrl + '/bundles.json', true);
            request.send(null);
        }
        else
            callback(parsed);
    }

    /**
     * Recursively checks if waitingToLoad has reached 0, then calls the callback
     *
     * @param {Function} callback - Called when waitingToLoad queue reaches 0
     */
    function isManyWhoReady(callback) {
        (manywho.waitingToLoad === 0) ? callback() : requestAnimationFrame(function () { isManyWhoReady(callback) });
    }

    manywho.loader = {

        /**
         * Adds link and script tags for all required assets; vendor, in-house and user defined.
         * Calls the callback once all script assets have loaded or their request fails
         *
         * @param {Function} callback - Called when all script assets have loaded (or request has failed)
         * @param {string} cdnUrl - Absolute url of the CND where assets should be requested from
         * @param {string} vendorHashesUrl - Absolute url of the json file containing the list of required vendor assets
         * @param {string[]} requires - List of absolute urls of the json files containing the list of required in-house assets
         * @param {*} customHashes
         * @param {string[]} customResources - A list of absolute urls of user defined resources
         * @param {string} initialTheme - Absolute url of the desired bootstrap CSS theme, default mw-paper.css
         */
        initialize: function (callback, cdnUrl, vendorHashesUrl, requires, customHashes, customResources, initialTheme) {

            // An object to contain lists of parsed script and styleheet urls
            var parsed = {
                scripts: [],
                stylesheets: []
            }

            // If React if not already available on the window object, 
            loadHashes(parsed, window.React ? null : [vendorHashesUrl], cdnUrl, function (parsed) {

                loadRequires(parsed, cdnUrl, requires, function (parsed) {

                    // If the global manywho object has a requires property
                    // hashes refers to just the supplied customHashes
                    // else concatenate hashes.json with the supplied customHashes
                    // This is for backward compatibility from before requires existed
                    // https://docs.manywho.com/ui-2-66-0/
                    var hashes = !requires ? [cdnUrl + '/hashes.json'].concat(customHashes) : customHashes;

                    loadHashes(parsed, hashes, cdnUrl, function (parsed) {

                        // Parse and add any custom resoures to the previously parsed list of urls
                        if (customResources)
                            parsed = parseHashes(parsed, customResources, cdnUrl);

                        // If no theme element (<link/>) exists in the document
                        // add the theme stylesheet to previously parsed list of stylesheets
                        if (!document.getElementById('theme'))
                            parsed.stylesheets.splice(1, 0, initialTheme ? { href: initialTheme, id: 'theme' } : { href: cdnUrl + '/css/themes/mw-paper.css', id: 'theme' });

                        // Number of assets required.
                        // Decremented as assets load or the request errors
                        manywho.waitingToLoad = parsed.scripts.length;

                        // Add all required asset references to the document
                        parsed.stylesheets.forEach(appendStylesheet);
                        parsed.scripts.forEach(appendScript);

                        // Begin recursive loop to check when all assets have loaded
                        requestAnimationFrame(function () { isManyWhoReady(callback) });
                    });
                });
            });
        }
    }

    manywho.loader.initialize(
        manywho.initialize, 
        manywho.cdnUrl,
        manywho.cdnUrl + '/js/vendor/vendor.json', 
        manywho.requires, 
        manywho.customHashes, 
        manywho.customResources, 
        manywho.initialTheme
    );

}(manywho, window));
