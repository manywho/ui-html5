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

manywho.graph = (function (manywho) {

    return {

        getPageComponentInfo: function(mapElementId, selectedOutcomeId, pageComponentId) {

            var pageComponentInfo = {};

            pageComponentInfo.mapElement = null;

            // Find the map element associated with this request
            if (offline.config.snapshot.mapElements &&
                offline.config.snapshot.mapElements != null &&
                offline.config.snapshot.mapElements.length > 0) {

                for (var j = 0; j < offline.config.snapshot.mapElements.length; j++) {

                    if (manywho.utils.isEqual(offline.config.snapshot.mapElements[j].id, mapElementId, true)) {

                        pageComponentInfo.mapElement = offline.config.snapshot.mapElements[j];
                        break;

                    }

                }

            }

            if (pageComponentInfo.mapElement == null) {
                manywho.log.error('A MapElement could not be found for current request.');
                return;
            }

            // Find the selected outcome so we can grab the action type
            if (pageComponentInfo.mapElement.outcomes != null &&
                pageComponentInfo.mapElement.outcomes.length > 0 &&
                manywho.utils.isNullOrWhitespace(selectedOutcomeId) == false) {

                for (var j = 0; j < pageComponentInfo.mapElement.outcomes.length; j++) {

                    if (manywho.utils.isEqual(pageComponentInfo.mapElement.outcomes[j].id, selectedOutcomeId, true)) {

                        pageComponentInfo.actionType = pageComponentInfo.mapElement.outcomes[j].pageActionType;

                    }

                }

            } else {

                pageComponentInfo.actionType = null;

            }

            if (manywho.utils.isNullOrWhitespace(pageComponentInfo.mapElement.pageElementId)) {
                // We're dealing with a step
                return pageComponentInfo;
            }

            pageComponentInfo.pageElement = null;

            // Find the page element associated with this request, based on the map element
            if (offline.config.snapshot.pageElements &&
                offline.config.snapshot.pageElements != null &&
                offline.config.snapshot.pageElements.length > 0) {

                for (var j = 0; j < offline.config.snapshot.pageElements.length; j++) {

                    if (manywho.utils.isEqual(
                            offline.config.snapshot.pageElements[j].id,
                            pageComponentInfo.mapElement.pageElementId,
                            true)) {

                        pageComponentInfo.pageElement = offline.config.snapshot.pageElements[j];
                        break;

                    }

                }

            }

            if (pageComponentInfo.pageElement == null) {
                manywho.log.error('A PageElement could not be found for current request.');
                return;
            }

            pageComponentInfo.pageComponent = null;

            if (pageComponentInfo.pageElement.pageComponents != null &&
                pageComponentInfo.pageElement.pageComponents.length > 0) {

                // Find the page element associated with this request, based on the map element
                for (var j = 0; j < pageComponentInfo.pageElement.pageComponents.length; j++) {

                    if (manywho.utils.isEqual(pageComponentInfo.pageElement.pageComponents[j].id, pageComponentId, true)) {

                        pageComponentInfo.pageComponent = pageComponentInfo.pageElement.pageComponents[j];
                        break;

                    }

                }

            }

            if (pageComponentInfo.pageComponent == null) {
                manywho.log.error('The PageComponent could not be found for the request.');
                return;
            }

            // Get any important attributes out that will help assist offline
            if (pageComponentInfo.pageComponent.attributes &&
                pageComponentInfo.pageComponent.attributes != null &&
                pageComponentInfo.pageComponent.attributes.offlineTable &&
                manywho.utils.isNullOrWhitespace(pageComponentInfo.pageComponent.attributes.offlineTableName) == false) {

                pageComponentInfo.tableName = pageComponentInfo.pageComponent.attributes.offlineTableName;

            } else {

                pageComponentInfo.tableName = null;

            }


            if (pageComponentInfo.pageComponent.valueElementValueBindingReferenceId == null ||
                (pageComponentInfo.pageComponent.valueElementValueBindingReferenceId != null &&
                manywho.utils.isNullOrWhitespace(pageComponentInfo.pageComponent.valueElementValueBindingReferenceId.id))) {

                // As the field is unbound, we can't grab any more info on this component
                return pageComponentInfo;

            }

            pageComponentInfo.valueElement = null;

            // Find the value element associated with this request, based on the page component
            if (offline.config.snapshot.valueElements &&
                offline.config.snapshot.valueElements != null &&
                offline.config.snapshot.valueElements.length > 0) {

                for (var j = 0; j < offline.config.snapshot.valueElements.length; j++) {

                    if (manywho.utils.isEqual(
                            offline.config.snapshot.valueElements[j].id,
                            pageComponentInfo.pageComponent.valueElementValueBindingReferenceId.id,
                            true)) {

                        pageComponentInfo.valueElement = offline.config.snapshot.valueElements[j];
                        break;

                    }

                }

            }

            if (pageComponentInfo.valueElement == null) {
                manywho.log.error('A ValueElement could not be found for current request.');
                return;
            }

            if (manywho.utils.isNullOrWhitespace(pageComponentInfo.valueElement.typeElementId)) {
                manywho.log.error('The State is trying to store data for a PageComponent that does not have a Typed ' +
                    'Value. This is not yet supported.');
                return;
            }

            pageComponentInfo.typeElement = null;

            // Find the type element associated with this request, based on the value element
            if (offline.config.snapshot.typeElements &&
                offline.config.snapshot.typeElements != null &&
                offline.config.snapshot.typeElements.length > 0) {

                for (var j = 0; j < offline.config.snapshot.typeElements.length; j++) {

                    if (manywho.utils.isEqual(
                            offline.config.snapshot.typeElements[j].id,
                            pageComponentInfo.valueElement.typeElementId,
                            true)) {

                        pageComponentInfo.typeElement = offline.config.snapshot.typeElements[j];
                        break;

                    }

                }

            }

            if (pageComponentInfo.typeElement == null) {
                manywho.log.error('A TypeElement could not be found for current request.');
                return;
            }

            pageComponentInfo.typeElementProperty = null;

            // Find the type element associated with this request, based on the value element
            if (pageComponentInfo.typeElement.properties != null &&
                pageComponentInfo.typeElement.properties.length > 0) {

                for (var j = 0; j < pageComponentInfo.typeElement.properties.length; j++) {

                    if (manywho.utils.isEqual(
                            pageComponentInfo.typeElement.properties[j].id,
                            pageComponentInfo.pageComponent.valueElementValueBindingReferenceId.typeElementPropertyId,
                            true)) {

                        pageComponentInfo.typeElementProperty = pageComponentInfo.typeElement.properties[j];
                        break;

                    }

                }

            }

            return pageComponentInfo;

        }

    }

})(manywho);