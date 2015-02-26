manywho.settings = (function (manywho, $) {

    var globals = {
        paging: {
            table: 10,
            select: 250
        }
    };

    var flows = {};

    var themes = {
        url: '/css/themes'
    }

    var events = {
        initialization: {},
        invoke: {},
        sync: {},
        navigation: {},
        join: {},
        login: {},
        objectData: {},
        getFlowByName: {}
    }

    // Stolen from here: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
    function getValueByPath (obj, path) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            obj = obj[path[i]];
        }
        return obj;
    }

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

        initialize: function(custom, handlers) {

            globals = $.extend(globals, custom);
            events = $.extend(events, handlers);

            toLowerCaseKeys(globals);
            toLowerCaseKeys(events);

        },

        initializeFlow: function(settings, flowKey) {

            flows[flowKey] = settings;
            toLowerCaseKeys(flows[flowKey]);

        },

        global: function (path) {

            return getValueByPath(globals, path.toLowerCase());

        },

        flow: function(path, flowKey) {

            return getValueByPath(flows[flowKey] || {}, path.toLowerCase());

        },

        event: function (path) {

            return getValueByPath(events, path.toLowerCase());

        },

        theme: function (path) {

            return getValueByPath(themes, path.toLowerCase());

        }

    }

})(manywho, jQuery);