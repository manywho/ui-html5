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

manywho.callbacks = (function (manywho) {

    var callbacks = {};

    return {

        register: function (flowKey, options) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            callbacks[lookUpKey] = callbacks[lookUpKey] || [];

            if (!options.flowKey) {

                options.flowKey = flowKey;

            }

            callbacks[lookUpKey].push(options);

        },

        execute: function (flowKey, type, name, mapElementId, args) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            if (callbacks[lookUpKey]) {

                callbacks[lookUpKey].filter(function (item) {

                    if (type && !manywho.utils.isEqual(item.type, type, true)) {

                        return false;

                    }

                    if (name && !manywho.utils.isEqual(item.name, name, true)) {

                        return false;

                    }

                    if (!manywho.utils.isEqual(type, 'done', true) && mapElementId && !manywho.utils.isEqual(item.mapElement, mapElementId, true)) {

                        return false;

                    }

                    return true;

                })
                .forEach(function (item) {

                    item.execute.apply(undefined, [item].concat(item.args || [], args));

                    if (callbacks[lookUpKey] && !item.repeat) {

                        callbacks[lookUpKey].splice(callbacks[lookUpKey].indexOf(item), 1);

                    }

                })

            }

        },

        remove: function(flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            callbacks[lookUpKey] = null;

        }

    }

})(manywho);
