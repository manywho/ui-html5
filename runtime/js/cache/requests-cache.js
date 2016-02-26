manywho.requests = (function (manywho) {

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function addToTypesTable(typeElementId, objectData) {

        var table = null;

        if (manywho.cache.tables[typeElementId] == null) {

            manywho.cache.tables[typeElementId] = [];

        }

        table = manywho.cache.tables[typeElementId];

        var found = false;

        if (table.length > 0) {

            for (var i = 0; i < table.length; i++) {

                if (table[i].externalId == objectData.externalId) {

                    // Update the existing entry
                    table[i] = objectData;
                    found = true;
                    break;

                }

            }

        }

        // The table is empty, simply add the record
        table.push(objectData);

        // Push the updated table back to memory
        manywho.cache.tables[typeElementId] = table;

    }

    return {

        cachedRequest: null,

        cachedRequests: {},

        getAll: function () {

            return this.cachedRequests;

        },

        isRecording: function () {

            if (this.cachedRequest != null) {

                return true;

            }

            return false;

        },

        apply: function (identifier, mapElementId, request) {

            this.cachedRequest = this.cachedRequests[identifier];

            // If we don't have a cached request for this identifier, create one now
            if (this.cachedRequest == null) {

                this.cachedRequest = {};

            }

            // Assign the request object for this map element
            this.cachedRequest[mapElementId] = request;

            // Set the cached request entry back into the cache
            this.cachedRequests[identifier] = this.cachedRequest;

            var currentValues = {};

            // Now we want to handle local state changes
            if (request.mapElementInvokeRequest &&
                request.mapElementInvokeRequest.pageRequest != null &&
                request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses != null &&
                request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses.length > 0) {

                // The request has some data or information we may want to store
                for (var i = 0; i < request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses.length; i++) {

                    if (request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses[i].contentValue == null &&
                        request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses[i].objectData == null) {

                        // Ignore this data as it's null, we do include if the contentValue is blank
                        continue;

                    }

                    var pageComponentInfo = manywho.cache.getPageComponentInfo(
                        request.currentMapElementId,
                        request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses[i].pageComponentId
                    );

                    var objectDataValue = null;

                    // If we have a property, we need to construct the object
                    if (pageComponentInfo.typeElementProperty != null) {

                        if (currentValues[pageComponentInfo.valueElement.id] == null) {

                            // We don't yet have an object data value for this request, so create one
                            objectDataValue = {
                                "externalId": guid(),
                                "developerName": pageComponentInfo.typeElement.developerName,
                                "typeElementId": pageComponentInfo.typeElement.id,
                                "properties": []
                            }

                        } else {

                            // Re-use the existing object data value for this request as we're updating it
                            objectDataValue = currentValues[pageComponentInfo.valueElement.id];

                        }

                        objectDataValue.properties.push({
                            "typeElementPropertyId": pageComponentInfo.typeElementProperty.id,
                            "developerName": pageComponentInfo.typeElementProperty.developerName,
                            "contentType": pageComponentInfo.typeElementProperty.contentType,
                            "contentValue": request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses[i].contentValue,
                            "objectData": request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses[i].objectData
                        });

                    } else {

                        // The component is bound to a whole object
                        objectDataValue = request.mapElementInvokeRequest.pageRequest.pageComponentInputResponses[i].objectData;

                    }

                    currentValues[pageComponentInfo.valueElement.id] = objectDataValue;

                }

            }

            // Add the request data to the types table so we have it
            for (var property in currentValues) {
                if (currentValues.hasOwnProperty(property)) {
                    addToTypesTable(currentValues[property].typeElementId, currentValues[property]);
                }
            }

        }

    }

})(manywho);