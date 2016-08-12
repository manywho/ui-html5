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

manywho.authorization = (function (manywho) {

    return {

        setAuthenticationToken: function (authenticationToken, flowKey) {

            manywho.state.setAuthenticationToken(authenticationToken, flowKey);

        },

        isAuthorized: function(response, flowKey) {

            return !(response.authorizationContext != null
                && response.authorizationContext.directoryId != null
                && manywho.utils.isNullOrWhitespace(manywho.state.getAuthenticationToken(flowKey)));

        },

        invokeAuthorization: function (response, flowKey, doneCallback) {

            // Check to see if the user has successfully authenticated
            if (response.authorizationContext != null && response.authorizationContext.directoryId != null) {

                if (manywho.utils.isEqual(response.authorizationContext.authenticationType, 'oauth2', true)) {
                    window.location = response.authorizationContext.loginUrl;

                    return;
                }

                if (manywho.utils.isEqual(response.authorizationContext.authenticationType, 'saml', true)) {
                    window.location = response.authorizationContext.loginUrl;

                    return;
                }

                manywho.state.setLogin({
                    isVisible: true,
                    directoryId: response.authorizationContext.directoryId,
                    directoryName: response.authorizationContext.directoryName,
                    loginUrl: response.authorizationContext.loginUrl,
                    stateId: response.stateId,
                    callback: doneCallback
                }, flowKey);

            }

        },

        authorizeBySession: function (loginUrl, flowKey, doneCallback) {

            var requestData = manywho.json.generateSessionRequest(manywho.state.getSessionData(flowKey).id, manywho.state.getSessionData(flowKey).url, loginUrl);
            var state = manywho.state.getState(flowKey);

            manywho.callbacks.register(flowKey, doneCallback);

            manywho.ajax.sessionAuthentication(manywho.utils.extractTenantId(flowKey), state.id, requestData)
                .then(function (response) {

                    manywho.state.setAuthenticationToken(response, flowKey);
                    manywho.callbacks.execute(flowKey, 'done', null, null, [response]);

                });

        }

    }

})(manywho);
