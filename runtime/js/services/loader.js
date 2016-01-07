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

    function loadCustomResources(resources) {

        if (resources) {

            var scripts = [];

            resources.forEach(function(url) {

                if (url.match('\.css$')) {

                    appendStylesheet(url);

                }
                else if (url.match('\.js$')) {

                    scripts.push(url);

                }

            });

            return scripts;

        }

        return [];

    }

    function loadScripts(scripts, callback) {

        var loadedScriptCount = 0;

        scripts.forEach(function(url, index, scripts) {

            appendScript(url, function() {

                loadedScriptCount++;
                if (loadedScriptCount == scripts.length) {

                    callback();

                }

            });

        });

    }

    manywho.loader = {

        initialize: function(callback, cdnUrl, hashes, customResources, initialTheme) {

            var hashesCount = 0;
            var scripts = [];

            hashes.forEach(function(url) {

                $.getJSON(url, function (data) {

                    for (hash in data) {

                        if (data[hash].match('\.css$')) {

                            appendStylesheet(cdnUrl + data[hash]);

                        }
                        else if (data[hash].match('\.js$')) {

                            scripts.push(cdnUrl + data[hash]);

                        }

                    }

                    // Load the default paper theme manually
                    appendStylesheet(initialTheme || (cdnUrl + '/css/themes/mw-paper.css'), 'theme');

                    hashesCount++;
                    if (hashesCount == hashes.length) {

                        scripts = scripts.concat(loadCustomResources(customResources));
                        loadScripts(scripts, callback);

                    }
                });

            });

        }

    }

    var hashes = [manywho.cdnUrl + '/hashes.json', manywho.cdnUrl + '/js/vendor/hashes.json']
                    .concat(manywho.customHashes)
                    .filter(function(hash) {
                        return hash != undefined && hash != null;
                    });

    manywho.loader.initialize(manywho.initialize, manywho.cdnUrl, hashes, manywho.customResources, manywho.initialTheme);

}(manywho, window, jQuery));
