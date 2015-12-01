manywho.responses = (function (manywho) {

    return {

        get: function (identifier) {

            return this.cachedResponses[identifier];

        },

        getAll: function () {

            return this.cachedResponses;

        },

        set: function (identifier, responseObject) {

            // Don't set as we're hard coding the cached responses
            this.cachedResponses[identifier] = responseObject;

        },

        cachedResponses: { "initialization_3ca32f1c-0278-477b-9ce1-ff88210be747": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": "42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "stateToken": "e2346855-6ba5-4fae-9a5b-c5c2a72bfc28",
                "currentMapElementId": "9467970b-6f7e-48e3-9f8b-ced3a24c93c5",
                "currentStreamId": null,
                "statusCode": "200",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": null
            },
            "invoke_42b9b303-3fee-41ee-a26e-146cbd6a783f": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": "42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "parentStateId": null,
                "stateToken": "32906161-db89-4b90-88fb-5b92537249ab",
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
                                            "typeElementPropertyToDisplayId": null
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
                                            "typeElementPropertyToDisplayId": null
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
                                "pageActionType": "",
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
                                "pageActionType": "",
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
                "runFlowUri": "http://localhost:3001/debug.html?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "http://localhost:3001/debug.html?join=42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": null
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
                "stateId": "42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "parentStateId": null,
                "stateToken": "58b9dc7d-16f7-49c6-8456-66f09b84a5ad",
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
                                    "contentValue": "0001-01-01T00:00:00.0000000+00:00",
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
                                "pageActionType": "",
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
                                "id": "86f9a674-876b-47fb-b82f-89cd9649950e",
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
                "runFlowUri": "http://localhost:3001/debug.html?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "http://localhost:3001/debug.html?join=42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": null
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
                "stateId": "42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "parentStateId": null,
                "stateToken": "912d000a-a2fa-446e-bc2a-08ab71bbf3e2",
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
                                            "typeElementPropertyToDisplayId": null
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
                                            "typeElementPropertyToDisplayId": null
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
                                            "internalId": "2e8eb772-47d4-4b42-83c1-2d8d6c699171",
                                            "externalId": "2e8eb772-47d4-4b42-83c1-2d8d6c699171",
                                            "developerName": "Task",
                                            "typeElementId": "f20368e7-b079-47ba-8914-f464ef23f4de",
                                            "order": 0,
                                            "properties": [
                                                {
                                                    "typeElementPropertyId": "e2f11a5f-4479-46b7-9a1e-e395395f2239",
                                                    "developerName": "Description",
                                                    "contentValue": "asdfasdf",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                                    "developerName": "Due Date",
                                                    "contentValue": "29 Nov 2015",
                                                    "contentType": "ContentDateTime",
                                                    "contentFormat": "dd MMM yyyy",
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                                    "developerName": "Subject",
                                                    "contentValue": "sasdf",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                }
                                            ],
                                            "isSelected": true
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
                                "pageActionType": "",
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
                                "pageActionType": "",
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
                "runFlowUri": "http://localhost:3001/debug.html?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "http://localhost:3001/debug.html?join=42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": null
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
                "stateId": "42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "parentStateId": null,
                "stateToken": "43867e21-62b3-4439-938a-f267236b140a",
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
                                            "typeElementPropertyToDisplayId": null
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
                                            "typeElementPropertyToDisplayId": null
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
                                            "internalId": "2e8eb772-47d4-4b42-83c1-2d8d6c699171",
                                            "externalId": "2e8eb772-47d4-4b42-83c1-2d8d6c699171",
                                            "developerName": "Task",
                                            "typeElementId": "f20368e7-b079-47ba-8914-f464ef23f4de",
                                            "order": 0,
                                            "properties": [
                                                {
                                                    "typeElementPropertyId": "e2f11a5f-4479-46b7-9a1e-e395395f2239",
                                                    "developerName": "Description",
                                                    "contentValue": "asdfasdf",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                                    "developerName": "Due Date",
                                                    "contentValue": "29 Nov 2015",
                                                    "contentType": "ContentDateTime",
                                                    "contentFormat": "dd MMM yyyy",
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                                    "developerName": "Subject",
                                                    "contentValue": "sasdf",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                }
                                            ],
                                            "isSelected": true
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
                                "pageActionType": "",
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
                                "pageActionType": "",
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
                "runFlowUri": "http://localhost:3001/debug.html?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "http://localhost:3001/debug.html?join=42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": null
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
                "stateId": "42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "parentStateId": null,
                "stateToken": "c3972d8d-3a51-423b-89c5-954c9bb59bb2",
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
                                    "contentValue": "sasdf",
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
                                    "contentValue": "asdfasdf",
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
                                    "contentValue": "2015-11-29T00:00:00.0000000+00:00",
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
                                "pageActionType": "",
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
                                "id": "86f9a674-876b-47fb-b82f-89cd9649950e",
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
                "runFlowUri": "http://localhost:3001/debug.html?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "http://localhost:3001/debug.html?join=42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": null
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
                "stateId": "42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "parentStateId": null,
                "stateToken": "d3e6cd43-e664-4144-8526-f50dd4a3be8e",
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
                                    "id": "2a816114-8240-4e66-8f0c-1e39390c84ed",
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
                                    "pageContainerId": "2a816114-8240-4e66-8f0c-1e39390c84ed",
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
                                    "content": "<h1>Delete Task</h1>\n<p>Are you sure you want to delete the task:&nbsp;<strong>sasdf</strong></p>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                }
                            ],
                            "pageContainerDataResponses": [
                                {
                                    "pageContainerId": "2a816114-8240-4e66-8f0c-1e39390c84ed",
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
                                "pageActionType": "",
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
                "runFlowUri": "http://localhost:3001/debug.html?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "http://localhost:3001/debug.html?join=42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": null
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
                "stateId": "42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "parentStateId": null,
                "stateToken": "8a6e7461-ec1a-4135-803a-9391e6f699f9",
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
                                            "typeElementPropertyToDisplayId": null
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
                                            "typeElementPropertyToDisplayId": null
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
                                            "internalId": "2e8eb772-47d4-4b42-83c1-2d8d6c699171",
                                            "externalId": "2e8eb772-47d4-4b42-83c1-2d8d6c699171",
                                            "developerName": "Task",
                                            "typeElementId": "f20368e7-b079-47ba-8914-f464ef23f4de",
                                            "order": 0,
                                            "properties": [
                                                {
                                                    "typeElementPropertyId": "e2f11a5f-4479-46b7-9a1e-e395395f2239",
                                                    "developerName": "Description",
                                                    "contentValue": "asdfasdf",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                                                    "developerName": "Due Date",
                                                    "contentValue": "29 Nov 2015",
                                                    "contentType": "ContentDateTime",
                                                    "contentFormat": "dd MMM yyyy",
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                                                    "developerName": "Subject",
                                                    "contentValue": "sasdf",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                }
                                            ],
                                            "isSelected": true
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
                                "pageActionType": "",
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
                                "pageActionType": "",
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
                "runFlowUri": "http://localhost:3001/debug.html?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "http://localhost:3001/debug.html?join=42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": null
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
                "stateId": "42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "parentStateId": null,
                "stateToken": "e3ad2ded-08e7-4861-ae74-1505d23b268e",
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
                                            "typeElementPropertyToDisplayId": null
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
                                            "typeElementPropertyToDisplayId": null
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
                                "pageActionType": "",
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
                                "pageActionType": "",
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
                "runFlowUri": "http://localhost:3001/debug.html?flow-id=3ca32f1c-0278-477b-9ce1-ff88210be747",
                "joinFlowUri": "http://localhost:3001/debug.html?join=42b9b303-3fee-41ee-a26e-146cbd6a783f",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": null
            }
        }

    }

})(manywho);