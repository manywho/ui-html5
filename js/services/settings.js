manywho.settings = (function (manywho, $) {

    var settings = {};

    // Stolen from here: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
    function getValueByPath (obj, path) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            obj = obj[path[i]];
        };
        return obj;
    };

    function toLowerCaseKeys(obj) {

        for (var prop in obj) {

            var temp = obj[prop];

            if (temp !== null && typeof temp === 'object') {
                toLowerCaseKeys(temp)
            }

            delete obj[prop];
            obj[prop.toLowerCase()] = temp;

        }

    }

    return {

        initialize: function(custom) {

            defaults = {
                themesUri: 'http://api.bootswatch.com/3/',
                collaborationUri: 'http://localhost:4444',
                initialization: {},
                invoke: {},
                sync: {},
                navigation: {},
                objectData: {}
            }

            // Replace this with a call to /js/constants
            var constants = {}

            settings = $.extend({}, constants, defaults, custom);

            toLowerCaseKeys(settings);
        },

        get: function (path) {

            return getValueByPath(settings, path.toLowerCase());

        }

    }

})(manywho, jQuery);