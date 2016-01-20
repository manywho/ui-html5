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

manywho.component = (function (manywho) {

    var components = {};
    var aliases = {};

    function getComponentType(item) {

        if ('containerType' in item) {

            return item.containerType;

        }
        else if ('componentType' in item) {

            return item.componentType;

        }

        return null;

    }

    return {

        mixins: {},

        contentTypes: {
            string: 'CONTENTSTRING',
            number: 'CONTENTNUMBER',
            boolean: 'CONTENTBOOLEAN',
            password: 'CONTENTPASSWORD',
            datetime: 'CONTENTDATETIME',
            content: 'CONTENTCONTENT',
            object: 'CONTENTOBJECT',
            list: 'CONTENTLIST'
        },

        register: function (name, component, alias) {

            components[name.toLowerCase()] = component;

            if (alias) {

                alias.forEach(function (aliasName) {

                    aliases[aliasName.toLowerCase()] = name.toLowerCase();

                });

            }

        },

        get: function(item) {

            var componentType = getComponentType(item).toLowerCase();

            if (aliases[componentType]) {

                componentType = aliases[componentType];

            }

            if (components.hasOwnProperty(componentType)) {

                return components[componentType];

            }
            else {

                manywho.log.error('Component of type: ' + componentType + ' could not be found');
                throw 'Component of type: ' + componentType + ' could not be found';

            }

        },

        getByName: function (name) {

            if (name && aliases[name.toLowerCase()]) {

                name = aliases[name.toLowerCase()];

            }

            return components[name.toLowerCase()];

        },

        getChildComponents: function (children, id, flowKey) {

            return children
                .sort(function (a, b) {

                    return a.order - b.order;

                })
                .map(function (item) {

                    var component = this.get(item);
                    return React.createElement(component, { id: item.id, parentId: id, flowKey: flowKey, key: item.id });

                }, this);

        },

        getOutcomes: function(outcomes, flowKey)
        {

            return outcomes
                .sort(function (a, b) {

                    return a.order - b.order;

                })
                .map(function (item) {

                    return React.createElement(components['outcome'], { id: item.id, flowKey: flowKey, key: item.id });

                });

        },

        handleEvent: function (component, model, flowKey) {

            if (model.hasEvents) {

                // Re-sync with the server here so that any events attached to the component are processed
                manywho.engine.sync(flowKey).then(function() {

                    manywho.engine.render(flowKey);

                });

                manywho.collaboration.sync(flowKey);

            }

            component.forceUpdate();

        },

        getSelectedRows: function (model, selectedIds) {

            var selectedObjectData = [];

            if (selectedIds) {

                for (selectedId in selectedIds) {

                    if (!manywho.utils.isNullOrWhitespace(selectedIds[selectedId])) {

                        selectedObjectData = selectedObjectData.concat(model.objectData.filter(function (item) {

                            return manywho.utils.isEqual(item.externalId, selectedIds[selectedId], true);

                        })
                        .map(function (item) {

                            item.isSelected = true;
                            return item;

                        }));

                    }

                }

            }

            return selectedObjectData;
        },

        getDisplayColumns: function (columns) {

            var displayColumns = null;

            if (columns) {

                displayColumns = columns.filter(function (column) {

                    return column.isDisplayValue;

                });

            }

            if (!displayColumns || displayColumns.length == 0) {

                manywho.log.error('No display columns found');

            }

            return displayColumns;

        },

        appendFlowContainer: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            var container = document.getElementById(lookUpKey);
            var containerType = manywho.utils.extractElement(flowKey);

            // Added this fix because embedded Flows and normal Flows should not be positioned absolute
            // on their main container, that should only happen for modal containers

            var containerClasses = 'mw-bs flow-container';

            if (manywho.utils.isEqual(containerType, 'modal', true)) {

                containerClasses+= ' modal-container';

            }

            if (!container && !manywho.utils.isEqual(containerType, 'modal-standalone', true)) {

                var manywhoContainer = document.querySelector(manywho.settings.global('containerSelector', flowKey, '#manywho'));

                container = document.createElement('div');
                container.setAttribute('id', lookUpKey);
                container.className = containerClasses;
                container.style.minHeight = manywhoContainer.clientHeight + 'px';
                manywhoContainer.appendChild(container);

            }
            else if (manywho.utils.isEqual(containerType, 'modal-standalone', true)) {

                container = document.querySelector(manywho.settings.global('containerSelector', flowKey, '#manywho'));

            }

            return container;

        },

        focusInput: function (flowKey) {

            // focus the first input or textarea control on larger screen devices, this should help stop a keyboard from becoming visible
            // on mobile devices when the flow first renders
            if (manywho.settings.flow('autofocusinput', flowKey) && window.innerWidth > 768) {

                var input = document.querySelector('.main input, .main textarea, .modal-container input, .modal-container textarea');
                if (input) {

                    input.focus();
                    input.setSelectionRange(input.value.length, input.value.length);

                }

            }

        },

        scrollToTop: function (flowKey) {

            var lookUpKey = manywho.utils.getLookUpKey(flowKey);

            var container = document.getElementById(lookUpKey);
            if (container) {

                window.scroll(0, container.offsetTop);

            }

        }

    }

}(manywho));
