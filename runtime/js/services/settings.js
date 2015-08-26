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

manywho.settings = (function (manywho, $) {

    var globals = {
        localization: {
            initializing: '',
            executing: '',
            loading: '',
            navigating: '',
            syncing: '',
            joining: 'Joining',
            sending: 'Sending',
            returnToParent: 'Return To Parent',
            status: null
        },
        paging: {
            table: 10,
            select: 250
        },
        collaboration: {
            uri: 'https://realtime.manywho.com'
        },
        platform: {
            uri: ''
        },
        navigation: {
            isFixed: true
        },
        files: {
            downloadUriPropertyId: '6611067a-7c86-4696-8845-3cdc79c73289',
            downloadUriPropertyName: 'Download Uri'
        },
        richText: {
            url: 'https://tinymce.cachefly.net/4.1/tinymce.min.js',
            fontSize: '14px',
            plugins: [
                "autolink link lists charmap print hr anchor spellchecker",
                "searchreplace wordcount code insertdatetime",
                "table directionality emoticons paste textcolor"
            ]
        },
        isFullWidth: false,
        collapsible: false,
        containerSelector: '#manywho'
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
        flowOut: {},
        login: {},
        log: {},
        objectData: {},
        fileData: {},
        getFlowByName: {},
        sessionAuthentication: {},
        social: {},
        ping: {}
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

        initialize: function(custom, handlers) {

            globals = $.extend(true, globals, custom);
            events = $.extend(true, events, handlers);

            toLowerCaseKeys(globals);
            toLowerCaseKeys(events);

        },

        initializeFlow: function(settings, flowKey) {

            flows[flowKey] = settings;
            toLowerCaseKeys(flows[flowKey]);

        },

        global: function (path, flowKey, defaultValue) {

            var globalValue = manywho.utils.getValueByPath(globals, path.toLowerCase());

            if (flowKey) {

                var flowValue = manywho.utils.getValueByPath(flows[flowKey] || {}, path.toLowerCase());

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

            if (manywho.utils.isNullOrWhitespace(path)) {

                return flows[flowKey];

            }
            else {

                return manywho.utils.getValueByPath(flows[flowKey] || {}, path.toLowerCase());

            }

        },

        event: function (path) {

            return manywho.utils.getValueByPath(events, path.toLowerCase());

        },

        theme: function (path) {

            return manywho.utils.getValueByPath(themes, path.toLowerCase());

        },

        isDebugEnabled: function (flowKey, value) {

            if (typeof value == 'undefined') {

                return manywho.utils.isEqual(this.flow('mode', flowKey), 'Debug', true) || manywho.utils.isEqual(this.flow('mode', flowKey), 'Debug_StepThrough', true);

            }
            else {

                if (value) {

                    flows[flowKey].mode = 'Debug';

                }
                else {

                    flows[flowKey].mode = '';

                }

            }

        }

    }

})(manywho, jQuery);
