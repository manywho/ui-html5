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

    // Utility method for creating a base Value Element shell object.
    //
    function createValueElement(valueElementId, developerName, contentType) {

        return {
            "isFixed": true,
            "isVersionless": false,
            "access": "PRIVATE",
            "contentType": contentType,
            "contentFormat": null,
            "defaultContentValue": null,
            "defaultObjectData": null,
            "initializationOperations": null,
            "typeElementId": null,
            "typeElementDeveloperName": null,
            "updateByName": false,
            "id": valueElementId,
            "elementType": "VARIABLE",
            "developerName": developerName,
            "developerSummary": null
        };

    }

    // Utility method that returns system values that may be getting referenced at runtime. These system values do not
    // act in the same way offline as they do online as we don't have the same information available.
    //
    function getSystemValueElement(valueElementId) {

        var valueElement = null;

        if (manywho.utils.isEqual("03DC41DD-1C6B-4B33-BF61-CBD1D0778FFF", valueElementId, true)) {
            // This is a $User reference
            valueElement = createValueElement("03DC41DD-1C6B-4B33-BF61-CBD1D0778FFF", '$User', manywho.component.contentTypes.object);
            valueElement.defaultObjectData = [
                {
                    "externalId": "03DC41DD-1C6B-4B33-BF61-CBD1D0778FFF",
                    "internalId": "03DC41DD-1C6B-4B33-BF61-CBD1D0778FFF",
                    "developerName": "$User",
                    "properties": [
                        { "typeElementPropertyId": "90262141-02B2-4F2C-8107-B14CF859DE4D", "developerName": "User ID", "contentValue": null },
                        { "typeElementPropertyId": "D8839B46-C43B-4435-9395-BD00491DA16E", "developerName": "Username", "contentValue": null },
                        { "typeElementPropertyId": "601DDC6A-FFF4-478B-ABE4-C4E65BC901C6", "developerName": "Email", "contentValue": null },
                        { "typeElementPropertyId": "6E1D4D49-AB0D-4475-9488-CF4A71D36BEB", "developerName": "First Name", "contentValue": null },
                        { "typeElementPropertyId": "E525AAAE-C900-47FC-9A20-D10C52CFC203", "developerName": "Last Name", "contentValue": null },
                        { "typeElementPropertyId": "88EC74A3-B75D-4C1C-89E4-D142159FD5E4", "developerName": "Language", "contentValue": null },
                        { "typeElementPropertyId": "4FB64B42-A370-455E-85ED-D9A0A8723A43", "developerName": "Country", "contentValue": null },
                        { "typeElementPropertyId": "641F4870-8BF6-4CD9-9654-2AA04C542F43", "developerName": "Brand", "contentValue": null },
                        { "typeElementPropertyId": "A20A1786-7318-4688-81EC-738337442C56", "developerName": "Variant", "contentValue": null },
                        { "typeElementPropertyId": "4FA61B42-A370-455E-85ED-D9A0A8723A43", "developerName": "Location", "contentValue": null },
                        { "typeElementPropertyId": "4FA61B52-A370-455E-85ED-D9A0A8723A43", "developerName": "Directory Id", "contentValue": null },
                        { "typeElementPropertyId": "4FA61B45-A370-455E-85ED-D9A0A8723A43", "developerName": "Directory Name", "contentValue": null },
                        { "typeElementPropertyId": "5582D6D3-B673-4972-A65F-9E915C0C10AA", "developerName": "Role Id", "contentValue": null },
                        { "typeElementPropertyId": "D9904FDD-8F19-4f26-96C1-83EC2f58A540", "developerName": "Role Name", "contentValue": null },
                        { "typeElementPropertyId": "CE98CE03-41EE-405D-B849-509974610D7F", "developerName": "Primary Group Id", "contentValue": null },
                        { "typeElementPropertyId": "F26BA831-B013-4654-8AE3-8EB3AB5E6C1E", "developerName": "Primary Group Name", "contentValue": null },
                        { "typeElementPropertyId": "4FA61B46-A370-455E-85ED-D9A0A8723A43", "developerName": "Status", "contentValue": null },
                        { "typeElementPropertyId": "4FA61B47-A370-455E-85ED-D9A0A8723A43", "developerName": "AuthenticationType", "contentValue": null },
                        { "typeElementPropertyId": "4FA61B48-A370-455E-85ED-D9A0A8723A43", "developerName": "LoginUrl", "contentValue": null }
                    ]
                }
            ];
        } else if (manywho.utils.isEqual("BE1BC78E-FD57-40EC-9A86-A815DE2A9E28", valueElementId, true)) {
            // This is a $True reference
            valueElement = createValueElement("BE1BC78E-FD57-40EC-9A86-A815DE2A9E28", '$True', manywho.component.contentTypes.boolean);
            valueElement.defaultContentValue = 'True';
        } else if (manywho.utils.isEqual("496FD041-D91F-48FB-AA4F-91C6C9A11CA1", valueElementId, true)) {
            // This is a $False reference
            valueElement = createValueElement("496FD041-D91F-48FB-AA4F-91C6C9A11CA1", '$False', manywho.component.contentTypes.boolean);
            valueElement.defaultContentValue = 'False';
        } else if (manywho.utils.isEqual("E2063196-3C75-4388-8B00-1005B8CD59AD", valueElementId, true)) {
            // This is a $JoinUri reference
            valueElement = createValueElement("E2063196-3C75-4388-8B00-1005B8CD59AD", '$JoinUri', manywho.component.contentTypes.string);
            valueElement.defaultContentValue = '';
        } else if (manywho.utils.isEqual("03DC41DD-1C6B-4B33-BF61-CBD1D0778FFF", valueElementId, true)) {
            // This is a $Location reference
            valueElement = createValueElement("4FA61B42-A370-455E-85ED-D9A0A8723A43", '$Location', manywho.component.contentTypes.object);
            valueElement.defaultObjectData = [
                {
                    "externalId": "4FA61B42-A370-455E-85ED-D9A0A8723A43",
                    "internalId": "4FA61B42-A370-455E-85ED-D9A0A8723A43",
                    "developerName": "$Location",
                    "properties": [
                        { "typeElementPropertyId": "FFC4CBD6-FA28-4141-95A4-DA9BACDB0203", "developerName": "Location Timestamp", "contentValue": null },
                        { "typeElementPropertyId": "9270A449-9AD5-4C57-B952-DC4551210ABA", "developerName": "Current Latitude", "contentValue": null },
                        { "typeElementPropertyId": "0A198B4B-1890-4B3B-B09C-E215C7C1458B", "developerName": "Current Longitude", "contentValue": null },
                        { "typeElementPropertyId": "4DB3CE7A-E758-4202-B2E5-E2A21C2A25FD", "developerName": "Location Accuracy", "contentValue": null },
                        { "typeElementPropertyId": "6242AA3F-2796-42ED-9262-EF77EE7405E2", "developerName": "Current Altitude", "contentValue": null },
                        { "typeElementPropertyId": "A68965D6-0461-4EFE-8F63-F05C406E6F2B", "developerName": "Altitude Accuracy", "contentValue": null },
                        { "typeElementPropertyId": "6F0BEE99-ECFB-4B63-A034-F7807244C2B8", "developerName": "Current Heading", "contentValue": null },
                        { "typeElementPropertyId": "22C772BF-7BC2-4EC3-A44A-F8387751D32C", "developerName": "Current Speed", "contentValue": null }
                    ]
                }
            ];
        } else if (manywho.utils.isEqual("1F2A56FD-E14B-460C-AABD-9FBF344B84F3", valueElementId, true)) {
            // This is a $State reference
            valueElement = createValueElement("4FA61B42-A370-455E-85ED-D9A0A8723A43", '$State', manywho.component.contentTypes.object);
            valueElement.defaultObjectData = [
                {
                    "externalId": "1F2A56FD-E14B-460C-AABD-9FBF344B84F3",
                    "internalId": "1F2A56FD-E14B-460C-AABD-9FBF344B84F3",
                    "developerName": "$State",
                    "properties": [
                        { "typeElementPropertyId": "A4368EA1-F120-47A1-A67B-A8CE9452C127", "developerName": "ID", "contentValue": null },
                        { "typeElementPropertyId": "C0986C48-DBC5-43C6-9222-3F8F3D4E2247", "developerName": "Parent ID", "contentValue": null },
                        { "typeElementPropertyId": "6BA0852D-CED1-428E-BE7E-6F80D4B85F1F", "developerName": "External ID", "contentValue": null },
                        { "typeElementPropertyId": "5BB41D1F-8F1D-4028-AE44-763617537338", "developerName": "Flow ID", "contentValue": null },
                        { "typeElementPropertyId": "B43B6AFA-2E56-461A-AD96-2B74BC92C90D", "developerName": "Flow Version ID", "contentValue": null },
                        { "typeElementPropertyId": "45BB98B0-9C3D-47F2-B708-1327E5CD1DCA", "developerName": "Flow Developer Name", "contentValue": null },
                        { "typeElementPropertyId": "43FF2B25-78D8-4279-B517-3F82A888084C", "developerName": "Is Done?", "contentValue": null },
                        { "typeElementPropertyId": "EB621350-D117-4C16-848E-0DCE15021093", "developerName": "Owner ID", "contentValue": null },
                        { "typeElementPropertyId": "EAE019C3-EA80-4DAC-844E-BAFD1A90861F", "developerName": "Owner User ID", "contentValue": null },
                        { "typeElementPropertyId": "8D39A782-3A8A-4816-A660-823CFDAF190D", "developerName": "Owner First Name", "contentValue": null },
                        { "typeElementPropertyId": "1E453F03-6365-452C-BE93-43E37B270ADD", "developerName": "Owner Last Name", "contentValue": null },
                        { "typeElementPropertyId": "F72489D4-2175-4095-B4D0-113FB489F0D9", "developerName": "Owner Username", "contentValue": null },
                        { "typeElementPropertyId": "329A5FC0-F665-44F0-B5A9-A4DD39040FF2", "developerName": "Owner Email", "contentValue": null },
                        { "typeElementPropertyId": "0289AFC0-4F92-4C5A-A07D-3AF40B8F2F00", "developerName": "Owner Name", "contentValue": null },
                        { "typeElementPropertyId": "DCF75168-8F6E-4FBC-9E9D-543793BC4AFD", "developerName": "Date Created", "contentValue": null },
                        { "typeElementPropertyId": "23F6B3CA-E136-4908-8028-AC6F975441FA", "developerName": "Date Modified", "contentValue": null },
                        { "typeElementPropertyId": "81707A21-EDD7-48D5-AD80-FFCFA3471B6C", "developerName": "Current Map Element ID", "contentValue": null },
                        { "typeElementPropertyId": "AE1EB1E1-1760-41EA-9A02-919781BFF313", "developerName": "Current Map Element Developer Name", "contentValue": null },
                        { "typeElementPropertyId": "1A3B4FC9-912C-486E-A0FC-FF0D9F9796B7", "developerName": "Join URI", "contentValue": null }
                    ]
                }
            ];
        }

        return valueElement;

    }

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

        // Check the system values to see if the value is in there
        var valueElement = getSystemValueElement(valueElementId);

        if (valueElement != null) {
            return valueElement;
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