manywho.themeing = (function (manywho, $) {

    var themes = ['cerulean', 'cosmo', 'cyborg', 'darkly', 'flatly', 'journal', 'lumen', 'paper', 'readable', 'sandstone', 'simplex', 'slate', 'spacelab', 'superhero', 'united', 'yeti'];

    return {
        
        apply: function (name) {

            if (themes != null && name && themes.indexOf(name) != -1) {
                     
                log.info("Switching theme to: " + name);
                // Show loading indicator here

                var url = manywho.settings.get('themeing.uri') + '/mw-' + name + '.css';
                var link = document.getElementById('theme');
                var img = document.createElement('img');

                link.setAttribute('href', url);

                img.onerror = function () {

                    log.info('Finished loading theme: ' + name);
                    // Hide loading indicator here

                }
                img.src = url;

            }
            else {

                log.error(name + ' theme cannot be found');

            }
            
        }

    }

})(manywho, jQuery);