manywho.themeing = (function (manywho, $) {

    var themes = null;

    return {
        
        initialize: function () {

            $.get(manywho.settings.get('themesUri'))
                .done(function(data) {
                    
                    log.info('Loaded ' + data.themes.length + ' themes')
                    themes = data.themes;

                })
                .fail(function() {
                    
                    log.error("Failed to load themes from: ");

                })
            
        },

        apply: function (name) {

            if (themes != null) {

                var theme = themes.filter(function (item) {
                    return item.name.toLowerCase() == name.toLowerCase();
                })[0];

                if (theme) {

                    log.info("Switching theme to: " + name);

                    var link = document.getElementById('theme');
                    link.setAttribute('href', 'https:' + theme.cssCdn);

                }
                else {

                    log.error(name + ' theme cannot be found');

                }

            }
            
        }

    }

})(manywho, jQuery);