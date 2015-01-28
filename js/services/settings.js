manywho.settings = (function (manywho) {

    var settings = {};

    return {

        initialize: function() {

            settings = {
                themesUri: 'http://api.bootswatch.com/3/'
            }

        },

        get: function (name) {

            return settings[name];

        }

    }

})(manywho);