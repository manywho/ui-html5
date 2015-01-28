manywho.collaboration = (function (manywho) {

    var socket, shareJs, doc;

    function diff(source, target) {

        var diff = {}

        for (prop in source) {

            if (!target.hasOwnProperty(prop)) {

                diff[prop] = source[prop];

            }

        }

        return diff;

    }

    function onStateChanged(error) {
                
        manywho.state.refresh(doc.getSnapshot());        

    }

    return {

        isEnabled: false,

        initialize: function (stateId) {

            if (this.isEnabled && !socket && !shareJs && !doc) {

                socket = new BCSocket(null, { reconnect: false });
                shareJs = new window.sharejs.Connection(socket);

                doc = shareJs.get('states', stateId);
                doc.whenReady(function () {

                    if (!doc.getSnapshot()) {
                        doc.create('json0');
                    }

                });

                doc.subscribe(onStateChanged);

            }

        },

        sync: function(state) {

            if (this.isEnabled) {

                doc.whenReady(function () {

                    var context = doc.createContext();
                    var snapshot = doc.getSnapshot();

                    var clientDiff = diff(state, snapshot);
                    
                    // Insert each component state that exists on the client but not on the remote
                    for (id in clientDiff) {
                        context.submitOp([{ p: [id], oi: clientDiff[id] }]);
                    }

                    for (id in snapshot) {
                        state[id] = snapshot[id];
                    }

                    manywho.state.refresh(state);

                });

            }

        },

        update: function(componentId, oldValue, newValue) {
            
            if (this.isEnabled) {

                var operation = {
                    p: [componentId],
                    od: oldValue,
                    oi: newValue
                }

                doc.whenReady(function () {
                    var context = doc.createContext();
                    context.submitOp([operation]);
                    context.destroy();
                });

            }

        }

    }

})(manywho);