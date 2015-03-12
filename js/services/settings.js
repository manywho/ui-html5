manywho.settings = (function (manywho, $) {

    var globals = {
        paging: {
            table: 10,
            select: 250
        },
        collaboration: {
            uri: 'http://localhost:4444'
        },
        platform: {
            uri: 'https://flow.manywho.com'
        },
        navigation: {
            isFixed: true
        },
        files: {
            downloadUriPropertyId: '6611067a-7c86-4696-8845-3cdc79c73289',
            downloadUriPropertyName: 'Download Uri'
        }
    };

    var flows = {};

    var themes = {
        url: '/css/themes'
    };

    var events = {
        initialization: {},
        invoke: {},
        sync: {},
        navigation: {},
        join: {},
        login: {},
        log: {},
        objectData: {},
        fileData: {},
        getFlowByName: {},
        sessionAuthentication: {},
        social: {},
        ping: {}
    };

    // Stolen from here: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
    function getValueByPath(obj, path) {

        try {

            for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
                obj = obj[path[i]];
            }
            return obj;

        }
        catch (ex) {

            return null;

        }

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

        global: function (path, flowKey, defaultValue) {

            var globalValue = getValueByPath(globals, path.toLowerCase());

            if (flowKey) {

                var flowValue = getValueByPath(flows[flowKey] || {}, path.toLowerCase());

                if (typeof flowValue != 'undefined') {

                    return flowValue

                }
                else if (typeof globalValue != 'undefined') {

                    return globalValue;

                }
                else if (typeof defaultValue != 'undefined') {

                    return defaultValue;

                }
                
            }

            return globalValue;

        },

        flow: function(path, flowKey) {

            return getValueByPath(flows[flowKey] || {}, path.toLowerCase());

        },

        event: function (path) {

            return getValueByPath(events, path.toLowerCase());

        },

        theme: function (path) {

            return getValueByPath(themes, path.toLowerCase());

        },

        isDebugEnabled: function (flowKey) {

            return manywho.utils.isEqual(this.flow('mode', flowKey), 'Debug', true);

        }

    }

})(manywho, jQuery);