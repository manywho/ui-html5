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

    manywho.loader = {

        initialize: function(callback, cdnUrl, customResources, initialTheme) {

            $.getJSON(cdnUrl + '/hashes.json', function (data) {

                var scripts = [];

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

                if (customResources)
                {

                    customResources.forEach(function(url) {

                        if (url.match('\.css$')) {

                            appendStylesheet(url);

                        }
                        else if (url.match('\.js$')) {

                            scripts.push(url);

                        }

                    });

                }

                var loadedScriptCount = 0;

                scripts.forEach(function(url, index, scripts) {

                    appendScript(url, function() {

                        loadedScriptCount++;
                        if (loadedScriptCount == scripts.length) {

                            callback();

                        }

                    });

                });

            });

        }

    }

    manywho.loader.initialize(manywho.initialize, manywho.cdnUrl, manywho.customResources, manywho.initialTheme);

}(manywho, window, jQuery));
