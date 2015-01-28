manywho.view = (function (manywho) {

    return {

        buildUI: function(engineInitializationResponse) {

            // 1. Invoke the engine
            manywho.engine.invoke(
                manywho.json.generateInvokeData(engineInitializationResponse, 'FORWARD'),
                function (xhr) {

                },
                function (engineInvokeResponse, status, xhr) {

                },
                function (xhr, status, error) {

                }
            );
        },

        createNavigation: function(engineInitializationResponse) {

            // 2. Create the navigation if we have any
            if (engineInitializationResponse.navigationElementReferences != null &&
                engineInitializationResponse.navigationElementReferences.length > 0) {
                // Get the first navigation from the list and kick off the async
                manywho.engine.createNavigation(
                    engineInitializationResponse.stateId,
                    engineInitializationResponse.stateToken,
                    engineInitializationResponse.navigationElementReferences[0].id,
                    function (xhr) {

                    },
                    function (engineNavigationResponse, status, xhr) {

                    },
                    function (xhr, status, error) {

                    }
                );
            }
        },

        createSocialStream: function(engineInitializationResponse) {

            // 3. Create the feed if we have a stream
            if (engineInitializationResponse.currentStreamId != null &&
                engineInitializationResponse.currentStreamId.trim().length > 0) {
                // TODO: start the collaboration feed here async
            }
        }

    }

})(manywho);