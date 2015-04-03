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
    
    function appendScript(url) {

        var compiledScript = document.createElement("script");
        compiledScript.type = "text/javascript";
        compiledScript.src = url;
        document.head.appendChild(compiledScript);

    }

    function appendStylesheet(url, id) {

        var compiledStyles = document.createElement("link");
        compiledStyles.rel = "stylesheet";
        compiledStyles.href = url;
        compiledStyles.id = id;
        document.head.appendChild(compiledStyles);

    }
    
    manywho.loader = {

        initialize: function() {
            
            $.getJSON(manywho.cdnUrl + '/hashes.json', function (data) {
                
                for (hash in data) {

                    if (data[hash].match('\.css$')) {

                        appendStylesheet(manywho.cdnUrl + data[hash]);

                    }
                    else if (data[hash].match('\.js$')) {

                        appendScript(manywho.cdnUrl + data[hash]);

                    }

                }

                // Load the default paper theme manually
                appendStylesheet(manywho.cdnUrl + '/css/themes/mw-paper.css', 'theme');

                var timer = setInterval(function () {

                    if (manywho.utils && window.log && window.React && $.fn.chosen && window.io && $.fn.modal) {

                        clearInterval(timer);
                        manywho.initialize();
                        
                    }

                }, 10);
                
            });

        }
        
    }

    manywho.loader.initialize();

}(manywho, window, jQuery));





