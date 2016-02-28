/*!
 Copyright 2016 ManyWho, Inc.
 Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
 file except in compliance with the License.
 You may obtain a copy of the License at: http://manywho.com/sharedsource
 Unless required by applicable law or agreed to in writing, software distributed under
 the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied. See the License for the specific language governing
 permissions and limitations under the License.
 */

manywho.connection = (function (manywho) {

    function logError(error) {

        manywho.log.error(error);

    }

    function beforeSend(xhr, tenantId, authenticationToken, event, request) {

        xhr.setRequestHeader('ManyWhoTenant', tenantId);

        if (authenticationToken) {
            xhr.setRequestHeader('Authorization', authenticationToken);
        }

        if (manywho.settings.event(event + '.beforeSend')) {
            manywho.settings.event(event + '.beforeSend').call(this, xhr, request);
        }

    }

    function getOfflineDeferred(resolveContext, event, urlPart, request) {

        manywho.offline.setRequest(event, urlPart, request);

        var deferred = new jQuery.Deferred();
        var resolveArguments = manywho.offline.getResponse(event, urlPart, request);

        if (resolveArguments == null) {
            manywho.log.error('A response could not be found for request.');
        }

        // Set a timeout to resolve of 100 milliseconds to give the UI time to render
        setTimeout(function () {

                // Once the timer is done, we resolve
                deferred.resolveWith(
                    resolveContext,
                    [resolveArguments]
                );

            },
            100
        );

        // Send the deferred object back ready to be resolved
        return deferred
            .done(manywho.settings.event(event + '.done'))
            .fail(logError)
            .fail(manywho.settings.event(event + '.fail'));

    }

    function getOnlineDeferred(event, urlPart, methodType, tenantId, stateId, authenticationToken, request) {

        var json = null;

        if (request != null) {
            json = JSON.stringify(request);
        }

        return $.ajax({
                url: manywho.settings.global('platform.uri') + urlPart,
                type: methodType,
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                data: json,
                beforeSend: function (xhr) {

                    manywho.offline.setRequest(event, urlPart, request);

                    beforeSend.call(this, xhr, tenantId, authenticationToken, event, request);

                    if (manywho.utils.isNullOrWhitespace(stateId) == false) {
                        xhr.setRequestHeader('ManyWhoState', stateId);
                    }

                }
            })
            .done(function (response) {

                manywho.offline.setResponse(event, urlPart, request, response);

            })
            .done(manywho.settings.event(event + '.done'))
            .fail(logError)
            .fail(manywho.settings.event(event + '.fail'));

    }

    return {

        isOnline: function() {

            return navigator.onLine;

        },

        onError: function(xhr, status, error) {

            logError(error);

        },

        getDeferred: function(resolveContext, event, urlPart, methodType, tenantId, stateId, authenticationToken, requestObject) {

            // Check to see if the engine is running offline
            if (manywho.settings.global('offline') &&
                this.isOnline() == false) {

                // Send back the offline deferred as we don't have a connection
                return getOfflineDeferred(resolveContext, event, urlPart, requestObject);

            } else {

                // Send back the online deferred as we do have a connection
                return getOnlineDeferred(event, urlPart, methodType, tenantId, stateId, authenticationToken, requestObject);

            }

        }

    }

})(manywho);
