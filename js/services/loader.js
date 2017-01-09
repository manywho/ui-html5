/*!
Copyright 2015 ManyWho, Inc.
Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
file except in compliance with the License.
You may obtain a copy of the License at: http://manywho.com/sharedsource
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/

(function (manywho, window, $) {

    function appendScript(url, onLoad) {

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.onload = onLoad;
        script.onerror = onLoad;
        script.src = url;
        document.head.appendChild(script);

    }

    function appendStylesheet(url, id) {

        var compiledStyles = document.createElement("link");
        compiledStyles.rel = "stylesheet";
        compiledStyles.href = url;
        compiledStyles.id = id;
        document.head.appendChild(compiledStyles);

    }

    function parseCustomResources(resources) {

        var parsed = {
            scripts: [],
            stylesheets: []
        }

        if (resources) {

            resources.forEach(function(url) {

                if (url.match('\.css$')) {

                    parsed.stylesheets.push(url);

                }
                else if (url.match('\.js$')) {

                    parsed.scripts.push(url);

                }

            });

        }

        return parsed;

    }

    function parseHashes(hashes, cdnUrl) {

        var parsed = {
            scripts: [],
            stylesheets: []
        }

        for (hash in hashes) {

            if (hashes[hash].match('\.css$')) {

                parsed.stylesheets.push(cdnUrl + hashes[hash]);

            }
            else if (hashes[hash].match('\.js$')) {

                parsed.scripts.push(cdnUrl + hashes[hash]);

            }

        }

        return parsed;

    }

    function loadScriptsSequentially(scripts, index, callback) {

        if (scripts[index]) {

            appendScript(scripts[index], function() {

                index = index + 1;
                loadScriptsSequentially(scripts, index, callback);

            });

        }
        else {

            callback();

        }

    }

    function loadScripts(scripts, callback) {

        var loadedScriptCount = 0;

        if (scripts && scripts.length > 0) {

            scripts.forEach(function(url, index, scripts) {

                appendScript(url, function() {

                    loadedScriptCount++;
                    if (loadedScriptCount == scripts.length) {

                        callback();

                    }

                });

            });

        }
        else {
            callback();
        }

    }

    function loadFromHashes(hashes, cdnUrl, initialTheme, callback) {

        var hashesCount = 0;
        var scripts = [];

        if (hashes && hashes.length > 0)
        {

            hashes.forEach(function(url) {

                var request = new XMLHttpRequest();
                request.onreadystatechange = function() {

                    if (request.readyState == 4 && request.status == 200) {

                        var parsedHashes = parseHashes(JSON.parse(request.responseText), cdnUrl);
                        parsedHashes.stylesheets.forEach(appendStylesheet)
                        scripts = scripts.concat(parsedHashes.scripts);

                        hashesCount++;
                        if (hashesCount == hashes.length) {

                            if (!document.getElementById('theme'))
                                appendStylesheet(initialTheme || (cdnUrl + '/css/themes/mw-paper.css'), 'theme');

                            loadScripts(scripts, callback);

                        }

                    }

                }

                request.open('GET', url, true);
                request.send(null);

            });

        }
        else {
            callback();
        }

    }

    function loadCustomResources(customResources, callback) {
        var parsed = parseCustomResources(customResources);
        parsed.stylesheets.forEach(appendStylesheet);
        loadScripts(parsed.scripts, callback);
    }

	function loadTours(url, callback) {
		if (url) {
			var request = new XMLHttpRequest();

			request.onreadystatechange = function() {
				if (request.readyState == 4 && request.status == 200 && request.responseText)
					manywho.tours.addTours(JSON.parse(request.responseText));
			}

			request.open('GET', url, true);
			request.send(null);
		}
		else
			callback();
	}

    manywho.loader = {

        initialize: function(callback, cdnUrl, vendorHashesUrl, hashes, customResources, initialTheme, toursUrl) {

            if (!window.React) {

                var request = new XMLHttpRequest();
                request.onreadystatechange = function() {

                    if (request.readyState == 4 && request.status == 200) {

                        var vendorHashes = parseHashes(JSON.parse(request.responseText), cdnUrl);
                        vendorHashes.stylesheets.forEach(appendStylesheet);

                        loadScriptsSequentially(vendorHashes.scripts, 0, function() {

                            loadFromHashes([hashes[0]], cdnUrl, initialTheme, function() {
                                hashes.splice(0, 1);
                                loadFromHashes(hashes, cdnUrl, initialTheme, function() {
                                    loadCustomResources(customResources, function() {
										loadTours(toursUrl, callback);
									});
                                });
                            });

                        });

                    }

                }
                request.open('GET', vendorHashesUrl, true);
                request.send(null);

            }
            else {

                loadFromHashes([hashes[0]], cdnUrl, initialTheme, function() {
                    hashes.splice(0, 1);
                    loadFromHashes(hashes, cdnUrl, initialTheme, function() {
                        loadCustomResources(customResources, function() {
							loadTours(toursUrl, callback);
						});
                    });
                });

            }

        }

    }

    var hashes = [manywho.cdnUrl + '/hashes.json']
                    .concat(manywho.customHashes)
                    .filter(function(hash) {
                        return hash != undefined && hash != null;
                    });

    manywho.loader.initialize(manywho.initialize, manywho.cdnUrl, manywho.cdnUrl + '/js/vendor/vendor.json', hashes, manywho.customResources, manywho.initialTheme, manywho.toursUrl);

}(manywho, window));
