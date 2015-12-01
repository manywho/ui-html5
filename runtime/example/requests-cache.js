manywho.requests = (function (manywho) {

    return {

        completedCachedRequests: [],

        cachedRequests: {},

        getCompleted: function () {

            return this.completedCachedRequests;

        },

        getLive: function () {

            return this.cachedRequests;

        },

        apply: function (requestsToCache, mapElementId, requestObject) {

            var cachedRequest = this.cachedRequests[requestsToCache.developerName];

            // If we don't have a cached request for this identifier, create one now
            if (cachedRequest == null) {

                cachedRequest = {};

                // Tag the request with the developer name so we can identify the sequence when next connected
                cachedRequest.developerName = requestsToCache.developerName;

            }

            // Assign the request object for this map element
            cachedRequest['step___' + mapElementId] = requestObject;

            // Assume the sequence is complete
            var isComplete = true;

            // Check to see if this request completes the sequence
            for (var i = 0; i < requestsToCache.sequence.length; i++) {

                // Check to see if the property value exists
                if (cachedRequest['step___' + requestsToCache.sequence[i].mapElementId] == null) {

                    // The property doesn't exist so the sequence is not complete
                    isComplete = false;
                    break;

                }

            }

            // If this request sequence is complete, we null it out so we can start a new one as required
            if (isComplete == true) {

                // Put the request into our lists of complete requests
                this.completedCachedRequests.push(cachedRequest);

                // Clear out the live cache to start a new "record"
                cachedRequest = null;

            }

            // Set the cached request entry back into the cache
            this.cachedRequests[requestsToCache.developerName] = cachedRequest;

        }

    }

})(manywho);