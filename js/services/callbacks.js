manywho.callbacks = (function (manywho) {

    var callbacks = {}

    return {

        register: function (flowKey, options) {

            callbacks[flowKey] = callbacks[flowKey] || [];
            callbacks[flowKey].push(options);

        },

        execute: function (flowKey, type, name, args) {

            if (callbacks[flowKey]) {

                callbacks[flowKey].filter(function (item) {

                    if (type && !manywho.utils.isEqual(item.type, type, true)) {

                        return false;

                    }
                    
                    if (name && !manywho.utils.isEqual(item.name, name, true)) {

                        return false;

                    }

                    return true;

                })
                .forEach(function (item) {
                    debugger;
                    item.execute.apply(item.context, [item].concat(item.args || args));

                })

            }

        }

    }

})(manywho);