manywho.view = (function (manywho) {

    var render = null;
    var renderFirst = null;
    var rendered = false;

    return {

        initialize: function(custom) {

            defaults = {
                render: function() {
                    manywho.view.createPage(manywho.state.engineResponse);
                },
                renderFirst: function() {
                    manywho.view.createPage(manywho.state.engineResponse);
                    //manywho.view.createNavigation(manywho.state.engineResponse);
                    //manywho.view.createSocialStream(manywho.state.engineResponse);
                }
            }

            // Replace this with a call to /js/constants
            var constants = {}

            render = $.extend({}, constants, defaults, custom).render;

        },

        create: function() {

            if (rendered) {
                renderFirst.call(this);
                rendered = true;
            } else {
                render.call(this);
            }

        },

        createPage: function (engineInvokeResponse) {

            // 1. Render the core page ui
            manywho.model.parseEngineResponse(engineInvokeResponse);
            manywho.state.update(manywho.model.getComponents());

            var main = manywho.component.getByName('main');
            React.render(React.createElement(main), document.body);

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