manywho.json = (function (manywho) {

    return {

        generateFlowInputs: function (inputsData, objectData, typeElementDeveloperName) {

            var inputs = [];

            for (var property in data) {
                inputs.push({
                    'contentType': 'Content' + (typeof data[property]).charAt(0).toUpperCase(),
                    'contentValue': data[property],
                    'developerName': property,
                    'objectData': objectData || null,
                    'typeElementDeveloperName': typeElementDeveloperName || null
                });
            }

            return inputs;

        },

        generateInitializationRequest: function(flowId, stateId, annotations, inputs, mode, reportingMode) {

            return {
                'flowId': {
                    'id': flowId.id,
                    'versionId': flowId.versionid
                },
                'stateId': stateId || null,
                'annotations': annotations || null,
                'inputs': inputs || null,
                'mode': mode || null,
                'reportingMode': reportingMode || null
            }
        },

        generateInvokeRequest: function(stateData, invokeType, selectedOutcomeId, pageComponentInputResponses, annotations, geolocation, mode) {

            return {
                'stateId': stateData.id,
                'stateToken': stateData.token,
                'currentMapElementId': stateData.currentMapElementId,
                'invokeType': invokeType,
                'annotations': annotations || null,
                'geoLocation': geolocation || null,
                'mapElementInvokeRequest': {
                    'pageRequest': {
                        'pageComponentInputResponses': pageComponentInputResponses || null
                    },
                    'selectedOutcomeId': selectedOutcomeId || null
                },
                'mode': mode || null
            }
        }

    }

})(manywho);