(function (manywho, $) {
    
    function appendScript(url) {

        var compiledScript = document.createElement("script");
        compiledScript.type = "text/javascript";
        compiledScript.src = url;
        document.head.appendChild(compiledScript);

    }

    function appendStylesheet(url) {

        var compiledStyles = document.createElement("link");
        compiledStyles.rel = "stylesheet";
        compiledStyles.href = url;
        document.head.appendChild(compiledStyles);

    }
    
    manywho.loader = {

        initialize: function() {
            
            $.getJSON('hashes.json', function (data) {
                
                for (hash in data) {

                    if (data[hash].match('\.css$')) {

                        appendStylesheet(manywho.cdnUrl + data[hash]);

                    }
                    else if (data[hash].match('\.js$')) {

                        appendScript(manywho.cdnUrl + data[hash]);

                    }

                }

                // Load the default paper theme manually
                appendStylesheet(manywho.cdnUrl + 'css/themes/mw-paper.css');

                var timer = setInterval(function () {

                    if (manywho.utils) {

                        clearInterval(timer);
                        initializeManyWho();
                        
                    }

                }, 10);
                
            });

        }
        
    }

    manywho.loader.initialize();

}(manywho, jQuery));





