(function (manywho) {

    function convertToArray(obj) {

        var items = null;

        if (obj) {

            items = [];
            for (prop in obj) {

                items.push(obj[prop]);

            }

        }

        return items;

    }

    var select = React.createClass({

        getInitialState: function() {

            var model = manywho.model.getComponent(this.props.id);

            return {
                data: convertToArray(model.objectData)
            }

        },

        componentDidMount: function() {

            var model = manywho.model.getComponent(this.props.id);

            if (model.objectDataRequest != null) {
            
                manywho.ajax.dispatchObjectDataRequest(model.objectDataRequest)
                    .then(function (response) {
                        // Populate state here
                    });

            }
            
        },

        render: function () {

            log.info('Rendering Select: ' + this.props.id);
            
            var renderOption = function (item) {

                if (item.properties) {

                    var value, label = null;

                    for (prop in item.properties) {

                        if (item.properties[prop].developerName == "Value") {
                            value = item.properties[prop].contentValue;
                        }
                        else {
                            label = item.properties[prop].contentValue;
                        }

                    }

                    return React.DOM.option({ value: value }, label);

                }

                return null;

            }
            
            var model = manywho.model.getComponent(this.props.id);
            var options = [];
            var isValid = true;

            if (this.state.data) {
                options = this.state.data.map(renderOption);
            }

            if (typeof model.isValid !== 'undefined' && model.isValid == false) {
                isValid = false;
            }

            var containerClasseNames = [
                (model.isVisible) ? '' : 'hidden',
                (isValid) ? '' : 'has-error'
            ].join(' ');

            return React.DOM.div({ className: 'form-group ' + containerClasseNames }, [
                        React.DOM.label({ 'for': this.props.id }, model.label),
                        React.createElement(Chosen, { children: options }),
                        React.DOM.span({ className: 'help-block' }, model.message)
            ]);
                    
        }

    });

    manywho.component.register("select", select);

}(manywho));