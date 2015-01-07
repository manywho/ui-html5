manywho.service('engine', ['model', function (model) {

    return {

        initialize: function (engineInitializationRequest) {

            alert('Initialize!');

        },

        move: function (outcome) {

            // Validate all of the components on the page here...
            // In the model.js, there are componentInputResponseRequests entries for each component
            // that needs to be validated. If a component does not validate correctly, it should
            // prevent the 'move' and also indicate in the UI which component has failed validation

            alert('Move! ' + outcome.label);

        },

        navigate: function (engineInvokeRequest) {

            alert('Navigate!');

        },

        invoke: function (engineInvokeRequest) {

            alert('Invoke!');

        },

        sync: function (engineInvokeRequest) {

            alert('Sync!');

        }

    }

}]);