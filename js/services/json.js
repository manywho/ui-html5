/*!
Copyright 2015 ManyWho, Inc.
Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
file except in compliance with the License.
You may obtain a copy of the License at: http://manywho.com/sharedsource
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/

manywho.json = (function (manywho) {

    return {

        generateFlowInputs: function (inputsData, objectData, typeElementDeveloperName) {

            var inputs = [];

            for (var property in inputsData) {
                inputs.push({
                    'contentType': 'Content' + (typeof inputsData[property]).charAt(0).toUpperCase() + (typeof inputsData[property]).substring(1).toLowerCase(),
                    'contentValue': inputsData[property],
                    'developerName': property,
                    'objectData': objectData || null,
                    'typeElementDeveloperName': typeElementDeveloperName || null
                });
            }

            return inputs;

        },

        generateInitializationRequest: function(flowId, stateId, annotations, inputs, playerUrl, joinUrl, mode, reportingMode) {

            return {
                'flowId': {
                    'id': flowId.id,
                    'versionId': flowId.versionid || flowId.versionId || null
                },
                'stateId': stateId || null,
                'annotations': annotations || null,
                'inputs': inputs || null,
                'playerUrl': playerUrl || null,
                'joinPlayerUrl': joinUrl || null,
                'mode': mode || '',
                'reportingMode': reportingMode || ''
            }
        },

        generateInvokeRequest: function(stateData, invokeType, selectedOutcomeId, pageComponentInputResponses, navigationElementId, annotations, location, mode) {

            return {
                'stateId': stateData.id,
                'stateToken': stateData.token,
                'currentMapElementId': stateData.currentMapElementId,
                'invokeType': invokeType,
                'annotations': annotations || null,
                'geoLocation': location || null,
                'mapElementInvokeRequest': {
                    'pageRequest': {
                        'pageComponentInputResponses': pageComponentInputResponses || null
                    },
                    'selectedOutcomeId': selectedOutcomeId || null
                },
                'mode': mode || null,
                'navigationElementId': navigationElementId || null
            }
        },

        generateNavigateRequest: function (stateData, navigationId, navigationElementId, annotations, location) {

            return {
                'stateId': stateData.id,
                'stateToken': stateData.token,
                'currentMapElementId': stateData.currentMapElementId,
                'invokeType': 'NAVIGATE',
                'navigationElementId': navigationId,
                'selectedNavigationItemId': navigationElementId,
                'annotations': annotations || null,
                'geoLocation': location || null,
                'mapElementInvokeRequest': {
                    'pageRequest': null,
                    'selectedOutcomeId': null
                }
            }

        },

        generateSessionRequest: function (sessionId, sessionUrl, loginUrl, username, password, token) {

            return {
                'sessionToken': sessionId,
                'sessionUrl': sessionUrl,
                'loginUrl': loginUrl,
                'username': username || null,
                'password': password || null,
                'token': token || null
            }

        }

    }

})(manywho);