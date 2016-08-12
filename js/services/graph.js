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

    // Utility method for returning the selected outcome for the provided identifier. If the selectedOutcomeId
    // parameter is null, we take the "only" outcome, but return null if there are multiple paths as we don't know
    // which path to follow.
    //
    function getSelectedOutcome(mapElement, selectedOutcomeId) {

        // Find the selected outcome so we can grab the action type
        if (mapElement.outcomes != null &&
            mapElement.outcomes.length > 0) {

            // Return if we have any branching and no selection
            if (manywho.utils.isNullOrWhitespace(selectedOutcomeId)) {

                if (mapElement.outcomes.length > 1) {
                    manywho.log.info('No selected outcome has been provided and there are multiple paths for: ' + mapElement.id);
                    return null;
                }

                return mapElement.outcomes[0];

            }

            // Find the outcome based on the provided selected outcome identifier
            for (var j = 0; j < mapElement.outcomes.length; j++) {

                if (manywho.utils.isEqual(mapElement.outcomes[j].id, selectedOutcomeId, true)) {

                    return mapElement.outcomes[j];

                }

            }

        }

        // Simply return if there's nothing left
        manywho.log.info("The provided Map Element has no matching Outcomes.");
        return null;

    }

    // Utility method for getting the map element from the snapshot for the provided identifier.
    //
    function getMapElement(mapElementId) {

        // Find the map element associated with this request
        if (offline.snapshot.mapElements &&
            offline.snapshot.mapElements != null &&
            offline.snapshot.mapElements.length > 0) {

            for (var j = 0; j < offline.snapshot.mapElements.length; j++) {

                if (manywho.utils.isEqual(offline.snapshot.mapElements[j].id, mapElementId, true)) {

                    return offline.snapshot.mapElements[j];

                }

            }

        }

        manywho.log.error('A MapElement could not be found for provided identifier: ' + mapElementId);
        return;

    }

    // Utility function that checks the current element for logic we can execute offline. We want the offline
    // simulation engine to execute these as well as possible to improve the user journey.
    //
    function checkElementForLogicDependencies(mapElementId, selectedOutcomeId) {

        var logicResult = {};
        logicResult.keepGoing = false;
        logicResult.nextMapElementId = null;
        logicResult.operations = null;
        logicResult.dataActions = null;

        var mapElement = getMapElement(mapElementId);

        // This is a step or input, we don't need to perform any actions and likely don't need to keep executing any
        // simulated logic
        if (manywho.utils.isEqual(mapElement.elementType, 'step') ||
            manywho.utils.isEqual(mapElement.elementType, 'input')) {
            return logicResult;
        }

        // Grab all of the loading data actions in the order in which the author wants the executed. The simulation
        // engine will attempt to grab this data from the synchronized data set matching these requests.
        if (mapElement.dataActions != null &&
            mapElement.dataActions.length > 0) {

            logicResult.dataActions = [];

            // Sort them just in case ordering matters
            var dataActions = mapElement.dataActions.sort(function (a, b) {

                return a.order - b.order;

            });

            for (var i = 0; i < dataActions.length; i++) {

                // We only care about data loads
                if (manywho.utils.isEqual(dataActions[i].crudOperationType, 'load', true)) {

                    // Push the action into the list of actions
                    logicResult.dataActions.push(dataActions[i]);

                }

            }

        }

        // Grab all of the operations in the order in which the author wants the executed. The simulation
        // engine will attempt to apply these operations to the state data.
        if (mapElement.operations != null &&
            mapElement.operations.length > 0) {

            logicResult.operations = [];

            // Sort them just in case ordering matters
            var operations = mapElement.operations.sort(function (a, b) {

                return a.order - b.order;

            });

            for (var i = 0; i < operations.length; i++) {

                // Push the operation into the list of operations
                logicResult.operations.push(operations[i]);

            }

        }

        var selectedOutcome = getSelectedOutcome(mapElement, selectedOutcomeId);

        if (selectedOutcome != null) {

            logicResult.keepGoing = true;
            logicResult.nextMapElementId = selectedOutcome.nextMapElementId;

        }

        return logicResult;

    }

    // Find the type for the provided identifier.
    //
    function getTypeElementForId(typeElementId) {

        if (manywho.utils.isNullOrWhitespace(typeElementId)) {
            manywho.log.error("No TypeElementId was provided to get the associated Type.");
            return null;
        }

        // Find the type element associated with this request, based on the page component
        if (offline.snapshot.typeElements &&
            offline.snapshot.typeElements != null &&
            offline.snapshot.typeElements.length > 0) {

            for (var j = 0; j < offline.snapshot.typeElements.length; j++) {

                if (manywho.utils.isEqual(
                        offline.snapshot.typeElements[j].id,
                        typeElementId,
                        true)) {

                    return offline.snapshot.typeElements[j];

                }

            }

        }

        manywho.log.error('A TypeElement could not be found for the provided identifier.');
        return;

    }

    // Find the value for the provided identifier.
    //
    function getValueElementForId(valueElementId) {

        if (manywho.utils.isNullOrWhitespace(valueElementId)) {
            manywho.log.error("No ValueElementId was provided to get the associated Value.");
            return null;
        }

        // Find the value element associated with this request, based on the page component
        if (offline.snapshot.valueElements &&
            offline.snapshot.valueElements != null &&
            offline.snapshot.valueElements.length > 0) {

            for (var j = 0; j < offline.snapshot.valueElements.length; j++) {

                if (manywho.utils.isEqual(
                        offline.snapshot.valueElements[j].id,
                        valueElementId,
                        true)) {

                    return offline.snapshot.valueElements[j];

                }

            }

        }

        manywho.log.error('A ValueElement could not be found for the provided identifier.');
        return;

    }

    // This is a utility method for getting the action type. The action type can be needed in a number of situations
    // and really represents the aggregate action type for all components, not just the one.
    //
    function getActionTypeForStep(mapElementId, selectedOutcomeId) {

        if (manywho.utils.isNullOrWhitespace(mapElementId)) {
            manywho.log.error("No MapElementId cannot be null when getting the action type.");
            return null;
        }

        if (manywho.utils.isNullOrWhitespace(selectedOutcomeId)) {
            manywho.log.error("No SelectedOutcomeId cannot be null when getting the action type.");
            return null;
        }

        return getSelectedOutcome(getMapElement(mapElementId), selectedOutcomeId).pageActionType;

    }

    // Assemble the metadata for the provided component identifier.
    //
    function getPageComponentInfo(mapElementId, selectedOutcomeId, pageComponentId) {

        var pageComponentInfo = {};

        pageComponentInfo.mapElement = getMapElement(mapElementId);

        var selectedOutcome = getSelectedOutcome(pageComponentInfo.mapElement, selectedOutcomeId);

        // Assign the action type if we have an outcome
        if (selectedOutcome != null) {
            pageComponentInfo.actionType = selectedOutcome.pageActionType;
        }

        if (manywho.utils.isNullOrWhitespace(pageComponentInfo.mapElement.pageElementId)) {
            // We're dealing with a step
            return pageComponentInfo;
        }

        pageComponentInfo.pageElement = null;

        // Find the page element associated with this request, based on the map element
        if (offline.snapshot.pageElements &&
            offline.snapshot.pageElements != null &&
            offline.snapshot.pageElements.length > 0) {

            for (var j = 0; j < offline.snapshot.pageElements.length; j++) {

                if (manywho.utils.isEqual(
                        offline.snapshot.pageElements[j].id,
                        pageComponentInfo.mapElement.pageElementId,
                        true)) {

                    pageComponentInfo.pageElement = offline.snapshot.pageElements[j];
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

        pageComponentInfo.valueElement = getValueElementForId(pageComponentInfo.pageComponent.valueElementValueBindingReferenceId.id);

        if (manywho.utils.isNullOrWhitespace(pageComponentInfo.valueElement.typeElementId)) {
            manywho.log.error('The State is trying to store data for a PageComponent that does not have a Typed ' +
                'Value. This is not yet supported.');
            return;
        }

        pageComponentInfo.typeElement = getTypeElementForId(pageComponentInfo.valueElement.typeElementId);
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

    return {

        emptyElementId: "00000000-0000-0000-0000-000000000000",

        // Returns the action type for the map element identifier and selected outcome identifier.
        //
        getActionTypeForStep: function(mapElementId, selectedOutcomeId) {

            return getActionTypeForStep(mapElementId, selectedOutcomeId);

        },

        // Scan for all data actions in the provided path so the offline engine can best simulate how the platform will
        // behave when online.
        //
        checkElementForLogic: function(mapElementId, selectedOutcomeId) {

            // If this map element is an empty map element then we assume it's a default page for situations where
            // the user is offline and we don't have a cached response already
            if (manywho.utils.isEqual(mapElementId, manywho.graph.emptyElementId, true)) {
                return null;
            }

            return checkElementForLogicDependencies(mapElementId, selectedOutcomeId);

        },

        // Returns the outcome path the engine should follow either because the user selected the outcome or because
        // it is the only outcome path that can be followed according to the structure of the Flow.
        //
        getOutcomeForPath: function(mapElementId, selectedOutcomeId) {

            return getSelectedOutcome(getMapElement(mapElementId), selectedOutcomeId);

        },

        // Returns the value element for the provided identifier.
        //
        getValueElementForId: function(valueElementId) {

            return getValueElementForId(valueElementId);

        },

        // Returns the type element for the provided identifier.
        //
        getTypeElementForId: function(typeElementId) {

            return getTypeElementForId(typeElementId);

        },

        // Assemble all of the snapshot information about the provided page component so we can treat the data appropriately
        // in the offline logic.
        //
        getPageComponentInfo: function(mapElementId, selectedOutcomeId, pageComponentId) {

            return getPageComponentInfo(mapElementId, selectedOutcomeId, pageComponentId);

        }

    }

})(manywho);