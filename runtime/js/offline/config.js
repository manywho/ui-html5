offline.config = (function (offline) {

    var recordings = [];

    return {

        // In memory implementation of a get recording function
        //
        getRecording: function(id) {

            // Get the recording associated with this identifier
            for (var i = 0; i < recordings.length; i++) {

                if (manywho.utils.isEqual(recordings[i].id, id, true) == true) {

                    return recordings[i];

                }

            }

            return null;

        },

        // In memory implementation of a get recordings function
        //
        getRecordings: function() {

            return recordings;

        },

        // In memory implementation of a delete recording function
        //
        deleteRecording: function(recording) {

            if (recording != null &&
                recording.id &&
                !manywho.utils.isNullOrWhitespace(recording.id)) {

                for (var i = 0; i < recordings.length; i++) {

                    if (manywho.utils.isEqual(recording.id, recordings[i].id, true)) {

                        alert('deleting');
                        // Delete the recording
                        recordings = recordings.splice(i, 1);
                        break;

                    }

                }

            }

        },

        // In memory implementation of a create recording function
        //
        createRecording: function(sequence, request) {

            var defaultName = "Recording on " + Date.now();

            // Create an active recording or reset the current one and clone the sequence entries
            // so we know what's been completed
            return {
                id: manywho.simulation.getGuid(),
                name: defaultName,
                stateId: request.stateId,
                nameReference: sequence.name,
                startMapElementId: request.currentMapElementId,
                sequence: sequence.sequence.slice(0)
            };

        },

        // In memory implementation of a save recording function
        //
        saveRecording: function(recording) {

            recordings.push(recording);

        },

        emptyStateId: "00000000-0000-0000-0000-000000000000",

        components: {

            "tables": [
                "table",
                "radio",
                "select",
                "files"
            ]

        },

        sequences: [
            {
                name: null,
                entryMapElementId: "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                entryOutcomeId: "975416c8-8c90-40d5-aaf9-5a92e982e687",
                sequence: [
                    {
                        mapElementId: "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        selectedOutcomeId: "25f3a682-f8d5-46cf-9159-4f2c030697f3"
                    },
                    {
                        mapElementId: "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        selectedOutcomeId: null
                    }
                ]
            }
        ],

        responses: {
            "initialization_3ca32f1c-0278-477b-9ce1-ff88210be747": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "stateToken": null,
                "currentMapElementId": "9467970b-6f7e-48e3-9f8b-ced3a24c93c5",
                "currentStreamId": null,
                "statusCode": "200",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "invoke_9467970b-6f7e-48e3-9f8b-ced3a24c93c5": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=bd3f6e71-d819-4665-913c-ac679dfd9b17",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    },
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    },
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    },
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "navigation_a68e757d-1828-4102-acf1-d4f93f20dd3fa65234b6-f054-4546-9287-ac2726c27684": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "developerName": "Taskify",
                "label": "Taskify",
                "navigationItemResponses": [
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    }
                ],
                "navigationItemDataResponses": [
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    }
                ],
                "tags": null,
                "isVisible": true,
                "isEnabled": true
            },
            "invoke_975416c8-8c90-40d5-aaf9-5a92e982e687": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "developerName": "Task",
                        "pageResponse": {
                            "label": "Task",
                            "pageContainerResponses": [
                                {
                                    "id": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "id": "4a3ce15c-91de-4ed8-b83b-e723c7e9d450",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "id": "d4363bc8-164a-4e79-9cd3-77ae743c71c3",
                                    "developerName": "Subject",
                                    "componentType": "INPUT",
                                    "contentType": "ContentString",
                                    "label": "Subject",
                                    "columns": null,
                                    "size": 25,
                                    "maxSize": 255,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "Enter subject",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "id": "af2d3319-029c-430a-9be5-48b34c44928b",
                                    "developerName": "Description",
                                    "componentType": "TEXTAREA",
                                    "contentType": "ContentString",
                                    "label": "Description",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 2000,
                                    "height": 5,
                                    "width": 100,
                                    "hintValue": "Enter a description of your task",
                                    "helpInfo": "",
                                    "order": 2,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "id": "9657bd93-3aaa-49a0-8891-a3dcbb0b7b28",
                                    "developerName": "Due Date",
                                    "componentType": "INPUT",
                                    "contentType": "ContentDateTime",
                                    "label": "Due Date",
                                    "columns": null,
                                    "size": 35,
                                    "maxSize": 255,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "Due date",
                                    "helpInfo": "",
                                    "order": 3,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "4a3ce15c-91de-4ed8-b83b-e723c7e9d450",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>Task</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "d4363bc8-164a-4e79-9cd3-77ae743c71c3",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": true,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "af2d3319-029c-430a-9be5-48b34c44928b",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "9657bd93-3aaa-49a0-8891-a3dcbb0b7b28",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "SAVE",
                                "isBulkAction": false,
                                "pageObjectBindingId": null,
                                "isOut": false,
                                "id": "25f3a682-f8d5-46cf-9159-4f2c030697f3",
                                "developerName": "Save",
                                "label": "Save",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "NO_SAVE",
                                "pageActionType": "BACK",
                                "isBulkAction": false,
                                "pageObjectBindingId": null,
                                "isOut": false,
                                "id": "5b2191c0-5a81-41a6-8dd3-45d41c022006",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=36001b12-b352-4a75-9617-6452e31378d4",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "navigation_a71644fc-d421-4025-99ec-453e8648df60a65234b6-f054-4546-9287-ac2726c27684": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "developerName": "Taskify",
                "label": "Taskify",
                "navigationItemResponses": [
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    }
                ],
                "navigationItemDataResponses": [
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    }
                ],
                "tags": null,
                "isVisible": true,
                "isEnabled": true
            },
            "invoke_25f3a682-f8d5-46cf-9159-4f2c030697f3": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": [
                                        {
                                            "internalId": "d1caf4f8-3b46-4445-978e-d692ff6488a9",
                                            "externalId": "d1caf4f8-3b46-4445-978e-d692ff6488a9",
                                            "developerName": "Task",
                                            "typeElementId": "f20368e7-b079-47ba-8914-f464ef23f4de",
                                            "order": 0,
                                            "properties": [
                                                {
                                                    "typeElementPropertyId": "e2f11a5f-4479-46b7-9a1e-e395395f2239",
                                                    "developerName": "Description",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                                    "developerName": "Due Date",
                                                    "contentValue": "",
                                                    "contentType": "ContentDateTime",
                                                    "contentFormat": "dd MMM yyyy",
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                                    "developerName": "Subject",
                                                    "contentValue": "asdf",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                }
                                            ],
                                            "isSelected": true,
                                            "tableName": null
                                        }
                                    ],
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=36001b12-b352-4a75-9617-6452e31378d4",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "navigation_2829eb53-490d-41a5-91b6-220079e419d3a65234b6-f054-4546-9287-ac2726c27684": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "developerName": "Taskify",
                "label": "Taskify",
                "navigationItemResponses": [
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    }
                ],
                "navigationItemDataResponses": [
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    }
                ],
                "tags": null,
                "isVisible": true,
                "isEnabled": true
            },
            "invoke_1606f66f-6716-43bb-9ccf-9ea4bbc1e96a": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "developerName": "Task",
                        "pageResponse": {
                            "label": "Task",
                            "pageContainerResponses": [
                                {
                                    "id": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "id": "4a3ce15c-91de-4ed8-b83b-e723c7e9d450",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "id": "d4363bc8-164a-4e79-9cd3-77ae743c71c3",
                                    "developerName": "Subject",
                                    "componentType": "INPUT",
                                    "contentType": "ContentString",
                                    "label": "Subject",
                                    "columns": null,
                                    "size": 25,
                                    "maxSize": 255,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "Enter subject",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "id": "af2d3319-029c-430a-9be5-48b34c44928b",
                                    "developerName": "Description",
                                    "componentType": "TEXTAREA",
                                    "contentType": "ContentString",
                                    "label": "Description",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 2000,
                                    "height": 5,
                                    "width": 100,
                                    "hintValue": "Enter a description of your task",
                                    "helpInfo": "",
                                    "order": 2,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "id": "9657bd93-3aaa-49a0-8891-a3dcbb0b7b28",
                                    "developerName": "Due Date",
                                    "componentType": "INPUT",
                                    "contentType": "ContentDateTime",
                                    "label": "Due Date",
                                    "columns": null,
                                    "size": 35,
                                    "maxSize": 255,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "Due date",
                                    "helpInfo": "",
                                    "order": 3,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "4a3ce15c-91de-4ed8-b83b-e723c7e9d450",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>Task</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "d4363bc8-164a-4e79-9cd3-77ae743c71c3",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": true,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": "asdf",
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "af2d3319-029c-430a-9be5-48b34c44928b",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "9657bd93-3aaa-49a0-8891-a3dcbb0b7b28",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "SAVE",
                                "isBulkAction": false,
                                "pageObjectBindingId": null,
                                "isOut": false,
                                "id": "25f3a682-f8d5-46cf-9159-4f2c030697f3",
                                "developerName": "Save",
                                "label": "Save",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "NO_SAVE",
                                "pageActionType": "BACK",
                                "isBulkAction": false,
                                "pageObjectBindingId": null,
                                "isOut": false,
                                "id": "5b2191c0-5a81-41a6-8dd3-45d41c022006",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=36001b12-b352-4a75-9617-6452e31378d4",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "navigation_dc29f23d-0a84-4c5f-a266-f69663fb4d31a65234b6-f054-4546-9287-ac2726c27684": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "developerName": "Taskify",
                "label": "Taskify",
                "navigationItemResponses": [
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    }
                ],
                "navigationItemDataResponses": [
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    }
                ],
                "tags": null,
                "isVisible": true,
                "isEnabled": true
            },
            "invoke_5babdccf-1569-474a-a47d-6947e7a3ec46": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": [
                                        {
                                            "internalId": "d1caf4f8-3b46-4445-978e-d692ff6488a9",
                                            "externalId": "d1caf4f8-3b46-4445-978e-d692ff6488a9",
                                            "developerName": "Task",
                                            "typeElementId": "f20368e7-b079-47ba-8914-f464ef23f4de",
                                            "order": 0,
                                            "properties": [
                                                {
                                                    "typeElementPropertyId": "e2f11a5f-4479-46b7-9a1e-e395395f2239",
                                                    "developerName": "Description",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                                    "developerName": "Due Date",
                                                    "contentValue": "",
                                                    "contentType": "ContentDateTime",
                                                    "contentFormat": "dd MMM yyyy",
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                                    "developerName": "Subject",
                                                    "contentValue": "asdf",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                }
                                            ],
                                            "isSelected": true,
                                            "tableName": null
                                        }
                                    ],
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=36001b12-b352-4a75-9617-6452e31378d4",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "navigation_932d5a5e-2082-4bbb-ab20-3b663e3de334a65234b6-f054-4546-9287-ac2726c27684": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "developerName": "Taskify",
                "label": "Taskify",
                "navigationItemResponses": [
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    }
                ],
                "navigationItemDataResponses": [
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    }
                ],
                "tags": null,
                "isVisible": true,
                "isEnabled": true
            },
            "navigation_f7793f8d-d865-49d6-b34b-f4398b36097ba65234b6-f054-4546-9287-ac2726c27684": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "developerName": "Taskify",
                "label": "Taskify",
                "navigationItemResponses": [
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    }
                ],
                "navigationItemDataResponses": [
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    }
                ],
                "tags": null,
                "isVisible": true,
                "isEnabled": true
            },
            "invoke_86f9a674-876b-47fb-b82f-89cd9649950e": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": null,
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": null
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": null
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": null,
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": null
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": null
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": null,
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": null
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": null
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": null,
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": null
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": null
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=bd3f6e71-d819-4665-913c-ac679dfd9b17",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    },
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    },
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    },
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "navigation_b951b56e-8baa-425c-86f1-5bee2e398715a65234b6-f054-4546-9287-ac2726c27684": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "developerName": "Taskify",
                "label": "Taskify",
                "navigationItemResponses": [
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    }
                ],
                "navigationItemDataResponses": [
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": true,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    }
                ],
                "tags": null,
                "isVisible": true,
                "isEnabled": true
            },
            "invoke_6e34c8fb-6fd2-400c-9c78-e3e470c87652": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "developerName": "Task",
                        "pageResponse": {
                            "label": "Task",
                            "pageContainerResponses": [
                                {
                                    "id": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "id": "4a3ce15c-91de-4ed8-b83b-e723c7e9d450",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "id": "d4363bc8-164a-4e79-9cd3-77ae743c71c3",
                                    "developerName": "Subject",
                                    "componentType": "INPUT",
                                    "contentType": "ContentString",
                                    "label": "Subject",
                                    "columns": null,
                                    "size": 25,
                                    "maxSize": 255,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "Enter subject",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "id": "af2d3319-029c-430a-9be5-48b34c44928b",
                                    "developerName": "Description",
                                    "componentType": "TEXTAREA",
                                    "contentType": "ContentString",
                                    "label": "Description",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 2000,
                                    "height": 5,
                                    "width": 100,
                                    "hintValue": "Enter a description of your task",
                                    "helpInfo": "",
                                    "order": 2,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "id": "9657bd93-3aaa-49a0-8891-a3dcbb0b7b28",
                                    "developerName": "Due Date",
                                    "componentType": "INPUT",
                                    "contentType": "ContentDateTime",
                                    "label": "Due Date",
                                    "columns": null,
                                    "size": 35,
                                    "maxSize": 255,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "Due date",
                                    "helpInfo": "",
                                    "order": 3,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "4a3ce15c-91de-4ed8-b83b-e723c7e9d450",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>Task</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "d4363bc8-164a-4e79-9cd3-77ae743c71c3",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": true,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": "asdf",
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "af2d3319-029c-430a-9be5-48b34c44928b",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "9657bd93-3aaa-49a0-8891-a3dcbb0b7b28",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "SAVE",
                                "isBulkAction": false,
                                "pageObjectBindingId": null,
                                "isOut": false,
                                "id": "25f3a682-f8d5-46cf-9159-4f2c030697f3",
                                "developerName": "Save",
                                "label": "Save",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "NO_SAVE",
                                "pageActionType": "BACK",
                                "isBulkAction": false,
                                "pageObjectBindingId": null,
                                "isOut": false,
                                "id": "5b2191c0-5a81-41a6-8dd3-45d41c022006",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=36001b12-b352-4a75-9617-6452e31378d4",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "navigation_a65234b6-f054-4546-9287-ac2726c27684": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "developerName": "Taskify",
                "label": "Taskify",
                "navigationItemResponses": [
                    {
                        "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "developerName": "Tasks",
                        "developerSummary": null,
                        "label": "Tasks",
                        "navigationItems": null,
                        "order": 0
                    },
                    {
                        "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "developerName": "My Task",
                        "developerSummary": null,
                        "label": "My Task",
                        "navigationItems": null,
                        "order": 1
                    },
                    {
                        "id": "eeb6f25a-2bc0-4607-b280-39a24c7bf5a0",
                        "developerName": "Sync",
                        "developerSummary": null,
                        "label": "Sync",
                        "navigationItems": null,
                        "order": 2
                    }
                ],
                "navigationItemDataResponses": [
                    {
                        "navigationItemId": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                        "navigationItemDeveloperName": "Tasks",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "tags": null
                    },
                    {
                        "navigationItemId": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                        "navigationItemDeveloperName": "My Task",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                        "tags": null
                    },
                    {
                        "navigationItemId": "eeb6f25a-2bc0-4607-b280-39a24c7bf5a0",
                        "navigationItemDeveloperName": "Sync",
                        "isActive": false,
                        "isCurrent": false,
                        "isEnabled": true,
                        "isVisible": true,
                        "locationMapElementId": "e7f0e6df-a625-44f2-9dfa-9602de97910f",
                        "tags": null
                    }
                ],
                "tags": null,
                "isVisible": true,
                "isEnabled": true
            },
            "invoke_36001b12-b352-4a75-9617-6452e31378d4": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=36001b12-b352-4a75-9617-6452e31378d4",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "invoke_eeb6f25a-2bc0-4607-b280-39a24c7bf5a0": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "e7f0e6df-a625-44f2-9dfa-9602de97910f",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "e7f0e6df-a625-44f2-9dfa-9602de97910f",
                        "developerName": "Recordings",
                        "pageResponse": {
                            "label": "Recordings",
                            "pageContainerResponses": [
                                {
                                    "id": "68af8fd3-5295-4349-bcd7-da36d955655b",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "68af8fd3-5295-4349-bcd7-da36d955655b",
                                    "id": "f25f94a0-44fc-4e35-a610-66ab3cd4195b",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "68af8fd3-5295-4349-bcd7-da36d955655b",
                                    "id": "50472a2e-2299-40e1-89be-f7892430dedd",
                                    "developerName": "Recordings",
                                    "componentType": "RECORDINGS",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "f25f94a0-44fc-4e35-a610-66ab3cd4195b",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>Recordings</h1>\n<p>Your offline recordings are shown below:</p>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "50472a2e-2299-40e1-89be-f7892430dedd",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "68af8fd3-5295-4349-bcd7-da36d955655b",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": null,
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=36001b12-b352-4a75-9617-6452e31378d4",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "invoke_5b2191c0-5a81-41a6-8dd3-45d41c022006": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": [
                                        {
                                            "internalId": "d1caf4f8-3b46-4445-978e-d692ff6488a9",
                                            "externalId": "d1caf4f8-3b46-4445-978e-d692ff6488a9",
                                            "developerName": "Task",
                                            "typeElementId": "f20368e7-b079-47ba-8914-f464ef23f4de",
                                            "order": 0,
                                            "properties": [
                                                {
                                                    "typeElementPropertyId": "e2f11a5f-4479-46b7-9a1e-e395395f2239",
                                                    "developerName": "Description",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                                    "developerName": "Due Date",
                                                    "contentValue": "",
                                                    "contentType": "ContentDateTime",
                                                    "contentFormat": "dd MMM yyyy",
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                                    "developerName": "Subject",
                                                    "contentValue": "asdf",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                }
                                            ],
                                            "isSelected": true,
                                            "tableName": null
                                        }
                                    ],
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=36001b12-b352-4a75-9617-6452e31378d4",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "invoke_6814836c-8b6e-403d-8948-5163371beed1": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "09ed5157-06de-4318-9ab0-503defb27579",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "09ed5157-06de-4318-9ab0-503defb27579",
                        "developerName": "Delete Check",
                        "pageResponse": {
                            "label": "Delete Check",
                            "pageContainerResponses": [
                                {
                                    "id": "539a5c71-35b2-41e9-adfd-aad744aa9a20",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Step",
                                    "label": null,
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Step",
                                    "pageContainerId": "539a5c71-35b2-41e9-adfd-aad744aa9a20",
                                    "id": "09ed5157-06de-4318-9ab0-503defb27579",
                                    "developerName": "Step Content",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": null,
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": null,
                                    "helpInfo": null,
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "09ed5157-06de-4318-9ab0-503defb27579",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>Delete Task</h1>\n<p>Are you sure you want to delete the task:&nbsp;<strong>asdf</strong></p>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "539a5c71-35b2-41e9-adfd-aad744aa9a20",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": null,
                                "isOut": false,
                                "id": "d2b23d74-df57-4b89-9ac2-40c0d4f61755",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "NO_SAVE",
                                "pageActionType": "BACK",
                                "isBulkAction": false,
                                "pageObjectBindingId": null,
                                "isOut": false,
                                "id": "143f1248-cc9d-4ab8-90d9-d4a0f18becf9",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=36001b12-b352-4a75-9617-6452e31378d4",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "invoke_143f1248-cc9d-4ab8-90d9-d4a0f18becf9": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": "CONTENTSTRING",
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": {}
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": [
                                        {
                                            "internalId": "d1caf4f8-3b46-4445-978e-d692ff6488a9",
                                            "externalId": "d1caf4f8-3b46-4445-978e-d692ff6488a9",
                                            "developerName": "Task",
                                            "typeElementId": "f20368e7-b079-47ba-8914-f464ef23f4de",
                                            "order": 0,
                                            "properties": [
                                                {
                                                    "typeElementPropertyId": "e2f11a5f-4479-46b7-9a1e-e395395f2239",
                                                    "developerName": "Description",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                                    "developerName": "Due Date",
                                                    "contentValue": "",
                                                    "contentType": "ContentDateTime",
                                                    "contentFormat": "dd MMM yyyy",
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                                    "developerName": "Subject",
                                                    "contentValue": "asdf",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                }
                                            ],
                                            "isSelected": true,
                                            "tableName": null
                                        }
                                    ],
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=36001b12-b352-4a75-9617-6452e31378d4",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            },
            "invoke_d2b23d74-df57-4b89-9ac2-40c0d4f61755": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": null,
                "parentStateId": null,
                "stateToken": null,
                "alertEmail": "steve.wood@manywho.com",
                "waitMessage": null,
                "notAuthorizedMessage": null,
                "currentMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                        "developerName": "Tasks",
                        "pageResponse": {
                            "label": "Tasks",
                            "pageContainerResponses": [
                                {
                                    "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "containerType": "VERTICAL_FLOW",
                                    "developerName": "Root",
                                    "label": "",
                                    "pageContainerResponses": null,
                                    "order": 0,
                                    "attributes": null
                                }
                            ],
                            "pageComponentResponses": [
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "developerName": "Intro",
                                    "componentType": "PRESENTATION",
                                    "contentType": null,
                                    "label": "",
                                    "columns": null,
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 0,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": null
                                },
                                {
                                    "pageContainerDeveloperName": "Root",
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "developerName": "Tasks",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Subject",
                                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Subject",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Due Date",
                                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                            "contentFormat": "dd MMM yyyy",
                                            "contentType": "ContentDateTime",
                                            "label": "Due Date",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 1,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        }
                                    ],
                                    "size": 0,
                                    "maxSize": 0,
                                    "height": 0,
                                    "width": 0,
                                    "hintValue": "",
                                    "helpInfo": "",
                                    "order": 1,
                                    "isMultiSelect": false,
                                    "isSearchable": false,
                                    "hasEvents": false,
                                    "attributes": null
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>My Tasks</h1>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": null,
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isVisible": true,
                                    "tags": null
                                }
                            ],
                            "tags": null,
                            "attributes": null,
                            "order": 0
                        },
                        "outcomeResponses": [
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "NEW",
                                "isBulkAction": true,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                                "developerName": "New",
                                "label": "New",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "EDIT",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                                "developerName": "Edit",
                                "label": "Edit",
                                "order": 0
                            },
                            {
                                "pageActionBindingType": "SAVE",
                                "pageActionType": "DELETE",
                                "isBulkAction": false,
                                "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                                "isOut": false,
                                "id": "6814836c-8b6e-403d-8948-5163371beed1",
                                "developerName": "Delete",
                                "label": "Delete",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    }
                ],
                "voteResponse": null,
                "stateLog": null,
                "preCommitStateValues": null,
                "stateValues": null,
                "outputs": null,
                "statusCode": "200",
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=36001b12-b352-4a75-9617-6452e31378d4",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": [
                    {
                        "id": "a65234b6-f054-4546-9287-ac2726c27684",
                        "developerName": "Taskify"
                    }
                ]
            }
        },

        snapshot: {
            "navigationElements": [
                {
                    "dateCreated": "0001-01-01T00:00:00Z",
                    "dateModified": "2016-02-28T06:34:03Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "label": "Taskify",
                    "navigationItems": [
                        {
                            "id": "5babdccf-1569-474a-a47d-6947e7a3ec46",
                            "locationMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                            "developerName": "Tasks",
                            "developerSummary": "",
                            "label": "Tasks",
                            "navigationItems": null,
                            "order": 0,
                            "tags": null
                        },
                        {
                            "id": "1606f66f-6716-43bb-9ccf-9ea4bbc1e96a",
                            "locationMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                            "developerName": "My Task",
                            "developerSummary": "",
                            "label": "My Task",
                            "navigationItems": null,
                            "order": 1,
                            "tags": null
                        },
                        {
                            "id": "eeb6f25a-2bc0-4607-b280-39a24c7bf5a0",
                            "locationMapElementId": "e7f0e6df-a625-44f2-9dfa-9602de97910f",
                            "developerName": "Sync",
                            "developerSummary": "",
                            "label": "Sync",
                            "navigationItems": null,
                            "order": 2,
                            "tags": null
                        }
                    ],
                    "tags": null,
                    "updateByName": false,
                    "id": "a65234b6-f054-4546-9287-ac2726c27684",
                    "elementType": "NAVIGATION",
                    "developerName": "Taskify",
                    "developerSummary": ""
                }
            ],
            "mapElements": [
                {
                    "dateCreated": "2016-02-28T06:31:08Z",
                    "dateModified": "2016-02-28T06:34:03Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "operations": null,
                    "listeners": null,
                    "viewMessageAction": null,
                    "messageActions": null,
                    "dataActions": null,
                    "navigationOverrides": null,
                    "vote": null,
                    "clearNavigationOverrides": false,
                    "postUpdateToStream": false,
                    "userContent": "<h1>Delete Task</h1>\n<p>Are you sure you want to delete the task:&nbsp;<strong>{![Task].[Subject]}</strong></p>",
                    "statusMessage": null,
                    "postUpdateMessage": null,
                    "notAuthorizedMessage": null,
                    "postUpdateWhenType": "",
                    "updateByName": false,
                    "groupElementId": null,
                    "x": 160,
                    "y": 140,
                    "pageElementId": null,
                    "outcomes": [
                        {
                            "id": "d2b23d74-df57-4b89-9ac2-40c0d4f61755",
                            "developerName": "Delete",
                            "developerSummary": null,
                            "label": "Delete",
                            "nextMapElementId": "9936ddb2-b0ba-4628-8a22-84b0684f60af",
                            "pageActionType": "DELETE",
                            "isBulkAction": false,
                            "pageActionBindingType": "SAVE",
                            "pageObjectBindingId": null,
                            "order": 0,
                            "comparison": null,
                            "flowOut": null,
                            "controlPoints": null,
                            "nextMapElementDeveloperName": null
                        },
                        {
                            "id": "143f1248-cc9d-4ab8-90d9-d4a0f18becf9",
                            "developerName": "Back",
                            "developerSummary": null,
                            "label": "Back",
                            "nextMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                            "pageActionType": "BACK",
                            "isBulkAction": false,
                            "pageActionBindingType": "NO_SAVE",
                            "pageObjectBindingId": null,
                            "order": 1,
                            "comparison": null,
                            "flowOut": null,
                            "controlPoints": null,
                            "nextMapElementDeveloperName": null
                        }
                    ],
                    "id": "09ed5157-06de-4318-9ab0-503defb27579",
                    "elementType": "step",
                    "developerName": "Delete Check",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2016-02-28T06:31:38Z",
                    "dateModified": "2016-02-28T06:34:03Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "operations": null,
                    "listeners": null,
                    "viewMessageAction": null,
                    "messageActions": null,
                    "dataActions": null,
                    "navigationOverrides": null,
                    "vote": null,
                    "clearNavigationOverrides": false,
                    "postUpdateToStream": false,
                    "userContent": null,
                    "statusMessage": null,
                    "postUpdateMessage": null,
                    "notAuthorizedMessage": null,
                    "postUpdateWhenType": "",
                    "updateByName": false,
                    "groupElementId": null,
                    "x": 160,
                    "y": 250,
                    "pageElementId": "84a4a6d3-89a3-4a14-931b-b448d4a3c98a",
                    "outcomes": [
                        {
                            "id": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                            "developerName": "New",
                            "developerSummary": null,
                            "label": "New",
                            "nextMapElementId": "77181fd7-04bf-4404-9da5-9f6ec00a6631",
                            "pageActionType": "NEW",
                            "isBulkAction": true,
                            "pageActionBindingType": "SAVE",
                            "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                            "order": 0,
                            "comparison": null,
                            "flowOut": null,
                            "controlPoints": null,
                            "nextMapElementDeveloperName": null
                        },
                        {
                            "id": "6e34c8fb-6fd2-400c-9c78-e3e470c87652",
                            "developerName": "Edit",
                            "developerSummary": null,
                            "label": "Edit",
                            "nextMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                            "pageActionType": "EDIT",
                            "isBulkAction": false,
                            "pageActionBindingType": "SAVE",
                            "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                            "order": 0,
                            "comparison": null,
                            "flowOut": null,
                            "controlPoints": null,
                            "nextMapElementDeveloperName": null
                        },
                        {
                            "id": "6814836c-8b6e-403d-8948-5163371beed1",
                            "developerName": "Delete",
                            "developerSummary": null,
                            "label": "Delete",
                            "nextMapElementId": "09ed5157-06de-4318-9ab0-503defb27579",
                            "pageActionType": "DELETE",
                            "isBulkAction": false,
                            "pageActionBindingType": "SAVE",
                            "pageObjectBindingId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                            "order": 1,
                            "comparison": null,
                            "flowOut": null,
                            "controlPoints": null,
                            "nextMapElementDeveloperName": null
                        }
                    ],
                    "id": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                    "elementType": "input",
                    "developerName": "Tasks",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2015-11-30T04:52:44Z",
                    "dateModified": "2015-11-30T04:54:09Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "operations": [
                        {
                            "valueElementToApplyId": {
                                "id": "990abb4f-43d6-4265-bdd8-e3d47bff63c8",
                                "typeElementPropertyId": null,
                                "command": "NEW"
                            },
                            "valueElementToReferenceId": null,
                            "macroElementToExecuteId": null,
                            "order": 0,
                            "disabled": false,
                            "valueElementToApplyDeveloperName": null,
                            "valueElementToReferenceDeveloperName": null,
                            "valueElementToApplyCommand": null,
                            "valueElementToReferenceCommand": null,
                            "valueElementToApplyCommandFriendly": null,
                            "valueElementToReferenceCommandFriendly": null,
                            "valueElementToApplyContentType": null,
                            "valueElementToApplyTypeElementId": null,
                            "valueElementToReferenceContentType": null,
                            "valueElementToReferenceTypeElementId": null
                        }
                    ],
                    "listeners": null,
                    "viewMessageAction": null,
                    "messageActions": null,
                    "dataActions": null,
                    "navigationOverrides": null,
                    "vote": null,
                    "clearNavigationOverrides": false,
                    "postUpdateToStream": false,
                    "userContent": null,
                    "statusMessage": null,
                    "postUpdateMessage": null,
                    "notAuthorizedMessage": null,
                    "postUpdateWhenType": "",
                    "updateByName": false,
                    "groupElementId": null,
                    "x": 340,
                    "y": 250,
                    "pageElementId": null,
                    "outcomes": [
                        {
                            "id": "d2add916-ab8c-4d78-9c53-56560a547454",
                            "developerName": "Done",
                            "developerSummary": null,
                            "label": "Done",
                            "nextMapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                            "pageActionType": "",
                            "isBulkAction": false,
                            "pageActionBindingType": "SAVE",
                            "pageObjectBindingId": null,
                            "order": 0,
                            "comparison": null,
                            "flowOut": null,
                            "controlPoints": null,
                            "nextMapElementDeveloperName": null
                        }
                    ],
                    "id": "77181fd7-04bf-4404-9da5-9f6ec00a6631",
                    "elementType": "operator",
                    "developerName": "Clear Task",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2015-11-30T04:51:46Z",
                    "dateModified": "2015-11-30T04:54:09Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "operations": null,
                    "listeners": null,
                    "viewMessageAction": null,
                    "messageActions": null,
                    "dataActions": null,
                    "navigationOverrides": null,
                    "vote": null,
                    "clearNavigationOverrides": false,
                    "postUpdateToStream": false,
                    "userContent": null,
                    "statusMessage": null,
                    "postUpdateMessage": null,
                    "notAuthorizedMessage": null,
                    "postUpdateWhenType": "",
                    "updateByName": false,
                    "groupElementId": null,
                    "x": 50,
                    "y": 250,
                    "pageElementId": null,
                    "outcomes": [
                        {
                            "id": "62b3f4b3-31c6-4b05-9316-d071384340c4",
                            "developerName": "Go",
                            "developerSummary": null,
                            "label": "Go",
                            "nextMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                            "pageActionType": "",
                            "isBulkAction": false,
                            "pageActionBindingType": "SAVE",
                            "pageObjectBindingId": null,
                            "order": 0,
                            "comparison": null,
                            "flowOut": null,
                            "controlPoints": null,
                            "nextMapElementDeveloperName": null
                        }
                    ],
                    "id": "9467970b-6f7e-48e3-9f8b-ced3a24c93c5",
                    "elementType": "START",
                    "developerName": "Start",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2015-11-30T04:57:43Z",
                    "dateModified": "2015-11-30T04:58:01Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "operations": [
                        {
                            "valueElementToApplyId": {
                                "id": "5ecc7a98-8e70-464d-ade1-7cbc039f9c61",
                                "typeElementPropertyId": null,
                                "command": "REMOVE"
                            },
                            "valueElementToReferenceId": {
                                "id": "990abb4f-43d6-4265-bdd8-e3d47bff63c8",
                                "typeElementPropertyId": null,
                                "command": ""
                            },
                            "macroElementToExecuteId": null,
                            "order": 0,
                            "disabled": false,
                            "valueElementToApplyDeveloperName": null,
                            "valueElementToReferenceDeveloperName": null,
                            "valueElementToApplyCommand": null,
                            "valueElementToReferenceCommand": null,
                            "valueElementToApplyCommandFriendly": null,
                            "valueElementToReferenceCommandFriendly": null,
                            "valueElementToApplyContentType": null,
                            "valueElementToApplyTypeElementId": null,
                            "valueElementToReferenceContentType": null,
                            "valueElementToReferenceTypeElementId": null
                        },
                        {
                            "valueElementToApplyId": {
                                "id": "990abb4f-43d6-4265-bdd8-e3d47bff63c8",
                                "typeElementPropertyId": null,
                                "command": "NEW"
                            },
                            "valueElementToReferenceId": null,
                            "macroElementToExecuteId": null,
                            "order": 1,
                            "disabled": false,
                            "valueElementToApplyDeveloperName": null,
                            "valueElementToReferenceDeveloperName": null,
                            "valueElementToApplyCommand": null,
                            "valueElementToReferenceCommand": null,
                            "valueElementToApplyCommandFriendly": null,
                            "valueElementToReferenceCommandFriendly": null,
                            "valueElementToApplyContentType": null,
                            "valueElementToApplyTypeElementId": null,
                            "valueElementToReferenceContentType": null,
                            "valueElementToReferenceTypeElementId": null
                        }
                    ],
                    "listeners": null,
                    "viewMessageAction": null,
                    "messageActions": null,
                    "dataActions": null,
                    "navigationOverrides": null,
                    "vote": null,
                    "clearNavigationOverrides": false,
                    "postUpdateToStream": false,
                    "userContent": null,
                    "statusMessage": null,
                    "postUpdateMessage": null,
                    "notAuthorizedMessage": null,
                    "postUpdateWhenType": "",
                    "updateByName": false,
                    "groupElementId": null,
                    "x": 340,
                    "y": 140,
                    "pageElementId": null,
                    "outcomes": [
                        {
                            "id": "790704ce-7ab0-474b-9c95-1ab0d04bd17a",
                            "developerName": "Done",
                            "developerSummary": null,
                            "label": "Done",
                            "nextMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                            "pageActionType": "",
                            "isBulkAction": false,
                            "pageActionBindingType": "SAVE",
                            "pageObjectBindingId": null,
                            "order": 0,
                            "comparison": null,
                            "flowOut": null,
                            "controlPoints": null,
                            "nextMapElementDeveloperName": null
                        }
                    ],
                    "id": "9936ddb2-b0ba-4628-8a22-84b0684f60af",
                    "elementType": "operator",
                    "developerName": "Remove Task",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2016-02-28T06:32:05Z",
                    "dateModified": "2016-02-28T06:34:03Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "operations": null,
                    "listeners": null,
                    "viewMessageAction": null,
                    "messageActions": null,
                    "dataActions": null,
                    "navigationOverrides": null,
                    "vote": null,
                    "clearNavigationOverrides": false,
                    "postUpdateToStream": false,
                    "userContent": null,
                    "statusMessage": null,
                    "postUpdateMessage": null,
                    "notAuthorizedMessage": null,
                    "postUpdateWhenType": "",
                    "updateByName": false,
                    "groupElementId": null,
                    "x": 340,
                    "y": 360,
                    "pageElementId": "b080f7f9-edd7-4ad1-8219-8534a38edd26",
                    "outcomes": [
                        {
                            "id": "25f3a682-f8d5-46cf-9159-4f2c030697f3",
                            "developerName": "Save",
                            "developerSummary": null,
                            "label": "Save",
                            "nextMapElementId": "f144d167-9419-4a6c-bad3-afb18f12aa67",
                            "pageActionType": "SAVE",
                            "isBulkAction": false,
                            "pageActionBindingType": "SAVE",
                            "pageObjectBindingId": null,
                            "order": 0,
                            "comparison": null,
                            "flowOut": null,
                            "controlPoints": null,
                            "nextMapElementDeveloperName": null
                        },
                        {
                            "id": "5b2191c0-5a81-41a6-8dd3-45d41c022006",
                            "developerName": "Back",
                            "developerSummary": null,
                            "label": "Back",
                            "nextMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                            "pageActionType": "BACK",
                            "isBulkAction": false,
                            "pageActionBindingType": "NO_SAVE",
                            "pageObjectBindingId": null,
                            "order": 1,
                            "comparison": null,
                            "flowOut": null,
                            "controlPoints": null,
                            "nextMapElementDeveloperName": null
                        }
                    ],
                    "id": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                    "elementType": "input",
                    "developerName": "Task",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2016-02-28T06:35:00Z",
                    "dateModified": "2016-02-28T06:35:04Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "operations": null,
                    "listeners": null,
                    "viewMessageAction": null,
                    "messageActions": null,
                    "dataActions": null,
                    "navigationOverrides": null,
                    "vote": null,
                    "clearNavigationOverrides": false,
                    "postUpdateToStream": false,
                    "userContent": null,
                    "statusMessage": null,
                    "postUpdateMessage": null,
                    "notAuthorizedMessage": null,
                    "postUpdateWhenType": "",
                    "updateByName": false,
                    "groupElementId": null,
                    "x": 160,
                    "y": 470,
                    "pageElementId": "7aa8b1f4-bf30-4c7c-ad6b-2027fd679110",
                    "outcomes": null,
                    "id": "e7f0e6df-a625-44f2-9dfa-9602de97910f",
                    "elementType": "input",
                    "developerName": "Recordings",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2015-11-30T04:54:02Z",
                    "dateModified": "2015-11-30T04:54:09Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "operations": [
                        {
                            "valueElementToApplyId": {
                                "id": "5ecc7a98-8e70-464d-ade1-7cbc039f9c61",
                                "typeElementPropertyId": null,
                                "command": "ADD"
                            },
                            "valueElementToReferenceId": {
                                "id": "990abb4f-43d6-4265-bdd8-e3d47bff63c8",
                                "typeElementPropertyId": null,
                                "command": ""
                            },
                            "macroElementToExecuteId": null,
                            "order": 0,
                            "disabled": false,
                            "valueElementToApplyDeveloperName": null,
                            "valueElementToReferenceDeveloperName": null,
                            "valueElementToApplyCommand": null,
                            "valueElementToReferenceCommand": null,
                            "valueElementToApplyCommandFriendly": null,
                            "valueElementToReferenceCommandFriendly": null,
                            "valueElementToApplyContentType": null,
                            "valueElementToApplyTypeElementId": null,
                            "valueElementToReferenceContentType": null,
                            "valueElementToReferenceTypeElementId": null
                        }
                    ],
                    "listeners": null,
                    "viewMessageAction": null,
                    "messageActions": null,
                    "dataActions": null,
                    "navigationOverrides": null,
                    "vote": null,
                    "clearNavigationOverrides": false,
                    "postUpdateToStream": false,
                    "userContent": null,
                    "statusMessage": null,
                    "postUpdateMessage": null,
                    "notAuthorizedMessage": null,
                    "postUpdateWhenType": "",
                    "updateByName": false,
                    "groupElementId": null,
                    "x": 160,
                    "y": 360,
                    "pageElementId": null,
                    "outcomes": [
                        {
                            "id": "049b1ee3-30fb-4e9a-94f2-afa956ede21a",
                            "developerName": "Done",
                            "developerSummary": null,
                            "label": "Done",
                            "nextMapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f",
                            "pageActionType": "",
                            "isBulkAction": false,
                            "pageActionBindingType": "SAVE",
                            "pageObjectBindingId": null,
                            "order": 0,
                            "comparison": null,
                            "flowOut": null,
                            "controlPoints": null,
                            "nextMapElementDeveloperName": null
                        }
                    ],
                    "id": "f144d167-9419-4a6c-bad3-afb18f12aa67",
                    "elementType": "operator",
                    "developerName": "Update Tasks",
                    "developerSummary": ""
                }
            ],
            "groupElements": null,
            "pageElements": [
                {
                    "dateCreated": "2016-02-28T06:34:53Z",
                    "dateModified": "2016-02-28T06:35:04Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "label": "Recordings",
                    "pageContainers": [
                        {
                            "id": "68af8fd3-5295-4349-bcd7-da36d955655b",
                            "containerType": "VERTICAL_FLOW",
                            "developerName": "Root",
                            "label": "",
                            "pageContainers": null,
                            "order": 0,
                            "attributes": null,
                            "tags": null
                        }
                    ],
                    "pageComponents": [
                        {
                            "id": "f25f94a0-44fc-4e35-a610-66ab3cd4195b",
                            "isEditable": false,
                            "valueElementValueBindingReferenceId": null,
                            "valueElementDataBindingReferenceId": null,
                            "objectDataRequest": null,
                            "fileDataRequest": null,
                            "imageUri": null,
                            "pageContainerId": "68af8fd3-5295-4349-bcd7-da36d955655b",
                            "pageContainerDeveloperName": "Root",
                            "developerName": "Intro",
                            "componentType": "PRESENTATION",
                            "content": "<h1>Recordings</h1>\n<p>Your offline recordings are shown below:</p>",
                            "label": "",
                            "columns": null,
                            "size": 0,
                            "maxSize": 0,
                            "height": 0,
                            "width": 0,
                            "isRequired": false,
                            "isMultiSelect": false,
                            "isSearchable": false,
                            "hintValue": "",
                            "helpInfo": "",
                            "order": 0,
                            "attributes": null,
                            "tags": null
                        },
                        {
                            "id": "50472a2e-2299-40e1-89be-f7892430dedd",
                            "isEditable": false,
                            "valueElementValueBindingReferenceId": null,
                            "valueElementDataBindingReferenceId": null,
                            "objectDataRequest": null,
                            "fileDataRequest": null,
                            "imageUri": null,
                            "pageContainerId": "68af8fd3-5295-4349-bcd7-da36d955655b",
                            "pageContainerDeveloperName": "Root",
                            "developerName": "Recordings",
                            "componentType": "RECORDINGS",
                            "content": null,
                            "label": "",
                            "columns": null,
                            "size": 0,
                            "maxSize": 0,
                            "height": 0,
                            "width": 0,
                            "isRequired": false,
                            "isMultiSelect": false,
                            "isSearchable": false,
                            "hintValue": "",
                            "helpInfo": "",
                            "order": 1,
                            "attributes": null,
                            "tags": null
                        }
                    ],
                    "pageConditions": null,
                    "stopConditionsOnFirstTrue": false,
                    "attributes": null,
                    "tags": null,
                    "updateByName": false,
                    "id": "7aa8b1f4-bf30-4c7c-ad6b-2027fd679110",
                    "elementType": "PAGE_LAYOUT",
                    "developerName": "Recordings",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2015-11-30T04:48:20Z",
                    "dateModified": "2015-11-30T04:54:09Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "label": "Tasks",
                    "pageContainers": [
                        {
                            "id": "30abebbb-df2c-491b-8434-d8fe767f111f",
                            "containerType": "VERTICAL_FLOW",
                            "developerName": "Root",
                            "label": "",
                            "pageContainers": null,
                            "order": 0,
                            "attributes": null,
                            "tags": null
                        }
                    ],
                    "pageComponents": [
                        {
                            "id": "7f858a56-b304-48b6-8218-e5cc26b6281f",
                            "isEditable": false,
                            "valueElementValueBindingReferenceId": null,
                            "valueElementDataBindingReferenceId": null,
                            "objectDataRequest": null,
                            "fileDataRequest": null,
                            "imageUri": null,
                            "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                            "pageContainerDeveloperName": "Root",
                            "developerName": "Intro",
                            "componentType": "PRESENTATION",
                            "content": "<h1>My Tasks</h1>",
                            "label": "",
                            "columns": null,
                            "size": 0,
                            "maxSize": 0,
                            "height": 0,
                            "width": 0,
                            "isRequired": false,
                            "isMultiSelect": false,
                            "isSearchable": false,
                            "hintValue": "",
                            "helpInfo": "",
                            "order": 0,
                            "attributes": null,
                            "tags": null
                        },
                        {
                            "id": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                            "isEditable": true,
                            "valueElementValueBindingReferenceId": {
                                "id": "990abb4f-43d6-4265-bdd8-e3d47bff63c8",
                                "typeElementPropertyId": null,
                                "command": ""
                            },
                            "valueElementDataBindingReferenceId": {
                                "id": "5ecc7a98-8e70-464d-ade1-7cbc039f9c61",
                                "typeElementPropertyId": null,
                                "command": ""
                            },
                            "objectDataRequest": null,
                            "fileDataRequest": null,
                            "imageUri": null,
                            "pageContainerId": "30abebbb-df2c-491b-8434-d8fe767f111f",
                            "pageContainerDeveloperName": "Root",
                            "developerName": "Tasks",
                            "componentType": "TABLE",
                            "content": null,
                            "label": "",
                            "columns": [
                                {
                                    "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                    "isBound": false,
                                    "boundTypeElementPropertyId": null,
                                    "label": "Subject",
                                    "isDisplayValue": true,
                                    "isEditable": false,
                                    "order": 0,
                                    "typeElementPropertyToDisplayId": null,
                                    "componentType": null,
                                    "typeElementPropertyDeveloperName": null
                                },
                                {
                                    "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                    "isBound": false,
                                    "boundTypeElementPropertyId": null,
                                    "label": "Due Date",
                                    "isDisplayValue": true,
                                    "isEditable": false,
                                    "order": 1,
                                    "typeElementPropertyToDisplayId": null,
                                    "componentType": null,
                                    "typeElementPropertyDeveloperName": null
                                }
                            ],
                            "size": 0,
                            "maxSize": 0,
                            "height": 0,
                            "width": 0,
                            "isRequired": false,
                            "isMultiSelect": false,
                            "isSearchable": false,
                            "hintValue": "",
                            "helpInfo": "",
                            "order": 1,
                            "attributes": null,
                            "tags": null
                        }
                    ],
                    "pageConditions": null,
                    "stopConditionsOnFirstTrue": false,
                    "attributes": null,
                    "tags": null,
                    "updateByName": false,
                    "id": "84a4a6d3-89a3-4a14-931b-b448d4a3c98a",
                    "elementType": "PAGE_LAYOUT",
                    "developerName": "Tasks",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2015-11-30T04:50:57Z",
                    "dateModified": "2015-11-30T04:54:10Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "label": "Task",
                    "pageContainers": [
                        {
                            "id": "0197497a-14df-4e69-9be5-5c241447461c",
                            "containerType": "VERTICAL_FLOW",
                            "developerName": "Root",
                            "label": "",
                            "pageContainers": null,
                            "order": 0,
                            "attributes": null,
                            "tags": null
                        }
                    ],
                    "pageComponents": [
                        {
                            "id": "4a3ce15c-91de-4ed8-b83b-e723c7e9d450",
                            "isEditable": false,
                            "valueElementValueBindingReferenceId": null,
                            "valueElementDataBindingReferenceId": null,
                            "objectDataRequest": null,
                            "fileDataRequest": null,
                            "imageUri": null,
                            "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                            "pageContainerDeveloperName": "Root",
                            "developerName": "Intro",
                            "componentType": "PRESENTATION",
                            "content": "<h1>Task</h1>",
                            "label": "",
                            "columns": null,
                            "size": 0,
                            "maxSize": 0,
                            "height": 0,
                            "width": 0,
                            "isRequired": false,
                            "isMultiSelect": false,
                            "isSearchable": false,
                            "hintValue": "",
                            "helpInfo": "",
                            "order": 0,
                            "attributes": null,
                            "tags": null
                        },
                        {
                            "id": "d4363bc8-164a-4e79-9cd3-77ae743c71c3",
                            "isEditable": true,
                            "valueElementValueBindingReferenceId": {
                                "id": "990abb4f-43d6-4265-bdd8-e3d47bff63c8",
                                "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                "command": ""
                            },
                            "valueElementDataBindingReferenceId": null,
                            "objectDataRequest": null,
                            "fileDataRequest": null,
                            "imageUri": null,
                            "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                            "pageContainerDeveloperName": "Root",
                            "developerName": "Subject",
                            "componentType": "INPUT",
                            "content": null,
                            "label": "Subject",
                            "columns": null,
                            "size": 25,
                            "maxSize": 255,
                            "height": 0,
                            "width": 0,
                            "isRequired": true,
                            "isMultiSelect": false,
                            "isSearchable": false,
                            "hintValue": "Enter subject",
                            "helpInfo": "",
                            "order": 1,
                            "attributes": null,
                            "tags": null
                        },
                        {
                            "id": "af2d3319-029c-430a-9be5-48b34c44928b",
                            "isEditable": true,
                            "valueElementValueBindingReferenceId": {
                                "id": "990abb4f-43d6-4265-bdd8-e3d47bff63c8",
                                "typeElementPropertyId": "e2f11a5f-4479-46b7-9a1e-e395395f2239",
                                "command": ""
                            },
                            "valueElementDataBindingReferenceId": null,
                            "objectDataRequest": null,
                            "fileDataRequest": null,
                            "imageUri": null,
                            "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                            "pageContainerDeveloperName": "Root",
                            "developerName": "Description",
                            "componentType": "TEXTAREA",
                            "content": null,
                            "label": "Description",
                            "columns": null,
                            "size": 0,
                            "maxSize": 2000,
                            "height": 5,
                            "width": 100,
                            "isRequired": false,
                            "isMultiSelect": false,
                            "isSearchable": false,
                            "hintValue": "Enter a description of your task",
                            "helpInfo": "",
                            "order": 2,
                            "attributes": null,
                            "tags": null
                        },
                        {
                            "id": "9657bd93-3aaa-49a0-8891-a3dcbb0b7b28",
                            "isEditable": true,
                            "valueElementValueBindingReferenceId": {
                                "id": "990abb4f-43d6-4265-bdd8-e3d47bff63c8",
                                "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                "command": ""
                            },
                            "valueElementDataBindingReferenceId": null,
                            "objectDataRequest": null,
                            "fileDataRequest": null,
                            "imageUri": null,
                            "pageContainerId": "0197497a-14df-4e69-9be5-5c241447461c",
                            "pageContainerDeveloperName": "Root",
                            "developerName": "Due Date",
                            "componentType": "INPUT",
                            "content": null,
                            "label": "Due Date",
                            "columns": null,
                            "size": 35,
                            "maxSize": 255,
                            "height": 0,
                            "width": 0,
                            "isRequired": false,
                            "isMultiSelect": false,
                            "isSearchable": false,
                            "hintValue": "Due date",
                            "helpInfo": "",
                            "order": 3,
                            "attributes": null,
                            "tags": null
                        }
                    ],
                    "pageConditions": null,
                    "stopConditionsOnFirstTrue": false,
                    "attributes": null,
                    "tags": null,
                    "updateByName": false,
                    "id": "b080f7f9-edd7-4ad1-8219-8534a38edd26",
                    "elementType": "PAGE_LAYOUT",
                    "developerName": "Task",
                    "developerSummary": ""
                }
            ],
            "valueElements": [
                {
                    "dateCreated": "2015-11-30T04:46:24Z",
                    "dateModified": "2015-11-30T04:54:10Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "isFixed": false,
                    "isVersionless": false,
                    "access": "PRIVATE",
                    "contentType": "ContentList",
                    "contentFormat": null,
                    "defaultContentValue": null,
                    "defaultObjectData": null,
                    "initializationOperations": null,
                    "typeElementId": "f20368e7-b079-47ba-8914-f464ef23f4de",
                    "updateByName": false,
                    "id": "5ecc7a98-8e70-464d-ade1-7cbc039f9c61",
                    "elementType": "VARIABLE",
                    "developerName": "Tasks",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2015-11-30T04:46:44Z",
                    "dateModified": "2015-11-30T04:54:10Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "isFixed": false,
                    "isVersionless": false,
                    "access": "PRIVATE",
                    "contentType": "ContentObject",
                    "contentFormat": null,
                    "defaultContentValue": null,
                    "defaultObjectData": null,
                    "initializationOperations": null,
                    "typeElementId": "f20368e7-b079-47ba-8914-f464ef23f4de",
                    "updateByName": false,
                    "id": "990abb4f-43d6-4265-bdd8-e3d47bff63c8",
                    "elementType": "VARIABLE",
                    "developerName": "Task",
                    "developerSummary": ""
                }
            ],
            "macroElements": null,
            "serviceElements": [
                {
                    "dateCreated": "2015-11-30T04:43:27Z",
                    "dateModified": "2015-11-30T04:54:10Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "uri": "https://flow.manywho.com/plugins/manywho/api/identity/1",
                    "format": "JSON",
                    "configurationValues": null,
                    "providesLogic": false,
                    "providesViews": false,
                    "providesFiles": false,
                    "providesDatabase": false,
                    "providesIdentity": true,
                    "providesSocial": false,
                    "providesLocation": false,
                    "providesAutoBinding": false,
                    "actions": null,
                    "install": null,
                    "updateByName": false,
                    "sendDecryptedValues": false,
                    "id": "2dea0348-c992-45ce-ae8f-fe241aaba6ed",
                    "elementType": "SERVICE",
                    "developerName": "ManyWho Identity Service",
                    "developerSummary": null
                }
            ],
            "typeElements": [
                {
                    "dateCreated": "2015-11-30T05:00:51Z",
                    "dateModified": "2015-11-30T05:00:55Z",
                    "whoCreated": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoModified": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "whoOwner": {
                        "id": "914e2919-4c72-4b75-853e-84e060d49380",
                        "firstName": "Admin",
                        "lastName": "User",
                        "email": "admin@manywho.com",
                        "username": null,
                        "verified": false
                    },
                    "properties": [
                        {
                            "id": "e2f11a5f-4479-46b7-9a1e-e395395f2239",
                            "developerName": "Description",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                            "developerName": "Due Date",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                            "developerName": "Subject",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        }
                    ],
                    "bindings": null,
                    "updateByName": false,
                    "serviceElementId": null,
                    "id": "f20368e7-b079-47ba-8914-f464ef23f4de",
                    "elementType": "TYPE",
                    "developerName": "Task",
                    "developerSummary": ""
                }
            ],
            "tagElements": null,
            "dateCreated": "2015-11-30T04:44:34Z",
            "dateModified": "2016-02-28T06:35:04Z",
            "whoCreated": {
                "id": "914e2919-4c72-4b75-853e-84e060d49380",
                "firstName": "Admin",
                "lastName": "User",
                "email": "admin@manywho.com",
                "username": null,
                "verified": false
            },
            "whoModified": {
                "id": "914e2919-4c72-4b75-853e-84e060d49380",
                "firstName": "Admin",
                "lastName": "User",
                "email": "admin@manywho.com",
                "username": null,
                "verified": false
            },
            "whoOwner": {
                "id": "914e2919-4c72-4b75-853e-84e060d49380",
                "firstName": "Admin",
                "lastName": "User",
                "email": "admin@manywho.com",
                "username": null,
                "verified": false
            },
            "alertEmail": null,
            "isActive": true,
            "isDefault": true,
            "comment": null,
            "editingToken": null,
            "id": {
                "id": "3ca32f1c-0278-477b-9ce1-ff88210be747",
                "versionId": "1c6aaacb-be7e-4703-8b77-90f182723168"
            },
            "developerName": "Task Manager",
            "developerSummary": "A demo app showing task management.",
            "startMapElementId": "9467970b-6f7e-48e3-9f8b-ced3a24c93c5",
            "allowJumping": false,
            "stateExpirationLength": 0,
            "authorization": {
                "serviceElementId": "2dea0348-c992-45ce-ae8f-fe241aaba6ed",
                "globalAuthenticationType": "PUBLIC",
                "streamBehaviourType": "NONE",
                "groups": null,
                "users": null,
                "locations": null
            }
        }

    }

})(offline);
