manywho.responses = (function (manywho) {

    return {

        get: function (identifier) {



            // Get values out of the "state" matched to the page component identifiers

            /*{
                "pageComponentId": "18139285-c4da-4a0e-a2ae-22e3806c8ffe",
                "isEnabled": true,
                "isEditable": true,
                "isRequired": false,
                "isVisible": true,
                "objectData": [
                {
                    "internalId": "96d9348e-e5cc-4df6-be73-d607313f0bff",
                    "externalId": "96d9348e-e5cc-4df6-be73-d607313f0bff",
                    "developerName": "Task",
                    "typeElementId": "f20368e7-b079-47ba-8914-f464ef23f4de",
                    "order": 0,
                    "properties": [
                        {
                            "typeElementPropertyId": "e2f11a5f-4479-46b7-9a1e-e395395f2239",
                            "developerName": "Description",
                            "contentValue": "This is my task",
                            "contentType": "ContentString",
                            "contentFormat": null,
                            "objectData": null
                        },
                        {
                            "typeElementPropertyId": "39ba3f48-dca6-4f11-883a-76cac811c7f5",
                            "developerName": "Due Date",
                            "contentValue": "19 Feb 2016",
                            "contentType": "ContentDateTime",
                            "contentFormat": "dd MMM yyyy",
                            "objectData": null
                        },
                        {
                            "typeElementPropertyId": "5716de73-50a2-4410-b2cb-a61624fcb20c",
                            "developerName": "Subject",
                            "contentValue": "My Task",
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
            }*/



            var response =  manywho.cache.cachedResponses[identifier];

            if (response != null &&
                response.mapElementInvokeResponses &&
                response.mapElementInvokeResponses != null &&
                response.mapElementInvokeResponses.length > 0 &&
                response.mapElementInvokeResponses[0].pageResponse != null &&
                response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses != null &&
                response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses.length) {

                for (var i = 0; i < response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses.length; i++) {

                    var pageComponentInfo = manywho.cache.getPageComponentInfo(
                        response.currentMapElementId,
                        response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses[i].pageComponentId
                    );

                    if (pageComponentInfo.typeElement &&
                        pageComponentInfo.typeElement != null &&
                        manywho.utils.isNullOrWhitespace(pageComponentInfo.typeElement.id) == false) {

                        // Get the data from the tables cache
                        response.mapElementInvokeResponses[0].pageResponse.pageComponentDataResponses[i].objectData = manywho.cache.tables[pageComponentInfo.typeElement.id];

                    }

                }

            }

            return response;

        },

        getAll: function () {

            return manywho.cache.cachedResponses;

        },

        set: function (identifier, responseObject) {

            // Don't set as we're hard coding the cached responses
            //this.cachedResponses[identifier] = responseObject;

        }

    }

})(manywho);