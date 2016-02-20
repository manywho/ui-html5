manywho.requests = (function (manywho) {

    return {

        getAll: function () {

            return this.cachedRequests;

        },

        apply: function (identifier, mapElementId, requestObject) {

            var cachedRequest = this.cachedRequests[identifier];

            // If we don't have a cached request for this identifier, create one now
            if (cachedRequest == null) {

                cachedRequest = {};

            }

            // Assign the request object for this map element
            cachedRequest[mapElementId] = requestObject;

            // Set the cached request entry back into the cache
            this.cachedRequests[identifier] = cachedRequest;

        },

        cachedRequests: {}

    }

})(manywho);