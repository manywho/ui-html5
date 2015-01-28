manywho.settings = (function (manywho, $) {

    var settings = {};

    return {

        initialize: function(custom) {

            defaults = {
                themesUri: 'http://api.bootswatch.com/3/',
                initialization: {},
                invoke: {},
                sync: {},
                navigation: {}
            }

            // Replace this with a call to /js/constants
            var constants = {}

            settings = $.extend({}, constants, defaults, custom);

            for (prop in settings) {

                var temp = settings[prop];
                delete settings[prop];
                settings[prop.toLowerCase()] = temp;

            }
            
        },

        get: function (name) {

            return settings[name.toLowerCase()];

        }

    }

})(manywho, jQuery);