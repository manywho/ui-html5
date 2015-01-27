manywho.collaboration = (function (manywho) {

    var socket = new BCSocket(null, { reconnect: false });
    var shareJs = new window.sharejs.Connection(socket);    
    var doc = null;

    return {

        isEnabled: false,

        initialize: function (stateId, state) {

            if (this.isEnabled) {

                doc = shareJs.get('states', stateId);
                doc.subscribe(function (error) {

                    if (!doc.snapshot) {
                        doc.create('json0', state);
                    }
                    else {
                        manywho.state.refresh(doc.getSnapshot());
                    }

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