offline.config = (function (offline) {

    var recordings = [];

    return {

        // In memory implementation of a get recording function
        //
        getRecording: function (id) {

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
        getRecordings: function () {

            return recordings;

        },

        // In memory implementation of a delete recording function
        //
        deleteRecording: function (recording) {

            if (recording != null &&
                recording.id && !manywho.utils.isNullOrWhitespace(recording.id)) {

                for (var i = 0; i < recordings.length; i++) {

                    if (manywho.utils.isEqual(recording.id, recordings[i].id, true)) {

                        // Delete the recording
                        recordings.splice(i, 1);
                        break;

                    }

                }

            }

        },

        // In memory implementation of a create recording function
        //
        createRecording: function (sequence, request) {

            var defaultName = "Recording on " + Date.now();

            // Create an active recording or reset the current one and clone the sequence entries
            // so we know what's been completed
            return {
                id: manywho.simulation.getGuid(),
                name: defaultName,
                stateId: request.stateId,
                nameReference: sequence.name,
                startMapElementId: request.currentMapElementId,
                sequence: JSON.parse(JSON.stringify(sequence.sequence))
            };

        },

        // In memory implementation of a save recording function
        //
        saveRecording: function (recording) {

            recordings.push(recording);

        },

        // The configuration of available object data and file data requests that the offline engine can leverage
        // for getting data. This data is read-only technically as it's used to improve simulation. It can only be
        // edited via recording sequences.
        //
        dataSync: {
            objectDataRequests: [
                {
                    developerName: "Accounts",
                    label: "Accounts",
                    objectDataRequest: {

                    }
                }
            ],
            fileDataRequests: null
        },

        // The unique identifier to be used when the Flow has been started entirely offline and therefore does not
        // have an assigned state identifier.
        //
        emptyStateId: "00000000-0000-0000-0000-000000000000",

        // The list of available recording sequences that the offline implementation should listen to and make available
        // for playback when next connected.
        //
        sequences: null,

        // The cached responses that will be used when the UI is offline. The cached responses are keyed based in
        // the type of invoke and the unique identifier of the action (outcome or navigation item).
        //
        responses: {
            "initialization_abff8fe9-1d52-4ac5-89cb-5f90bddaa046": {
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
                "currentMapElementId": "14b23be1-f3d4-4ee3-9ebb-76e6f8c7af01",
                "currentStreamId": null,
                "invokeType": "FORWARD",
                "annotations": null,
                "mapElementInvokeResponses": [
                    {
                        "mapElementId": "14b23be1-f3d4-4ee3-9ebb-76e6f8c7af01",
                        "developerName": "Accounts",
                        "pageResponse": {
                            "label": "Accounts",
                            "pageContainerResponses": [
                                {
                                    "id": "c05db081-0e3e-49a8-ac70-d13a8ea6b351",
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
                                    "pageContainerId": "c05db081-0e3e-49a8-ac70-d13a8ea6b351",
                                    "id": "35472952-0581-4bb5-a9f3-42456e3ca07a",
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
                                    "pageContainerId": "c05db081-0e3e-49a8-ac70-d13a8ea6b351",
                                    "id": "dadf034a-d508-44bd-919c-bf38040173cf",
                                    "developerName": "Accounts",
                                    "componentType": "TABLE",
                                    "contentType": "ContentObject",
                                    "label": "",
                                    "columns": [
                                        {
                                            "developerName": "Account Name",
                                            "typeElementPropertyId": "7ef609fe-348c-4148-9cfc-1e97daf09c2f",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Name",
                                            "isDisplayValue": true,
                                            "isEditable": false,
                                            "order": 0,
                                            "typeElementPropertyToDisplayId": null,
                                            "componentType": null
                                        },
                                        {
                                            "developerName": "Account Type",
                                            "typeElementPropertyId": "cc9fe39a-8aff-43bc-9f9a-caa8c9d1044e",
                                            "contentFormat": null,
                                            "contentType": "ContentString",
                                            "label": "Type",
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
                                    "isSearchable": true,
                                    "hasEvents": false,
                                    "attributes": null
                                }
                            ],
                            "pageComponentDataResponses": [
                                {
                                    "pageComponentId": "35472952-0581-4bb5-a9f3-42456e3ca07a",
                                    "isEnabled": true,
                                    "isEditable": false,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": null,
                                    "objectDataRequest": null,
                                    "fileDataRequest": null,
                                    "contentValue": null,
                                    "content": "<h1>Accounts</h1>\n<p>Your accounts are listed below:</p>",
                                    "imageUri": null,
                                    "isValid": true,
                                    "validationMessage": null,
                                    "tags": null
                                },
                                {
                                    "pageComponentId": "dadf034a-d508-44bd-919c-bf38040173cf",
                                    "isEnabled": true,
                                    "isEditable": true,
                                    "isRequired": false,
                                    "isVisible": true,
                                    "objectData": [
                                        {
                                            "internalId": "67e8e336-5b63-44ba-9961-a1dbbcec3b5f",
                                            "externalId": "67e8e336-5b63-44ba-9961-a1dbbcec3b5f",
                                            "developerName": "Account",
                                            "typeElementId": "9e763762-9212-4456-b60c-8d06e72e5be1",
                                            "order": 0,
                                            "properties": [
                                                {
                                                    "typeElementPropertyId": "0c61372d-673a-460e-a735-2b5e450c735c",
                                                    "developerName": "Account ID",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "e3069182-ae2b-40ba-85b2-0b22b8ff90b4",
                                                    "developerName": "Deleted",
                                                    "contentValue": "",
                                                    "contentType": "ContentBoolean",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "63906ddf-0741-4a05-828a-14d730aca710",
                                                    "developerName": "Master Record ID",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "d25b4b5a-6414-45fa-a0c7-ddd34a1145c7",
                                                    "developerName": "Master Record ID Name",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "7ef609fe-348c-4148-9cfc-1e97daf09c2f",
                                                    "developerName": "Account Name",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "cc9fe39a-8aff-43bc-9f9a-caa8c9d1044e",
                                                    "developerName": "Account Type",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "33614b80-8418-49cc-9c31-a552530a83f3",
                                                    "developerName": "Parent Account ID",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "9a9f5522-e552-4f1d-a787-d66ccab72e12",
                                                    "developerName": "Parent Account ID Name",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "3478cfd5-e933-487a-b224-116214acda4b",
                                                    "developerName": "Billing Street",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "d51d6ece-459e-421c-ac98-504189991c86",
                                                    "developerName": "Billing City",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "507f43d0-2fc9-423c-b4d3-55ad0bb24d53",
                                                    "developerName": "Billing State/Province",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "58f8c4c1-11ce-4ff0-b42f-6f0a6d02a459",
                                                    "developerName": "Billing Zip/Postal Code",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "fc1c5832-5fa2-40e5-8a95-d36b006e2e53",
                                                    "developerName": "Billing Country",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "42d28003-a898-473f-b831-cc32a58a992d",
                                                    "developerName": "Shipping Street",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "9df18f6a-f184-4f3e-8503-81d8e329bfc7",
                                                    "developerName": "Shipping City",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "0bb034b4-b43a-4a15-b93f-dc20843a7dcd",
                                                    "developerName": "Shipping State/Province",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "2a1bee77-f256-4eee-ba26-344e0671d5d0",
                                                    "developerName": "Shipping Zip/Postal Code",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "d05c6680-789e-43e4-a080-282a7c0bd2a8",
                                                    "developerName": "Shipping Country",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "1b011f80-b4e5-4a94-afaa-cefd2760f5a9",
                                                    "developerName": "Account Phone",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "050b1145-a521-4b1a-8431-03dd3d5dc5a4",
                                                    "developerName": "Account Fax",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "6a4f7964-a278-4e38-987f-c8cb6ca81176",
                                                    "developerName": "Account Number",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "fc99ac8a-7a5a-49c6-84d0-facf814b34e0",
                                                    "developerName": "Website",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "dd0e40ad-d646-47ad-9faf-33a7efd68ff8",
                                                    "developerName": "SIC Code",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "b6578ddc-b697-4e6f-9144-f35b70b58824",
                                                    "developerName": "Industry",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "ca60c195-0e8c-4912-8433-a39efcf628ed",
                                                    "developerName": "Annual Revenue",
                                                    "contentValue": "",
                                                    "contentType": "ContentNumber",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "da85ac99-5ef8-44f6-a108-f9ac36b71b76",
                                                    "developerName": "Employees",
                                                    "contentValue": "",
                                                    "contentType": "ContentNumber",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "275819c6-1a30-4e18-ba16-e4f6be3f6318",
                                                    "developerName": "Ownership",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "1f638059-d650-4d21-a458-dc477b04e523",
                                                    "developerName": "Ticker Symbol",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "2ade7667-0301-47e8-b447-e4ae9c4ba467",
                                                    "developerName": "Account Description",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "ab9953d1-e69e-4a10-a79e-f96e18351c17",
                                                    "developerName": "Account Rating",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "0d2ab3fe-d2a6-49f8-a204-56168d09c30d",
                                                    "developerName": "Account Site",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "b1ecccab-03c5-4bbd-a5d4-e7c2abba037a",
                                                    "developerName": "Owner ID",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "187dcc46-a497-4809-887c-00697eb5ed4c",
                                                    "developerName": "Owner ID Name",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "08ad03b9-5736-407d-9223-acd6788f9a03",
                                                    "developerName": "Created Date",
                                                    "contentValue": "",
                                                    "contentType": "ContentDateTime",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "c4a8bf78-b33d-42d5-ba14-7e598613e4cf",
                                                    "developerName": "Created By ID",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "a5d79b12-a992-4700-bc8f-7f6683be95da",
                                                    "developerName": "Created By ID Name",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "236a607f-3cd4-48f7-9b82-9a2fce75b4af",
                                                    "developerName": "Last Modified Date",
                                                    "contentValue": "",
                                                    "contentType": "ContentDateTime",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "55f9d91e-cd53-4867-9868-c3f99d330895",
                                                    "developerName": "Last Modified By ID",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "4f4cf044-017a-4496-9187-c14aedd2972d",
                                                    "developerName": "Last Modified By ID Name",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "d82a04a6-62a0-4a2b-8b8b-c71975970f55",
                                                    "developerName": "System Modstamp",
                                                    "contentValue": "",
                                                    "contentType": "ContentDateTime",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "326b8622-592b-485c-9b3a-144811357f65",
                                                    "developerName": "Last Activity",
                                                    "contentValue": "",
                                                    "contentType": "ContentDateTime",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "1f4e8d6c-c69b-44e6-baf1-c0d053863018",
                                                    "developerName": "Data.com Key",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "952d662d-f764-4443-aa4e-e7612b0dcb02",
                                                    "developerName": "Jigsaw Company ID",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "74888716-8bf6-41d7-972f-c742a6b68b34",
                                                    "developerName": "Account Source",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "6853d52d-d815-434d-9812-82339c73d97c",
                                                    "developerName": "D-U-N-S Number",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "135f2e7d-0efd-4a2b-b76c-c5bf7fc79dfc",
                                                    "developerName": "Tradestyle",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "411aa4a7-f589-4dea-858a-ccae1ad68f31",
                                                    "developerName": "NAICS Code",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "bbaa57db-98f5-41af-8504-e0712b96f641",
                                                    "developerName": "NAICS Description",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "0a9d9320-59ef-44aa-a18a-7418478226c4",
                                                    "developerName": "Year Started",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "b125acb5-253a-4a18-ba7e-9507474f0674",
                                                    "developerName": "SIC Description",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "72fbe50e-8b07-4076-baf1-0631d689bdfb",
                                                    "developerName": "D&B Company ID",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "63837e32-7725-4e72-9739-9b93e70c0479",
                                                    "developerName": "D&B Company ID Name",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "fe720d11-d085-4823-97ff-e343ed4d1063",
                                                    "developerName": "Customer Priority",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "c0800b8f-82e6-44fd-8d6f-21a1e659ede5",
                                                    "developerName": "SLA",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "e7857acf-68c4-4bd3-8b1f-99c7e353a0d2",
                                                    "developerName": "Active",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "df6f6826-118f-4d9b-8f1b-97fe1309ee2d",
                                                    "developerName": "Number of Locations",
                                                    "contentValue": "",
                                                    "contentType": "ContentNumber",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "59c45ca6-d83d-41b1-9390-425b558ff6b9",
                                                    "developerName": "Upsell Opportunity",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "f43de94f-23e0-41e4-ba90-b88070d9c8ec",
                                                    "developerName": "SLA Serial Number",
                                                    "contentValue": "",
                                                    "contentType": "ContentString",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                },
                                                {
                                                    "typeElementPropertyId": "ff9a3fdb-f29b-4374-8c4d-669c198a345e",
                                                    "developerName": "SLA Expiration Date",
                                                    "contentValue": "",
                                                    "contentType": "ContentDateTime",
                                                    "contentFormat": null,
                                                    "objectData": null
                                                }
                                            ],
                                            "isSelected": true
                                        }
                                    ],
                                    "objectDataRequest": {
                                        "stateId": "abff8fe9-1d52-4ac5-89cb-5f90bddaa046",
                                        "token": null,
                                        "typeElementBindingId": "9a6d9427-5452-4f3b-9c20-e167a8438ee7",
                                        "authorization": null,
                                        "configurationValues": null,
                                        "command": null,
                                        "culture": {
                                            "id": null,
                                            "developerName": null,
                                            "developerSummary": null,
                                            "brand": null,
                                            "language": "EN",
                                            "country": "USA",
                                            "variant": null
                                        },
                                        "listFilter": null,
                                        "objectDataType": {
                                            "typeElementId": "9e763762-9212-4456-b60c-8d06e72e5be1",
                                            "developerName": "Account",
                                            "properties": [
                                                {
                                                    "developerName": "Account ID",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Deleted",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Master Record ID",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Master Record ID Name",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Account Name",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Account Type",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Parent Account ID",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Parent Account ID Name",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Billing Street",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Billing City",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Billing State/Province",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Billing Zip/Postal Code",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Billing Country",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Shipping Street",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Shipping City",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Shipping State/Province",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Shipping Zip/Postal Code",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Shipping Country",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Account Phone",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Account Fax",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Account Number",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Website",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "SIC Code",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Industry",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Annual Revenue",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Employees",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Ownership",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Ticker Symbol",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Account Description",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Account Rating",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Account Site",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Owner ID",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Owner ID Name",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Created Date",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Created By ID",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Created By ID Name",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Last Modified Date",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Last Modified By ID",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Last Modified By ID Name",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "System Modstamp",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Last Activity",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Data.com Key",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Jigsaw Company ID",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Account Source",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "D-U-N-S Number",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Tradestyle",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "NAICS Code",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "NAICS Description",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Year Started",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "SIC Description",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "D&B Company ID",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "D&B Company ID Name",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Customer Priority",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "SLA",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Active",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Number of Locations",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "Upsell Opportunity",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "SLA Serial Number",
                                                    "list": null
                                                },
                                                {
                                                    "developerName": "SLA Expiration Date",
                                                    "list": null
                                                }
                                            ]
                                        },
                                        "objectData": null
                                    },
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
                                    "pageContainerId": "c05db081-0e3e-49a8-ac70-d13a8ea6b351",
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
                "runFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?flow-id=9a563d47-fa58-4a27-b633-f1fd6898ed07",
                "joinFlowUri": "https://flow.manywho.com/1ae14654-0699-401f-aaf6-f0adbb5418c8play/default?join=abff8fe9-1d52-4ac5-89cb-5f90bddaa046",
                "authorizationContext": {
                    "directoryName": null,
                    "directoryId": null,
                    "loginUrl": null,
                    "authenticationType": "USERNAME_PASSWORD"
                },
                "navigationElementReferences": null
            },
            "objectData_10undefined": {
                "stateId": "abff8fe9-1d52-4ac5-89cb-5f90bddaa046",
                "token": null,
                "typeElementBindingId": "9a6d9427-5452-4f3b-9c20-e167a8438ee7",
                "authorization": null,
                "configurationValues": null,
                "command": null,
                "culture": {
                    "id": null,
                    "developerName": null,
                    "developerSummary": null,
                    "brand": null,
                    "language": "EN",
                    "country": "USA",
                    "variant": null
                },
                "listFilter": {
                    "limit": 10,
                    "search": null
                },
                "objectDataType": {
                    "typeElementId": "9e763762-9212-4456-b60c-8d06e72e5be1",
                    "developerName": "Account",
                    "properties": [
                        {
                            "developerName": "Account ID",
                            "list": null
                        },
                        {
                            "developerName": "Deleted",
                            "list": null
                        },
                        {
                            "developerName": "Master Record ID",
                            "list": null
                        },
                        {
                            "developerName": "Master Record ID Name",
                            "list": null
                        },
                        {
                            "developerName": "Account Name",
                            "list": null
                        },
                        {
                            "developerName": "Account Type",
                            "list": null
                        },
                        {
                            "developerName": "Parent Account ID",
                            "list": null
                        },
                        {
                            "developerName": "Parent Account ID Name",
                            "list": null
                        },
                        {
                            "developerName": "Billing Street",
                            "list": null
                        },
                        {
                            "developerName": "Billing City",
                            "list": null
                        },
                        {
                            "developerName": "Billing State/Province",
                            "list": null
                        },
                        {
                            "developerName": "Billing Zip/Postal Code",
                            "list": null
                        },
                        {
                            "developerName": "Billing Country",
                            "list": null
                        },
                        {
                            "developerName": "Shipping Street",
                            "list": null
                        },
                        {
                            "developerName": "Shipping City",
                            "list": null
                        },
                        {
                            "developerName": "Shipping State/Province",
                            "list": null
                        },
                        {
                            "developerName": "Shipping Zip/Postal Code",
                            "list": null
                        },
                        {
                            "developerName": "Shipping Country",
                            "list": null
                        },
                        {
                            "developerName": "Account Phone",
                            "list": null
                        },
                        {
                            "developerName": "Account Fax",
                            "list": null
                        },
                        {
                            "developerName": "Account Number",
                            "list": null
                        },
                        {
                            "developerName": "Website",
                            "list": null
                        },
                        {
                            "developerName": "SIC Code",
                            "list": null
                        },
                        {
                            "developerName": "Industry",
                            "list": null
                        },
                        {
                            "developerName": "Annual Revenue",
                            "list": null
                        },
                        {
                            "developerName": "Employees",
                            "list": null
                        },
                        {
                            "developerName": "Ownership",
                            "list": null
                        },
                        {
                            "developerName": "Ticker Symbol",
                            "list": null
                        },
                        {
                            "developerName": "Account Description",
                            "list": null
                        },
                        {
                            "developerName": "Account Rating",
                            "list": null
                        },
                        {
                            "developerName": "Account Site",
                            "list": null
                        },
                        {
                            "developerName": "Owner ID",
                            "list": null
                        },
                        {
                            "developerName": "Owner ID Name",
                            "list": null
                        },
                        {
                            "developerName": "Created Date",
                            "list": null
                        },
                        {
                            "developerName": "Created By ID",
                            "list": null
                        },
                        {
                            "developerName": "Created By ID Name",
                            "list": null
                        },
                        {
                            "developerName": "Last Modified Date",
                            "list": null
                        },
                        {
                            "developerName": "Last Modified By ID",
                            "list": null
                        },
                        {
                            "developerName": "Last Modified By ID Name",
                            "list": null
                        },
                        {
                            "developerName": "System Modstamp",
                            "list": null
                        },
                        {
                            "developerName": "Last Activity",
                            "list": null
                        },
                        {
                            "developerName": "Data.com Key",
                            "list": null
                        },
                        {
                            "developerName": "Jigsaw Company ID",
                            "list": null
                        },
                        {
                            "developerName": "Account Source",
                            "list": null
                        },
                        {
                            "developerName": "D-U-N-S Number",
                            "list": null
                        },
                        {
                            "developerName": "Tradestyle",
                            "list": null
                        },
                        {
                            "developerName": "NAICS Code",
                            "list": null
                        },
                        {
                            "developerName": "NAICS Description",
                            "list": null
                        },
                        {
                            "developerName": "Year Started",
                            "list": null
                        },
                        {
                            "developerName": "SIC Description",
                            "list": null
                        },
                        {
                            "developerName": "D&B Company ID",
                            "list": null
                        },
                        {
                            "developerName": "D&B Company ID Name",
                            "list": null
                        },
                        {
                            "developerName": "Customer Priority",
                            "list": null
                        },
                        {
                            "developerName": "SLA",
                            "list": null
                        },
                        {
                            "developerName": "Active",
                            "list": null
                        },
                        {
                            "developerName": "Number of Locations",
                            "list": null
                        },
                        {
                            "developerName": "Upsell Opportunity",
                            "list": null
                        },
                        {
                            "developerName": "SLA Serial Number",
                            "list": null
                        },
                        {
                            "developerName": "SLA Expiration Date",
                            "list": null
                        }
                    ]
                },
                "objectData": null
            }
        },

        // The full Flow snapshot that should be used to gather structural information to improve the simulation
        // experience for the end user. This information allows the offline implementation to determine the best course
        // of action for the user experience.
        //
        snapshot: {
            "navigationElements": null,
            "mapElements": [
                {
                    "dateCreated": "2016-03-10T22:38:48Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                    "x": 170,
                    "y": 250,
                    "pageElementId": "bbd56548-3809-459b-ab60-a71bbeeb66a8",
                    "outcomes": null,
                    "id": "14b23be1-f3d4-4ee3-9ebb-76e6f8c7af01",
                    "elementType": "input",
                    "developerName": "Accounts",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2016-03-10T22:38:52Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                            "id": "581a9880-83d5-4ecb-8a1a-d9ea7473142d",
                            "developerName": "Go",
                            "developerSummary": null,
                            "label": "Go",
                            "nextMapElementId": "14b23be1-f3d4-4ee3-9ebb-76e6f8c7af01",
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
                    "id": "4cfebe7e-f3a6-4379-94b0-a5a7285bd529",
                    "elementType": "START",
                    "developerName": "Start",
                    "developerSummary": ""
                }
            ],
            "groupElements": null,
            "pageElements": [
                {
                    "dateCreated": "2016-03-10T22:38:36Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                    "label": "Accounts",
                    "pageContainers": [
                        {
                            "id": "c05db081-0e3e-49a8-ac70-d13a8ea6b351",
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
                            "id": "35472952-0581-4bb5-a9f3-42456e3ca07a",
                            "isEditable": false,
                            "valueElementValueBindingReferenceId": null,
                            "valueElementDataBindingReferenceId": null,
                            "objectDataRequest": null,
                            "fileDataRequest": null,
                            "imageUri": null,
                            "pageContainerId": "c05db081-0e3e-49a8-ac70-d13a8ea6b351",
                            "pageContainerDeveloperName": "Root",
                            "developerName": "Intro",
                            "componentType": "PRESENTATION",
                            "content": "<h1>Accounts</h1>\n<p>Your accounts are listed below:</p>",
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
                            "id": "dadf034a-d508-44bd-919c-bf38040173cf",
                            "isEditable": true,
                            "valueElementValueBindingReferenceId": {
                                "id": "5e261c22-7eaf-4e17-a1da-b6b6350a9521",
                                "typeElementPropertyId": null,
                                "command": ""
                            },
                            "valueElementDataBindingReferenceId": null,
                            "objectDataRequest": {
                                "typeElementBindingId": "9a6d9427-5452-4f3b-9c20-e167a8438ee7",
                                "typeElementId": "9e763762-9212-4456-b60c-8d06e72e5be1",
                                "listFilter": null,
                                "command": null,
                                "typeElementDeveloperName": null
                            },
                            "fileDataRequest": null,
                            "imageUri": null,
                            "pageContainerId": "c05db081-0e3e-49a8-ac70-d13a8ea6b351",
                            "pageContainerDeveloperName": "Root",
                            "developerName": "Accounts",
                            "componentType": "TABLE",
                            "content": null,
                            "label": "",
                            "columns": [
                                {
                                    "typeElementPropertyId": "7ef609fe-348c-4148-9cfc-1e97daf09c2f",
                                    "isBound": false,
                                    "boundTypeElementPropertyId": null,
                                    "label": "Name",
                                    "isDisplayValue": true,
                                    "isEditable": false,
                                    "order": 0,
                                    "typeElementPropertyToDisplayId": null,
                                    "componentType": null,
                                    "typeElementPropertyDeveloperName": null
                                },
                                {
                                    "typeElementPropertyId": "cc9fe39a-8aff-43bc-9f9a-caa8c9d1044e",
                                    "isBound": false,
                                    "boundTypeElementPropertyId": null,
                                    "label": "Type",
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
                            "isSearchable": true,
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
                    "id": "bbd56548-3809-459b-ab60-a71bbeeb66a8",
                    "elementType": "PAGE_LAYOUT",
                    "developerName": "Accounts",
                    "developerSummary": ""
                }
            ],
            "valueElements": [
                {
                    "dateCreated": "2016-03-10T22:30:10Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                    "isFixed": true,
                    "isVersionless": false,
                    "access": "PRIVATE",
                    "contentType": "ContentString",
                    "contentFormat": null,
                    "defaultContentValue": "https://manywhooffline-dev-ed.my.salesforce.com",
                    "defaultObjectData": null,
                    "initializationOperations": null,
                    "typeElementId": null,
                    "updateByName": false,
                    "id": "0d696c01-097f-44da-9b33-39816c3af08e",
                    "elementType": "VARIABLE",
                    "developerName": "Salesforce Chatter Base Url",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2016-03-10T22:29:23Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                    "isFixed": true,
                    "isVersionless": false,
                    "access": "PRIVATE",
                    "contentType": "ContentString",
                    "contentFormat": null,
                    "defaultContentValue": "steve.wood@offline.dev",
                    "defaultObjectData": null,
                    "initializationOperations": null,
                    "typeElementId": null,
                    "updateByName": false,
                    "id": "0dd1e8db-2143-434e-8d69-1661d904d8e4",
                    "elementType": "VARIABLE",
                    "developerName": "Salesforce Username",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2016-03-10T22:36:35Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                    "typeElementId": "9e763762-9212-4456-b60c-8d06e72e5be1",
                    "updateByName": false,
                    "id": "5e261c22-7eaf-4e17-a1da-b6b6350a9521",
                    "elementType": "VARIABLE",
                    "developerName": "Account",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2016-03-10T22:30:26Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                    "isFixed": true,
                    "isVersionless": false,
                    "access": "PRIVATE",
                    "contentType": "ContentString",
                    "contentFormat": null,
                    "defaultContentValue": "SuperUser",
                    "defaultObjectData": null,
                    "initializationOperations": null,
                    "typeElementId": null,
                    "updateByName": false,
                    "id": "89173521-2d0b-412e-a33d-5cec1309d520",
                    "elementType": "VARIABLE",
                    "developerName": "Salesforce Authentication Strategy",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2016-03-10T22:30:42Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                    "isFixed": true,
                    "isVersionless": false,
                    "access": "PRIVATE",
                    "contentType": "ContentString",
                    "contentFormat": null,
                    "defaultContentValue": "steve.wood@manywho.com",
                    "defaultObjectData": null,
                    "initializationOperations": null,
                    "typeElementId": null,
                    "updateByName": false,
                    "id": "9879b4da-19d2-4ce1-9bd6-688953fbbbe0",
                    "elementType": "VARIABLE",
                    "developerName": "Salesforce Admin Email",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2016-03-10T22:29:54Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                    "isFixed": true,
                    "isVersionless": false,
                    "access": "PRIVATE",
                    "contentType": "ContentString",
                    "contentFormat": null,
                    "defaultContentValue": "https://manywhooffline-dev-ed.my.salesforce.com",
                    "defaultObjectData": null,
                    "initializationOperations": null,
                    "typeElementId": null,
                    "updateByName": false,
                    "id": "a2bdc7b8-9d63-4520-90ab-e8e07d82b822",
                    "elementType": "VARIABLE",
                    "developerName": "Salesforce Authentication Url",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2016-03-10T22:36:50Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                    "typeElementId": "534e0e19-3ea1-4e55-9cce-86afdff8daa3",
                    "updateByName": false,
                    "id": "c9c6c21d-7c2d-4e62-8aae-a0f4d7a14773",
                    "elementType": "VARIABLE",
                    "developerName": "Contact",
                    "developerSummary": ""
                },
                {
                    "dateCreated": "2016-03-10T22:29:37Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                    "isFixed": true,
                    "isVersionless": false,
                    "access": "PRIVATE",
                    "contentType": "ContentPassword",
                    "contentFormat": null,
                    "defaultContentValue": "Inf0gnome5cc",
                    "defaultObjectData": null,
                    "initializationOperations": null,
                    "typeElementId": null,
                    "updateByName": false,
                    "id": "e62e0a37-5fe4-4dab-b310-fef722c3748a",
                    "elementType": "VARIABLE",
                    "developerName": "Salesforce Password",
                    "developerSummary": ""
                }
            ],
            "macroElements": null,
            "serviceElements": [
                {
                    "dateCreated": "2016-03-10T22:35:25Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                    "uri": "https://salesforce.manywho.com/plugins/api/salesforce/1",
                    "format": "JSON",
                    "configurationValues": [
                        {
                            "developerName": "AuthenticationUrl",
                            "valueElementToReferenceId": {
                                "id": "a2bdc7b8-9d63-4520-90ab-e8e07d82b822",
                                "typeElementPropertyId": null,
                                "command": ""
                            },
                            "valueElementToReferenceDeveloperName": null,
                            "typeElementDeveloperName": null,
                            "typeElementId": null,
                            "contentType": "ContentString",
                            "order": 0
                        },
                        {
                            "developerName": "Username",
                            "valueElementToReferenceId": {
                                "id": "0dd1e8db-2143-434e-8d69-1661d904d8e4",
                                "typeElementPropertyId": null,
                                "command": ""
                            },
                            "valueElementToReferenceDeveloperName": null,
                            "typeElementDeveloperName": null,
                            "typeElementId": null,
                            "contentType": "ContentString",
                            "order": 0
                        },
                        {
                            "developerName": "Password",
                            "valueElementToReferenceId": {
                                "id": "e62e0a37-5fe4-4dab-b310-fef722c3748a",
                                "typeElementPropertyId": null,
                                "command": ""
                            },
                            "valueElementToReferenceDeveloperName": null,
                            "typeElementDeveloperName": null,
                            "typeElementId": null,
                            "contentType": "ContentPassword",
                            "order": 0
                        },
                        {
                            "developerName": "ChatterBaseUrl",
                            "valueElementToReferenceId": {
                                "id": "0d696c01-097f-44da-9b33-39816c3af08e",
                                "typeElementPropertyId": null,
                                "command": ""
                            },
                            "valueElementToReferenceDeveloperName": null,
                            "typeElementDeveloperName": null,
                            "typeElementId": null,
                            "contentType": "ContentString",
                            "order": 0
                        },
                        {
                            "developerName": "AdminEmail",
                            "valueElementToReferenceId": {
                                "id": "9879b4da-19d2-4ce1-9bd6-688953fbbbe0",
                                "typeElementPropertyId": null,
                                "command": ""
                            },
                            "valueElementToReferenceDeveloperName": null,
                            "typeElementDeveloperName": null,
                            "typeElementId": null,
                            "contentType": "ContentString",
                            "order": 0
                        },
                        {
                            "developerName": "Authentication Strategy",
                            "valueElementToReferenceId": {
                                "id": "89173521-2d0b-412e-a33d-5cec1309d520",
                                "typeElementPropertyId": null,
                                "command": ""
                            },
                            "valueElementToReferenceDeveloperName": null,
                            "typeElementDeveloperName": null,
                            "typeElementId": null,
                            "contentType": "ContentString",
                            "order": 0
                        }
                    ],
                    "providesLogic": true,
                    "providesViews": false,
                    "providesFiles": false,
                    "providesDatabase": true,
                    "providesIdentity": true,
                    "providesSocial": true,
                    "providesLocation": false,
                    "providesAutoBinding": false,
                    "actions": [
                        {
                            "uriPart": "task",
                            "developerName": "Create Task",
                            "developerSummary": "This action creates a new task in salesforce.com",
                            "isViewMessageAction": false,
                            "serviceActionOutcomes": null,
                            "serviceInputs": [
                                {
                                    "developerName": "Activity Date",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentDateTime",
                                    "order": 0
                                },
                                {
                                    "developerName": "Description",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Priority",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Status",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Subject",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                }
                            ],
                            "serviceOutputs": [
                                {
                                    "developerName": "IsClosed",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentBoolean",
                                    "order": 0
                                },
                                {
                                    "developerName": "OwnerId",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "WhatId",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "WhoId",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "WhoId",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Activity Date",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentDateTime",
                                    "order": 0
                                },
                                {
                                    "developerName": "Description",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Priority",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Status",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Subject",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                }
                            ]
                        },
                        {
                            "uriPart": "notify",
                            "developerName": "Notify Users",
                            "developerSummary": "This action notifies the users in the authorization context of the flow or group.",
                            "isViewMessageAction": false,
                            "serviceActionOutcomes": null,
                            "serviceInputs": [
                                {
                                    "developerName": "Post",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                }
                            ],
                            "serviceOutputs": null
                        },
                        {
                            "uriPart": "createtaskemail",
                            "developerName": "Send Task Email",
                            "developerSummary": "This action sends an email to all users in the authorization context with buttons for each outcome.",
                            "isViewMessageAction": false,
                            "serviceActionOutcomes": null,
                            "serviceInputs": [
                                {
                                    "developerName": "To Email",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Subject",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "From Email",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Html Body",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentContent",
                                    "order": 0
                                },
                                {
                                    "developerName": "Text Body",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Redirect Uri",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Include Outcomes As Buttons",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentBoolean",
                                    "order": 0
                                }
                            ],
                            "serviceOutputs": null
                        },
                        {
                            "uriPart": "createtask",
                            "developerName": "Create A Task",
                            "developerSummary": "This action creates a task in salesforce that is not tied to async.",
                            "isViewMessageAction": false,
                            "serviceActionOutcomes": null,
                            "serviceInputs": [
                                {
                                    "developerName": "When",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Description",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Priority",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Status",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Subject",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                }
                            ],
                            "serviceOutputs": [
                                {
                                    "developerName": "Id",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                }
                            ]
                        },
                        {
                            "uriPart": "createevent",
                            "developerName": "Create A Calendar Event",
                            "developerSummary": "This action creates a calendar event in salesforce that is not tied to async.",
                            "isViewMessageAction": false,
                            "serviceActionOutcomes": null,
                            "serviceInputs": [
                                {
                                    "developerName": "When",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Duration",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentNumber",
                                    "order": 0
                                },
                                {
                                    "developerName": "Description",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                },
                                {
                                    "developerName": "Subject",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                }
                            ],
                            "serviceOutputs": [
                                {
                                    "developerName": "Id",
                                    "valueElementToReferenceId": null,
                                    "valueElementToReferenceDeveloperName": null,
                                    "typeElementDeveloperName": null,
                                    "typeElementId": null,
                                    "contentType": "ContentString",
                                    "order": 0
                                }
                            ]
                        }
                    ],
                    "install": null,
                    "updateByName": false,
                    "sendDecryptedValues": false,
                    "id": "34084059-946c-4860-81f8-87f7d435bcd4",
                    "elementType": "SERVICE",
                    "developerName": "Salesforce Service",
                    "developerSummary": ""
                }
            ],
            "typeElements": [
                {
                    "dateCreated": "2016-03-10T22:35:20Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                            "id": "618193cb-334c-4b01-a1f5-90dfa9490fde",
                            "developerName": "Contact ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "9b5e341f-fdaa-4919-bbcf-26c47248981a",
                            "developerName": "Deleted",
                            "contentType": "ContentBoolean",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "4b3507b1-57a5-4d67-9f95-3cf832f8520c",
                            "developerName": "Master Record ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "b5040ce1-c102-4ee6-877b-26221bcc55a1",
                            "developerName": "Master Record ID Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "63a2f7cc-93fa-40a4-a6ad-4b57aac82ea8",
                            "developerName": "Account ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "3d6ebc68-f11b-45a4-b9f4-2ed0bacfb10b",
                            "developerName": "Account ID Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "3fa4126d-d857-4bcd-9003-b9e2e748c537",
                            "developerName": "Last Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "b635360b-ca21-447d-a213-c2b8eac0dff7",
                            "developerName": "First Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "ed2e0e10-bfaf-4c37-a7f7-49fa61646b7a",
                            "developerName": "Salutation",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "d875c83d-0ce1-4036-ab65-3812d5519181",
                            "developerName": "Full Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "564235a9-2bcf-4d27-8e3d-1e606cf5971c",
                            "developerName": "Other Street",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "a41367bf-0d67-4bff-9b36-da3a92cb1a96",
                            "developerName": "Other City",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "cd6665bd-b788-49b3-9ba4-2e3f50ceb810",
                            "developerName": "Other State/Province",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "fe1567f0-f0eb-4601-9fed-c54ee020cfa3",
                            "developerName": "Other Zip/Postal Code",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "33f36071-5ce9-4288-b563-57ef06b70bcd",
                            "developerName": "Other Country",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "02b08bb4-ef43-4f8d-8fe3-a53d9cb7473c",
                            "developerName": "Mailing Street",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "fa4f7572-7cf8-4012-a122-0925f3f710d7",
                            "developerName": "Mailing City",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "4ce20845-22be-4162-9cb4-c0dfd4ddac85",
                            "developerName": "Mailing State/Province",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "d413900e-3478-4a0b-b737-8ac5dcc45fe6",
                            "developerName": "Mailing Zip/Postal Code",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "b3e53d53-00ba-4a51-88b9-ca16c270fbf6",
                            "developerName": "Mailing Country",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "a4c3ca01-a856-4360-b2ec-bc899612c7fa",
                            "developerName": "Business Phone",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "ac2a4b8c-e725-4266-92db-c1509b53f7f4",
                            "developerName": "Business Fax",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "237f99ef-c7f3-4e8f-9d16-eff046106e22",
                            "developerName": "Mobile Phone",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "16ac3a0a-26e8-4754-9b43-c239ed0cd59c",
                            "developerName": "Home Phone",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "473ca6da-14c1-4241-8707-9c495f381193",
                            "developerName": "Other Phone",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "4caf5d72-39ff-4fac-9263-852e47493dad",
                            "developerName": "Asst. Phone",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "ec95230c-776b-44d6-9d0a-3941ce5d2f56",
                            "developerName": "Reports To ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "440bb6c1-af1b-4272-8d6c-2b24d9f1fc3d",
                            "developerName": "Reports To ID Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "893ad817-1359-43da-a75f-e236fe5356f1",
                            "developerName": "Email",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "01360931-d7fd-464d-8cf6-f77c2189100c",
                            "developerName": "Title",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "58bcd52b-efa5-496e-b11f-7423b9900f0e",
                            "developerName": "Department",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "ab605714-06dc-46c6-aed6-bc64f4251b24",
                            "developerName": "Assistant's Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "1dddd0f3-3a86-404f-828e-33b0f7246a3b",
                            "developerName": "Lead Source",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "5671fa94-60e1-4232-b4fb-e18aef4c95d1",
                            "developerName": "Birthdate",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "5dd1f288-ebd8-4613-8e86-2bd93224119a",
                            "developerName": "Contact Description",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "d74c71c5-ecf2-4f2d-a88a-7506333a0d8f",
                            "developerName": "Owner ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "19510bd3-aa78-47d4-a77c-95aa8ec90e81",
                            "developerName": "Owner ID Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "13383173-1702-43d1-b0c3-479a887e824c",
                            "developerName": "Created Date",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "c7f60441-9498-4133-a7b7-95b86cc11302",
                            "developerName": "Created By ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "a4cb3717-c1b9-496f-8bb8-01e9278b1c60",
                            "developerName": "Created By ID Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "03810876-7ec2-4b8c-98c1-68fd63ea8c0c",
                            "developerName": "Last Modified Date",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "696a9556-e224-486b-ba91-0776b522ba23",
                            "developerName": "Last Modified By ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "67d2aa1d-237d-4b9c-9e65-1d01beda39f4",
                            "developerName": "Last Modified By ID Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "978d0e8f-0ecd-41c0-a728-0a8e67e992b5",
                            "developerName": "System Modstamp",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "b7fd2a00-948b-4a0f-b8fe-0d859c7b931e",
                            "developerName": "Last Activity",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "9dd98d3b-d540-4a39-8edf-2864658cb529",
                            "developerName": "Last Stay-in-Touch Request Date",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "9dba4775-9b45-45a6-8067-c0f757627f9d",
                            "developerName": "Last Stay-in-Touch Save Date",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "165bed96-474f-4816-a4ab-e0c1d801e0c7",
                            "developerName": "Email Bounced Reason",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "5a909805-88b4-4603-8f72-9b032550a757",
                            "developerName": "Email Bounced Date",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "a343308a-19e3-4a4c-969a-68e880217dae",
                            "developerName": "Data.com Key",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "0581306b-ce4a-4827-8f92-d5caccd1fc3a",
                            "developerName": "Jigsaw Contact ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "1e20eb60-fba8-47a6-96c3-5204acb448d1",
                            "developerName": "Level",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "8b05afa9-30b2-40e7-80e5-d38b4b22dbf6",
                            "developerName": "Languages",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        }
                    ],
                    "bindings": [
                        {
                            "id": "5834865d-eb26-4bab-90e3-0c685cf1cd09",
                            "developerName": "Salesforce.com Contact Binding",
                            "developerSummary": "The binding to save Contact objects into salesforce.com",
                            "databaseTableName": "Contact",
                            "serviceElementId": "34084059-946c-4860-81f8-87f7d435bcd4",
                            "propertyBindings": [
                                {
                                    "databaseFieldName": "Id",
                                    "typeElementPropertyId": "618193cb-334c-4b01-a1f5-90dfa9490fde",
                                    "typeElementPropertyDeveloperName": "Contact ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "IsDeleted",
                                    "typeElementPropertyId": "9b5e341f-fdaa-4919-bbcf-26c47248981a",
                                    "typeElementPropertyDeveloperName": "Deleted",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "MasterRecordId",
                                    "typeElementPropertyId": "4b3507b1-57a5-4d67-9f95-3cf832f8520c",
                                    "typeElementPropertyDeveloperName": "Master Record ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "MasterRecord.Name",
                                    "typeElementPropertyId": "b5040ce1-c102-4ee6-877b-26221bcc55a1",
                                    "typeElementPropertyDeveloperName": "Master Record ID Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "AccountId",
                                    "typeElementPropertyId": "63a2f7cc-93fa-40a4-a6ad-4b57aac82ea8",
                                    "typeElementPropertyDeveloperName": "Account ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Account.Name",
                                    "typeElementPropertyId": "3d6ebc68-f11b-45a4-b9f4-2ed0bacfb10b",
                                    "typeElementPropertyDeveloperName": "Account ID Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "LastName",
                                    "typeElementPropertyId": "3fa4126d-d857-4bcd-9003-b9e2e748c537",
                                    "typeElementPropertyDeveloperName": "Last Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "FirstName",
                                    "typeElementPropertyId": "b635360b-ca21-447d-a213-c2b8eac0dff7",
                                    "typeElementPropertyDeveloperName": "First Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Salutation",
                                    "typeElementPropertyId": "ed2e0e10-bfaf-4c37-a7f7-49fa61646b7a",
                                    "typeElementPropertyDeveloperName": "Salutation",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Name",
                                    "typeElementPropertyId": "d875c83d-0ce1-4036-ab65-3812d5519181",
                                    "typeElementPropertyDeveloperName": "Full Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "OtherStreet",
                                    "typeElementPropertyId": "564235a9-2bcf-4d27-8e3d-1e606cf5971c",
                                    "typeElementPropertyDeveloperName": "Other Street",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "OtherCity",
                                    "typeElementPropertyId": "a41367bf-0d67-4bff-9b36-da3a92cb1a96",
                                    "typeElementPropertyDeveloperName": "Other City",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "OtherState",
                                    "typeElementPropertyId": "cd6665bd-b788-49b3-9ba4-2e3f50ceb810",
                                    "typeElementPropertyDeveloperName": "Other State/Province",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "OtherPostalCode",
                                    "typeElementPropertyId": "fe1567f0-f0eb-4601-9fed-c54ee020cfa3",
                                    "typeElementPropertyDeveloperName": "Other Zip/Postal Code",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "OtherCountry",
                                    "typeElementPropertyId": "33f36071-5ce9-4288-b563-57ef06b70bcd",
                                    "typeElementPropertyDeveloperName": "Other Country",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "MailingStreet",
                                    "typeElementPropertyId": "02b08bb4-ef43-4f8d-8fe3-a53d9cb7473c",
                                    "typeElementPropertyDeveloperName": "Mailing Street",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "MailingCity",
                                    "typeElementPropertyId": "fa4f7572-7cf8-4012-a122-0925f3f710d7",
                                    "typeElementPropertyDeveloperName": "Mailing City",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "MailingState",
                                    "typeElementPropertyId": "4ce20845-22be-4162-9cb4-c0dfd4ddac85",
                                    "typeElementPropertyDeveloperName": "Mailing State/Province",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "MailingPostalCode",
                                    "typeElementPropertyId": "d413900e-3478-4a0b-b737-8ac5dcc45fe6",
                                    "typeElementPropertyDeveloperName": "Mailing Zip/Postal Code",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "MailingCountry",
                                    "typeElementPropertyId": "b3e53d53-00ba-4a51-88b9-ca16c270fbf6",
                                    "typeElementPropertyDeveloperName": "Mailing Country",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Phone",
                                    "typeElementPropertyId": "a4c3ca01-a856-4360-b2ec-bc899612c7fa",
                                    "typeElementPropertyDeveloperName": "Business Phone",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Fax",
                                    "typeElementPropertyId": "ac2a4b8c-e725-4266-92db-c1509b53f7f4",
                                    "typeElementPropertyDeveloperName": "Business Fax",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "MobilePhone",
                                    "typeElementPropertyId": "237f99ef-c7f3-4e8f-9d16-eff046106e22",
                                    "typeElementPropertyDeveloperName": "Mobile Phone",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "HomePhone",
                                    "typeElementPropertyId": "16ac3a0a-26e8-4754-9b43-c239ed0cd59c",
                                    "typeElementPropertyDeveloperName": "Home Phone",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "OtherPhone",
                                    "typeElementPropertyId": "473ca6da-14c1-4241-8707-9c495f381193",
                                    "typeElementPropertyDeveloperName": "Other Phone",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "AssistantPhone",
                                    "typeElementPropertyId": "4caf5d72-39ff-4fac-9263-852e47493dad",
                                    "typeElementPropertyDeveloperName": "Asst. Phone",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "ReportsToId",
                                    "typeElementPropertyId": "ec95230c-776b-44d6-9d0a-3941ce5d2f56",
                                    "typeElementPropertyDeveloperName": "Reports To ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "ReportsTo.Name",
                                    "typeElementPropertyId": "440bb6c1-af1b-4272-8d6c-2b24d9f1fc3d",
                                    "typeElementPropertyDeveloperName": "Reports To ID Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Email",
                                    "typeElementPropertyId": "893ad817-1359-43da-a75f-e236fe5356f1",
                                    "typeElementPropertyDeveloperName": "Email",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Title",
                                    "typeElementPropertyId": "01360931-d7fd-464d-8cf6-f77c2189100c",
                                    "typeElementPropertyDeveloperName": "Title",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Department",
                                    "typeElementPropertyId": "58bcd52b-efa5-496e-b11f-7423b9900f0e",
                                    "typeElementPropertyDeveloperName": "Department",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "AssistantName",
                                    "typeElementPropertyId": "ab605714-06dc-46c6-aed6-bc64f4251b24",
                                    "typeElementPropertyDeveloperName": "Assistant's Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "LeadSource",
                                    "typeElementPropertyId": "1dddd0f3-3a86-404f-828e-33b0f7246a3b",
                                    "typeElementPropertyDeveloperName": "Lead Source",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Birthdate",
                                    "typeElementPropertyId": "5671fa94-60e1-4232-b4fb-e18aef4c95d1",
                                    "typeElementPropertyDeveloperName": "Birthdate",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Description",
                                    "typeElementPropertyId": "5dd1f288-ebd8-4613-8e86-2bd93224119a",
                                    "typeElementPropertyDeveloperName": "Contact Description",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "OwnerId",
                                    "typeElementPropertyId": "d74c71c5-ecf2-4f2d-a88a-7506333a0d8f",
                                    "typeElementPropertyDeveloperName": "Owner ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Owner.Name",
                                    "typeElementPropertyId": "19510bd3-aa78-47d4-a77c-95aa8ec90e81",
                                    "typeElementPropertyDeveloperName": "Owner ID Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "CreatedDate",
                                    "typeElementPropertyId": "13383173-1702-43d1-b0c3-479a887e824c",
                                    "typeElementPropertyDeveloperName": "Created Date",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "CreatedById",
                                    "typeElementPropertyId": "c7f60441-9498-4133-a7b7-95b86cc11302",
                                    "typeElementPropertyDeveloperName": "Created By ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "CreatedBy.Name",
                                    "typeElementPropertyId": "a4cb3717-c1b9-496f-8bb8-01e9278b1c60",
                                    "typeElementPropertyDeveloperName": "Created By ID Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "LastModifiedDate",
                                    "typeElementPropertyId": "03810876-7ec2-4b8c-98c1-68fd63ea8c0c",
                                    "typeElementPropertyDeveloperName": "Last Modified Date",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "LastModifiedById",
                                    "typeElementPropertyId": "696a9556-e224-486b-ba91-0776b522ba23",
                                    "typeElementPropertyDeveloperName": "Last Modified By ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "LastModifiedBy.Name",
                                    "typeElementPropertyId": "67d2aa1d-237d-4b9c-9e65-1d01beda39f4",
                                    "typeElementPropertyDeveloperName": "Last Modified By ID Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "SystemModstamp",
                                    "typeElementPropertyId": "978d0e8f-0ecd-41c0-a728-0a8e67e992b5",
                                    "typeElementPropertyDeveloperName": "System Modstamp",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "LastActivityDate",
                                    "typeElementPropertyId": "b7fd2a00-948b-4a0f-b8fe-0d859c7b931e",
                                    "typeElementPropertyDeveloperName": "Last Activity",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "LastCURequestDate",
                                    "typeElementPropertyId": "9dd98d3b-d540-4a39-8edf-2864658cb529",
                                    "typeElementPropertyDeveloperName": "Last Stay-in-Touch Request Date",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "LastCUUpdateDate",
                                    "typeElementPropertyId": "9dba4775-9b45-45a6-8067-c0f757627f9d",
                                    "typeElementPropertyDeveloperName": "Last Stay-in-Touch Save Date",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "EmailBouncedReason",
                                    "typeElementPropertyId": "165bed96-474f-4816-a4ab-e0c1d801e0c7",
                                    "typeElementPropertyDeveloperName": "Email Bounced Reason",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "EmailBouncedDate",
                                    "typeElementPropertyId": "5a909805-88b4-4603-8f72-9b032550a757",
                                    "typeElementPropertyDeveloperName": "Email Bounced Date",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Jigsaw",
                                    "typeElementPropertyId": "a343308a-19e3-4a4c-969a-68e880217dae",
                                    "typeElementPropertyDeveloperName": "Data.com Key",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "JigsawContactId",
                                    "typeElementPropertyId": "0581306b-ce4a-4827-8f92-d5caccd1fc3a",
                                    "typeElementPropertyDeveloperName": "Jigsaw Contact ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Level__c",
                                    "typeElementPropertyId": "1e20eb60-fba8-47a6-96c3-5204acb448d1",
                                    "typeElementPropertyDeveloperName": "Level",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Languages__c",
                                    "typeElementPropertyId": "8b05afa9-30b2-40e7-80e5-d38b4b22dbf6",
                                    "typeElementPropertyDeveloperName": "Languages",
                                    "databaseContentType": null
                                }
                            ],
                            "typeElementId": "534e0e19-3ea1-4e55-9cce-86afdff8daa3"
                        }
                    ],
                    "updateByName": false,
                    "serviceElementId": "34084059-946c-4860-81f8-87f7d435bcd4",
                    "id": "534e0e19-3ea1-4e55-9cce-86afdff8daa3",
                    "elementType": "TYPE",
                    "developerName": "Contact",
                    "developerSummary": null
                },
                {
                    "dateCreated": "2016-03-10T22:35:20Z",
                    "dateModified": "2016-03-10T22:39:32Z",
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
                            "id": "0c61372d-673a-460e-a735-2b5e450c735c",
                            "developerName": "Account ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "e3069182-ae2b-40ba-85b2-0b22b8ff90b4",
                            "developerName": "Deleted",
                            "contentType": "ContentBoolean",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "63906ddf-0741-4a05-828a-14d730aca710",
                            "developerName": "Master Record ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "d25b4b5a-6414-45fa-a0c7-ddd34a1145c7",
                            "developerName": "Master Record ID Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "7ef609fe-348c-4148-9cfc-1e97daf09c2f",
                            "developerName": "Account Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "cc9fe39a-8aff-43bc-9f9a-caa8c9d1044e",
                            "developerName": "Account Type",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "33614b80-8418-49cc-9c31-a552530a83f3",
                            "developerName": "Parent Account ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "9a9f5522-e552-4f1d-a787-d66ccab72e12",
                            "developerName": "Parent Account ID Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "3478cfd5-e933-487a-b224-116214acda4b",
                            "developerName": "Billing Street",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "d51d6ece-459e-421c-ac98-504189991c86",
                            "developerName": "Billing City",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "507f43d0-2fc9-423c-b4d3-55ad0bb24d53",
                            "developerName": "Billing State/Province",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "58f8c4c1-11ce-4ff0-b42f-6f0a6d02a459",
                            "developerName": "Billing Zip/Postal Code",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "fc1c5832-5fa2-40e5-8a95-d36b006e2e53",
                            "developerName": "Billing Country",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "42d28003-a898-473f-b831-cc32a58a992d",
                            "developerName": "Shipping Street",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "9df18f6a-f184-4f3e-8503-81d8e329bfc7",
                            "developerName": "Shipping City",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "0bb034b4-b43a-4a15-b93f-dc20843a7dcd",
                            "developerName": "Shipping State/Province",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "2a1bee77-f256-4eee-ba26-344e0671d5d0",
                            "developerName": "Shipping Zip/Postal Code",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "d05c6680-789e-43e4-a080-282a7c0bd2a8",
                            "developerName": "Shipping Country",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "1b011f80-b4e5-4a94-afaa-cefd2760f5a9",
                            "developerName": "Account Phone",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "050b1145-a521-4b1a-8431-03dd3d5dc5a4",
                            "developerName": "Account Fax",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "6a4f7964-a278-4e38-987f-c8cb6ca81176",
                            "developerName": "Account Number",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "fc99ac8a-7a5a-49c6-84d0-facf814b34e0",
                            "developerName": "Website",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "dd0e40ad-d646-47ad-9faf-33a7efd68ff8",
                            "developerName": "SIC Code",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "b6578ddc-b697-4e6f-9144-f35b70b58824",
                            "developerName": "Industry",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "ca60c195-0e8c-4912-8433-a39efcf628ed",
                            "developerName": "Annual Revenue",
                            "contentType": "ContentNumber",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "da85ac99-5ef8-44f6-a108-f9ac36b71b76",
                            "developerName": "Employees",
                            "contentType": "ContentNumber",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "275819c6-1a30-4e18-ba16-e4f6be3f6318",
                            "developerName": "Ownership",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "1f638059-d650-4d21-a458-dc477b04e523",
                            "developerName": "Ticker Symbol",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "2ade7667-0301-47e8-b447-e4ae9c4ba467",
                            "developerName": "Account Description",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "ab9953d1-e69e-4a10-a79e-f96e18351c17",
                            "developerName": "Account Rating",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "0d2ab3fe-d2a6-49f8-a204-56168d09c30d",
                            "developerName": "Account Site",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "b1ecccab-03c5-4bbd-a5d4-e7c2abba037a",
                            "developerName": "Owner ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "187dcc46-a497-4809-887c-00697eb5ed4c",
                            "developerName": "Owner ID Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "08ad03b9-5736-407d-9223-acd6788f9a03",
                            "developerName": "Created Date",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "c4a8bf78-b33d-42d5-ba14-7e598613e4cf",
                            "developerName": "Created By ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "a5d79b12-a992-4700-bc8f-7f6683be95da",
                            "developerName": "Created By ID Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "236a607f-3cd4-48f7-9b82-9a2fce75b4af",
                            "developerName": "Last Modified Date",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "55f9d91e-cd53-4867-9868-c3f99d330895",
                            "developerName": "Last Modified By ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "4f4cf044-017a-4496-9187-c14aedd2972d",
                            "developerName": "Last Modified By ID Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "d82a04a6-62a0-4a2b-8b8b-c71975970f55",
                            "developerName": "System Modstamp",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "326b8622-592b-485c-9b3a-144811357f65",
                            "developerName": "Last Activity",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "1f4e8d6c-c69b-44e6-baf1-c0d053863018",
                            "developerName": "Data.com Key",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "952d662d-f764-4443-aa4e-e7612b0dcb02",
                            "developerName": "Jigsaw Company ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "74888716-8bf6-41d7-972f-c742a6b68b34",
                            "developerName": "Account Source",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "6853d52d-d815-434d-9812-82339c73d97c",
                            "developerName": "D-U-N-S Number",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "135f2e7d-0efd-4a2b-b76c-c5bf7fc79dfc",
                            "developerName": "Tradestyle",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "411aa4a7-f589-4dea-858a-ccae1ad68f31",
                            "developerName": "NAICS Code",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "bbaa57db-98f5-41af-8504-e0712b96f641",
                            "developerName": "NAICS Description",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "0a9d9320-59ef-44aa-a18a-7418478226c4",
                            "developerName": "Year Started",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "b125acb5-253a-4a18-ba7e-9507474f0674",
                            "developerName": "SIC Description",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "72fbe50e-8b07-4076-baf1-0631d689bdfb",
                            "developerName": "D&B Company ID",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "63837e32-7725-4e72-9739-9b93e70c0479",
                            "developerName": "D&B Company ID Name",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "fe720d11-d085-4823-97ff-e343ed4d1063",
                            "developerName": "Customer Priority",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "c0800b8f-82e6-44fd-8d6f-21a1e659ede5",
                            "developerName": "SLA",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "e7857acf-68c4-4bd3-8b1f-99c7e353a0d2",
                            "developerName": "Active",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "df6f6826-118f-4d9b-8f1b-97fe1309ee2d",
                            "developerName": "Number of Locations",
                            "contentType": "ContentNumber",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "59c45ca6-d83d-41b1-9390-425b558ff6b9",
                            "developerName": "Upsell Opportunity",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "f43de94f-23e0-41e4-ba90-b88070d9c8ec",
                            "developerName": "SLA Serial Number",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        },
                        {
                            "id": "ff9a3fdb-f29b-4374-8c4d-669c198a345e",
                            "developerName": "SLA Expiration Date",
                            "contentType": "ContentDateTime",
                            "contentFormat": null,
                            "typeElementId": null,
                            "typeElementDeveloperName": null
                        }
                    ],
                    "bindings": [
                        {
                            "id": "9a6d9427-5452-4f3b-9c20-e167a8438ee7",
                            "developerName": "Salesforce.com Account Binding",
                            "developerSummary": "The binding to save Account objects into salesforce.com",
                            "databaseTableName": "Account",
                            "serviceElementId": "34084059-946c-4860-81f8-87f7d435bcd4",
                            "propertyBindings": [
                                {
                                    "databaseFieldName": "Id",
                                    "typeElementPropertyId": "0c61372d-673a-460e-a735-2b5e450c735c",
                                    "typeElementPropertyDeveloperName": "Account ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "IsDeleted",
                                    "typeElementPropertyId": "e3069182-ae2b-40ba-85b2-0b22b8ff90b4",
                                    "typeElementPropertyDeveloperName": "Deleted",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "MasterRecordId",
                                    "typeElementPropertyId": "63906ddf-0741-4a05-828a-14d730aca710",
                                    "typeElementPropertyDeveloperName": "Master Record ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "MasterRecord.Name",
                                    "typeElementPropertyId": "d25b4b5a-6414-45fa-a0c7-ddd34a1145c7",
                                    "typeElementPropertyDeveloperName": "Master Record ID Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Name",
                                    "typeElementPropertyId": "7ef609fe-348c-4148-9cfc-1e97daf09c2f",
                                    "typeElementPropertyDeveloperName": "Account Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Type",
                                    "typeElementPropertyId": "cc9fe39a-8aff-43bc-9f9a-caa8c9d1044e",
                                    "typeElementPropertyDeveloperName": "Account Type",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "ParentId",
                                    "typeElementPropertyId": "33614b80-8418-49cc-9c31-a552530a83f3",
                                    "typeElementPropertyDeveloperName": "Parent Account ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Parent.Name",
                                    "typeElementPropertyId": "9a9f5522-e552-4f1d-a787-d66ccab72e12",
                                    "typeElementPropertyDeveloperName": "Parent Account ID Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "BillingStreet",
                                    "typeElementPropertyId": "3478cfd5-e933-487a-b224-116214acda4b",
                                    "typeElementPropertyDeveloperName": "Billing Street",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "BillingCity",
                                    "typeElementPropertyId": "d51d6ece-459e-421c-ac98-504189991c86",
                                    "typeElementPropertyDeveloperName": "Billing City",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "BillingState",
                                    "typeElementPropertyId": "507f43d0-2fc9-423c-b4d3-55ad0bb24d53",
                                    "typeElementPropertyDeveloperName": "Billing State/Province",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "BillingPostalCode",
                                    "typeElementPropertyId": "58f8c4c1-11ce-4ff0-b42f-6f0a6d02a459",
                                    "typeElementPropertyDeveloperName": "Billing Zip/Postal Code",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "BillingCountry",
                                    "typeElementPropertyId": "fc1c5832-5fa2-40e5-8a95-d36b006e2e53",
                                    "typeElementPropertyDeveloperName": "Billing Country",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "ShippingStreet",
                                    "typeElementPropertyId": "42d28003-a898-473f-b831-cc32a58a992d",
                                    "typeElementPropertyDeveloperName": "Shipping Street",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "ShippingCity",
                                    "typeElementPropertyId": "9df18f6a-f184-4f3e-8503-81d8e329bfc7",
                                    "typeElementPropertyDeveloperName": "Shipping City",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "ShippingState",
                                    "typeElementPropertyId": "0bb034b4-b43a-4a15-b93f-dc20843a7dcd",
                                    "typeElementPropertyDeveloperName": "Shipping State/Province",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "ShippingPostalCode",
                                    "typeElementPropertyId": "2a1bee77-f256-4eee-ba26-344e0671d5d0",
                                    "typeElementPropertyDeveloperName": "Shipping Zip/Postal Code",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "ShippingCountry",
                                    "typeElementPropertyId": "d05c6680-789e-43e4-a080-282a7c0bd2a8",
                                    "typeElementPropertyDeveloperName": "Shipping Country",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Phone",
                                    "typeElementPropertyId": "1b011f80-b4e5-4a94-afaa-cefd2760f5a9",
                                    "typeElementPropertyDeveloperName": "Account Phone",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Fax",
                                    "typeElementPropertyId": "050b1145-a521-4b1a-8431-03dd3d5dc5a4",
                                    "typeElementPropertyDeveloperName": "Account Fax",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "AccountNumber",
                                    "typeElementPropertyId": "6a4f7964-a278-4e38-987f-c8cb6ca81176",
                                    "typeElementPropertyDeveloperName": "Account Number",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Website",
                                    "typeElementPropertyId": "fc99ac8a-7a5a-49c6-84d0-facf814b34e0",
                                    "typeElementPropertyDeveloperName": "Website",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Sic",
                                    "typeElementPropertyId": "dd0e40ad-d646-47ad-9faf-33a7efd68ff8",
                                    "typeElementPropertyDeveloperName": "SIC Code",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Industry",
                                    "typeElementPropertyId": "b6578ddc-b697-4e6f-9144-f35b70b58824",
                                    "typeElementPropertyDeveloperName": "Industry",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "AnnualRevenue",
                                    "typeElementPropertyId": "ca60c195-0e8c-4912-8433-a39efcf628ed",
                                    "typeElementPropertyDeveloperName": "Annual Revenue",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "NumberOfEmployees",
                                    "typeElementPropertyId": "da85ac99-5ef8-44f6-a108-f9ac36b71b76",
                                    "typeElementPropertyDeveloperName": "Employees",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Ownership",
                                    "typeElementPropertyId": "275819c6-1a30-4e18-ba16-e4f6be3f6318",
                                    "typeElementPropertyDeveloperName": "Ownership",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "TickerSymbol",
                                    "typeElementPropertyId": "1f638059-d650-4d21-a458-dc477b04e523",
                                    "typeElementPropertyDeveloperName": "Ticker Symbol",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Description",
                                    "typeElementPropertyId": "2ade7667-0301-47e8-b447-e4ae9c4ba467",
                                    "typeElementPropertyDeveloperName": "Account Description",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Rating",
                                    "typeElementPropertyId": "ab9953d1-e69e-4a10-a79e-f96e18351c17",
                                    "typeElementPropertyDeveloperName": "Account Rating",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Site",
                                    "typeElementPropertyId": "0d2ab3fe-d2a6-49f8-a204-56168d09c30d",
                                    "typeElementPropertyDeveloperName": "Account Site",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "OwnerId",
                                    "typeElementPropertyId": "b1ecccab-03c5-4bbd-a5d4-e7c2abba037a",
                                    "typeElementPropertyDeveloperName": "Owner ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Owner.Name",
                                    "typeElementPropertyId": "187dcc46-a497-4809-887c-00697eb5ed4c",
                                    "typeElementPropertyDeveloperName": "Owner ID Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "CreatedDate",
                                    "typeElementPropertyId": "08ad03b9-5736-407d-9223-acd6788f9a03",
                                    "typeElementPropertyDeveloperName": "Created Date",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "CreatedById",
                                    "typeElementPropertyId": "c4a8bf78-b33d-42d5-ba14-7e598613e4cf",
                                    "typeElementPropertyDeveloperName": "Created By ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "CreatedBy.Name",
                                    "typeElementPropertyId": "a5d79b12-a992-4700-bc8f-7f6683be95da",
                                    "typeElementPropertyDeveloperName": "Created By ID Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "LastModifiedDate",
                                    "typeElementPropertyId": "236a607f-3cd4-48f7-9b82-9a2fce75b4af",
                                    "typeElementPropertyDeveloperName": "Last Modified Date",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "LastModifiedById",
                                    "typeElementPropertyId": "55f9d91e-cd53-4867-9868-c3f99d330895",
                                    "typeElementPropertyDeveloperName": "Last Modified By ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "LastModifiedBy.Name",
                                    "typeElementPropertyId": "4f4cf044-017a-4496-9187-c14aedd2972d",
                                    "typeElementPropertyDeveloperName": "Last Modified By ID Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "SystemModstamp",
                                    "typeElementPropertyId": "d82a04a6-62a0-4a2b-8b8b-c71975970f55",
                                    "typeElementPropertyDeveloperName": "System Modstamp",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "LastActivityDate",
                                    "typeElementPropertyId": "326b8622-592b-485c-9b3a-144811357f65",
                                    "typeElementPropertyDeveloperName": "Last Activity",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Jigsaw",
                                    "typeElementPropertyId": "1f4e8d6c-c69b-44e6-baf1-c0d053863018",
                                    "typeElementPropertyDeveloperName": "Data.com Key",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "JigsawCompanyId",
                                    "typeElementPropertyId": "952d662d-f764-4443-aa4e-e7612b0dcb02",
                                    "typeElementPropertyDeveloperName": "Jigsaw Company ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "AccountSource",
                                    "typeElementPropertyId": "74888716-8bf6-41d7-972f-c742a6b68b34",
                                    "typeElementPropertyDeveloperName": "Account Source",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "DunsNumber",
                                    "typeElementPropertyId": "6853d52d-d815-434d-9812-82339c73d97c",
                                    "typeElementPropertyDeveloperName": "D-U-N-S Number",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Tradestyle",
                                    "typeElementPropertyId": "135f2e7d-0efd-4a2b-b76c-c5bf7fc79dfc",
                                    "typeElementPropertyDeveloperName": "Tradestyle",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "NaicsCode",
                                    "typeElementPropertyId": "411aa4a7-f589-4dea-858a-ccae1ad68f31",
                                    "typeElementPropertyDeveloperName": "NAICS Code",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "NaicsDesc",
                                    "typeElementPropertyId": "bbaa57db-98f5-41af-8504-e0712b96f641",
                                    "typeElementPropertyDeveloperName": "NAICS Description",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "YearStarted",
                                    "typeElementPropertyId": "0a9d9320-59ef-44aa-a18a-7418478226c4",
                                    "typeElementPropertyDeveloperName": "Year Started",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "SicDesc",
                                    "typeElementPropertyId": "b125acb5-253a-4a18-ba7e-9507474f0674",
                                    "typeElementPropertyDeveloperName": "SIC Description",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "DandbCompanyId",
                                    "typeElementPropertyId": "72fbe50e-8b07-4076-baf1-0631d689bdfb",
                                    "typeElementPropertyDeveloperName": "D&B Company ID",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "DandbCompany.Name",
                                    "typeElementPropertyId": "63837e32-7725-4e72-9739-9b93e70c0479",
                                    "typeElementPropertyDeveloperName": "D&B Company ID Name",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "CustomerPriority__c",
                                    "typeElementPropertyId": "fe720d11-d085-4823-97ff-e343ed4d1063",
                                    "typeElementPropertyDeveloperName": "Customer Priority",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "SLA__c",
                                    "typeElementPropertyId": "c0800b8f-82e6-44fd-8d6f-21a1e659ede5",
                                    "typeElementPropertyDeveloperName": "SLA",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "Active__c",
                                    "typeElementPropertyId": "e7857acf-68c4-4bd3-8b1f-99c7e353a0d2",
                                    "typeElementPropertyDeveloperName": "Active",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "NumberofLocations__c",
                                    "typeElementPropertyId": "df6f6826-118f-4d9b-8f1b-97fe1309ee2d",
                                    "typeElementPropertyDeveloperName": "Number of Locations",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "UpsellOpportunity__c",
                                    "typeElementPropertyId": "59c45ca6-d83d-41b1-9390-425b558ff6b9",
                                    "typeElementPropertyDeveloperName": "Upsell Opportunity",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "SLASerialNumber__c",
                                    "typeElementPropertyId": "f43de94f-23e0-41e4-ba90-b88070d9c8ec",
                                    "typeElementPropertyDeveloperName": "SLA Serial Number",
                                    "databaseContentType": null
                                },
                                {
                                    "databaseFieldName": "SLAExpirationDate__c",
                                    "typeElementPropertyId": "ff9a3fdb-f29b-4374-8c4d-669c198a345e",
                                    "typeElementPropertyDeveloperName": "SLA Expiration Date",
                                    "databaseContentType": null
                                }
                            ],
                            "typeElementId": "9e763762-9212-4456-b60c-8d06e72e5be1"
                        }
                    ],
                    "updateByName": false,
                    "serviceElementId": "34084059-946c-4860-81f8-87f7d435bcd4",
                    "id": "9e763762-9212-4456-b60c-8d06e72e5be1",
                    "elementType": "TYPE",
                    "developerName": "Account",
                    "developerSummary": null
                }
            ],
            "tagElements": null,
            "dateCreated": "2016-03-10T22:35:42Z",
            "dateModified": "2016-03-10T22:39:32Z",
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
                "id": "9a563d47-fa58-4a27-b633-f1fd6898ed07",
                "versionId": "54fb977c-e758-443f-b13f-1acf64c70f95"
            },
            "developerName": "Account Manager",
            "developerSummary": "",
            "startMapElementId": "4cfebe7e-f3a6-4379-94b0-a5a7285bd529",
            "allowJumping": true,
            "stateExpirationLength": 0,
            "authorization": {
                "serviceElementId": "34084059-946c-4860-81f8-87f7d435bcd4",
                "globalAuthenticationType": "PUBLIC",
                "streamBehaviourType": "NONE",
                "groups": null,
                "users": null,
                "locations": null
            }
        }

    }

})(offline);
