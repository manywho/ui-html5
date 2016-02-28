/*!
 Copyright 2016 ManyWho, Inc.
 Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
 file except in compliance with the License.
 You may obtain a copy of the License at: http://manywho.com/sharedsource
 Unless required by applicable law or agreed to in writing, software distributed under
 the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied. See the License for the specific language governing
 permissions and limitations under the License.
 */

manywho.responses = (function (manywho) {

    // TODO: this can be determined from the Value binding and the Type, but the rules are a little complicated
    function isTableComponent(pageComponent) {

        if (pageComponent == null) {
            manywho.log.error("The PageComponent cannot be null when detecting if the component should show table data.");
            return null;
        }

        if (manywho.utils.isNullOrWhitespace(pageComponent.componentType)) {
            manywho.log.error("The ComponentType cannot be null or blank when detecting if the component should show table data.");
            return null;
        }

        if (offline.config.components != null &&
            offline.config.components.tables != null &&
            offline.config.components.tables.length > 0) {

            for (var i = 0; i < offline.config.components.tables.length; i++) {

                if (manywho.utils.isEqual(pageComponent.componentType, offline.config.components.tables[i], true)) {

                    return true;

                }

            }

        }

        return false;

    }

    function getValueForComponent(pageComponentInfo) {

        if (pageComponentInfo.pageComponent.valueElementValueBindingReferenceId != null) {

            // Get the object data from the cached value - that's where we source all individual value references
            // This will also make sure the type matches the value, though there's no reliable way of telling if the value
            // being stored in the cache is in fact the value in the binding
            var objectData = manywho.simulation.get(pageComponentInfo.tableName, pageComponentInfo.typeElement.id);

            if (objectData != null) {

                var value = {};

                value.objectData = null;
                value.contentValue = null;

                // We have some object data stored, so we need to get that out
                if (manywho.utils.isNullOrWhitespace(pageComponentInfo.pageComponent.valueElementValueBindingReferenceId.typeElementPropertyId)) {

                    value.objectData = [objectData];

                } else {

                    // Find the property in this object and return that
                    if (objectData.properties != null &&
                        objectData.properties.length > 0) {

                        for (var i = 0; i < objectData.properties.length; i++) {

                            if (manywho.utils.isEqual(
                                    objectData.properties[i].typeElementPropertyId,
                                    pageComponentInfo.pageComponent.valueElementValueBindingReferenceId.typeElementPropertyId,
                                    true)) {

                                // We have a match, return the value information from the object
                                value.contentValue = objectData.properties[i].contentValue;
                                value.objectData = objectData.properties[i].objectData;

                                break;

                            }

                        }

                    }

                }

                return value;

            }

        }

        return null;

    }

    return {

        get: function (identifier) {

            // Get values out of the "state" matched to the page component identifiers
            var response =  offline.config.responses[identifier];

            if (response != null &&
                response.mapElementInvokeResponses &&
                response.mapElementInvokeResponses != null &&
                response.mapElementInvokeResponses.length > 0 &&
                response.mapElementInvokeResponses[0].pageResponse != null &&
                response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses != null &&
                response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses.length) {

                var pageComponentDataResponses = response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses;

                for (var i = 0; i < pageComponentDataResponses.length; i++) {

                    var pageComponentInfo = manywho.graph.getPageComponentInfo(
                        response.currentMapElementId,
                        null,
                        pageComponentDataResponses[i].pageComponentId
                    );

                    if (pageComponentInfo.typeElement &&
                        pageComponentInfo.typeElement != null &&
                        pageComponentInfo.valueElement &&
                        pageComponentInfo.valueElement != null) {

                        if (isTableComponent(pageComponentInfo.pageComponent)) {

                            // This is a list, so get all the data from the offline table and override
                            pageComponentDataResponses[i].objectData = manywho.simulation.getAll(
                                pageComponentInfo.tableName,
                                pageComponentInfo.typeElement.id
                            );

                        } else {

                            var value = getValueForComponent(pageComponentInfo);

                            // If the page component has a value, apply it
                            if (value != null) {

                                pageComponentDataResponses[i].objectData = value.objectData;
                                pageComponentDataResponses[i].contentValue = value.contentValue;

                            }

                        }

                    }

                }

            }

            return response;

        },

        set: function (identifier, responseObject) {

            // Don't set as we're hard coding the cached responses
            //this.cachedResponses[identifier] = responseObject;

        }

    }

})(manywho);