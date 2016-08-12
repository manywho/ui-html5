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
            noResults: 'No Results',
            status: null
        },
        offline: {
            isEnabled: true,
            isCordova: false,
        },
        paging: {
            table: 10,
            files: 10,
            select: 20,
            tiles: 20
        },
        collaboration: {
            uri: 'https://realtime.manywho.com'
        },
        platform: {
            uri: ''
        },
        navigation: {
            isFixed: true,
            isWizard: false
        },
        files: {
            downloadUriPropertyId: '6611067a-7c86-4696-8845-3cdc79c73289',
            downloadUriPropertyName: 'Download Uri'
        },
        richText: {
            url: 'https://cdn.tinymce.com/4/tinymce.min.js',
            fontSize: '14px',
            plugins: [
                "advlist autolink link lists link image charmap print hr anchor spellchecker",
                "searchreplace visualblocks fullscreen wordcount code insertdatetime",
                "media table directionality emoticons contextmenu paste textcolor"
            ],
            toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link mwimage'
        },
        errorMessage: 'Whoops, something went wrong inside ManyWho - if this keeps happening, contact us at support@manywho.com',
        outcomes: {
            display: null,
            isFixed: false,
        },
        shortcuts: {
            progressOnEnter: true
        },
        isFullWidth: false,
        collapsible: {
            default: {
                enabled: false,
                collapsed: false,
                group: null
            }
        },
        history: false,
        containerSelector: '#manywho',
        syncOnUnload: true,
        toggle: {
            shape: 'round',
            background: null
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

    return {

        initialize: function(custom, handlers) {

            globals = manywho.utils.extend(globals, custom, true);
            events = manywho.utils.extend(events, handlers, true);

        },

        initializeFlow: function(settings, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            flows[lookUpKey] = $.extend(true, {}, globals, settings);

        },

        global: function (path, flowKey, defaultValue) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            var globalValue = manywho.utils.getValueByPath(globals, path.toLowerCase());

            if (flowKey) {

                var flowValue = manywho.utils.getValueByPath(flows[lookUpKey] || {}, path.toLowerCase());

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

        getGlobals: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            return manywho.utils.extend(globals, flows[lookUpKey], true);

        },

        flow: function(path, flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (manywho.utils.isNullOrWhitespace(path)) {

                return flows[lookUpKey];

            }
            else {

                return manywho.utils.getValueByPath(flows[lookUpKey] || {}, path.toLowerCase());

            }

        },

        event: function (path) {

            return manywho.utils.getValueByPath(events, path.toLowerCase());

        },

        theme: function (path) {

            return manywho.utils.getValueByPath(themes, path.toLowerCase());

        },

        isDebugEnabled: function (flowKey, value) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (typeof value == 'undefined') {

                return manywho.utils.isEqual(this.flow('mode', flowKey), 'Debug', true) || manywho.utils.isEqual(this.flow('mode', flowKey), 'Debug_StepThrough', true);

            }
            else {

                if (value) {

                    flows[lookUpKey].mode = 'Debug';

                }
                else {

                    flows[lookUpKey].mode = '';

                }

            }

        },

        remove: function(flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            flows[lookUpKey] == null;
            delete flows[lookUpKey];

        }

    }

})(manywho, jQuery);
