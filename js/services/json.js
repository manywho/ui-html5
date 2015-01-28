manywho.json = (function (manywho) {

    return {

        generateInitializationData: function(flowId, annotations, inputs, mode) {

            return {
                'flowId': {
                    'id': flowId.id,
                    'versionId': flowId.versionId
                },
                'annotations': annotations || null,
                'inputs': inputs || null,
                'mode': mode || null
            }
        },

        generateInvokeData: function(stateData, invokeType, selectedOutcomeId, pageComponentInputResponses, annotations, geolocation, mode) {

            return {
                'stateId': stateData.stateId,
                'stateToken': stateData.stateToken,
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