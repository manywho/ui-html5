offline.config = (function (offline) {

    return {

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
                "entryOutcomeId": "975416c8-8c90-40d5-aaf9-5a92e982e687",
                "entryNavigationItemId": null,
                "entryMapElementId": null,
                "sequence": [
                    {
                        "mapElementId": "d32f34e7-dc99-47fa-ae37-df93da7042fe"
                    },
                    {
                        "mapElementId": "5a78b9da-70fc-4889-b4a7-6d7ad9a47f6f"
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
                "stateId": "bd3f6e71-d819-4665-913c-ac679dfd9b17",
                "stateToken": "37d1726d-9fcf-4403-91c0-7cfc1ec2188a",
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
            "invoke_bd3f6e71-d819-4665-913c-ac679dfd9b17": {
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "stateId": "bd3f6e71-d819-4665-913c-ac679dfd9b17",
                "parentStateId": null,
                "stateToken": "a68e757d-1828-4102-acf1-d4f93f20dd3f",
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
                "stateId": "bd3f6e71-d819-4665-913c-ac679dfd9b17",
                "parentStateId": null,
                "stateToken": "a71644fc-d421-4025-99ec-453e8648df60",
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
                                "id": "86f9a674-876b-47fb-b82f-89cd9649950e",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
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
                                "id": "86f9a674-876b-47fb-b82f-89cd9649950e",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
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
                                "id": "86f9a674-876b-47fb-b82f-89cd9649950e",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
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
                "stateId": "bd3f6e71-d819-4665-913c-ac679dfd9b17",
                "parentStateId": null,
                "stateToken": "2829eb53-490d-41a5-91b6-220079e419d3",
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
                "stateId": "bd3f6e71-d819-4665-913c-ac679dfd9b17",
                "parentStateId": null,
                "stateToken": "f7793f8d-d865-49d6-b34b-f4398b36097b",
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
                                    "contentValue": "My Task",
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
                                    "contentValue": "This is my task",
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
                                    "contentValue": "2016-02-19T00:00:00.0000000+00:00",
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
                                "id": "86f9a674-876b-47fb-b82f-89cd9649950e",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
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
                                    "contentValue": "My Task",
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
                                    "contentValue": "This is my task",
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
                                    "contentValue": "2016-02-19T00:00:00.0000000+00:00",
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
                                "id": "86f9a674-876b-47fb-b82f-89cd9649950e",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
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
                                    "contentValue": "My Task",
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
                                    "contentValue": "This is my task",
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
                                    "contentValue": "2016-02-19T00:00:00.0000000+00:00",
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
                                "id": "86f9a674-876b-47fb-b82f-89cd9649950e",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
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
                                    "contentValue": "My Task",
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
                                    "contentValue": "This is my task",
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
                                    "contentValue": "2016-02-19T00:00:00.0000000+00:00",
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
                "stateId": "bd3f6e71-d819-4665-913c-ac679dfd9b17",
                "parentStateId": null,
                "stateToken": "932d5a5e-2082-4bbb-ab20-3b663e3de334",
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
                "stateId": "bd3f6e71-d819-4665-913c-ac679dfd9b17",
                "parentStateId": null,
                "stateToken": "7f627b0e-2cb7-43cf-9ded-ce09ccae30ca",
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
                "stateId": "bd3f6e71-d819-4665-913c-ac679dfd9b17",
                "parentStateId": null,
                "stateToken": "d79e2e41-c067-4c3f-a699-c2f30e4df0b5",
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
                                    "contentValue": "My Task",
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
                                    "contentValue": "This is my task",
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
                                    "contentValue": "2016-02-19T00:00:00.0000000+00:00",
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
                                "id": "86f9a674-876b-47fb-b82f-89cd9649950e",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
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
                                    "contentValue": "My Task",
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
                                    "contentValue": "This is my task",
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
                                    "contentValue": "2016-02-19T00:00:00.0000000+00:00",
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
                                "id": "86f9a674-876b-47fb-b82f-89cd9649950e",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
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
                                    "contentValue": "My Task",
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
                                    "contentValue": "This is my task",
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
                                    "contentValue": "2016-02-19T00:00:00.0000000+00:00",
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
                                "id": "86f9a674-876b-47fb-b82f-89cd9649950e",
                                "developerName": "Back",
                                "label": "Back",
                                "order": 1
                            }
                        ],
                        "rootFaults": null
                    },
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
                                    "contentValue": "My Task",
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
                                    "contentValue": "This is my task",
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
                                    "contentValue": "2016-02-19T00:00:00.0000000+00:00",
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
            }
        },

        snapshot: {
            "navigationElements": [
                {
                    "dateCreated": "0001-01-01T00:00:00Z",
                    "dateModified": "2015-12-01T04:29:31Z",
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
                    "dateCreated": "2015-11-30T04:57:51Z",
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
                    "dateCreated": "2015-11-30T05:00:57Z",
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
                            "pageActionType": "DONE",
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
                            "pageActionType": "DONE",
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
                            "id": "86f9a674-876b-47fb-b82f-89cd9649950e",
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
                        },
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
                        }
                    ],
                    "id": "d32f34e7-dc99-47fa-ae37-df93da7042fe",
                    "elementType": "input",
                    "developerName": "Task",
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
            "dateModified": "2015-12-15T11:05:08Z",
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
            "isActive": false,
            "isDefault": false,
            "comment": null,
            "editingToken": null,
            "id": {
                "id": "3ca32f1c-0278-477b-9ce1-ff88210be747",
                "versionId": "a0136dc9-d3ec-41f7-9d8e-74aa71101609"
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
