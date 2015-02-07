(function (manywho) {

    function renderOption (item) {

        if (item.properties) {

            var label = item.properties.filter(function (value) {

                return manywho.utils.isEqual(value.typeElementPropertyId, this.column, true);

            }, this)[0];

            return React.DOM.option({ value: item.externalId, selected: item.isSelected }, label.contentValue);

        }

        return null;

    }

    var select = React.createClass({

        handleChange: function(e) {

            var model = manywho.model.getComponent(this.props.id);
            var selectedObjectData = manywho.componentUtils.getSelectedOptions(model, e.target.selectedOptions);

            manywho.state.setComponent(this.props.id, null, selectedObjectData, true);
            manywho.componentUtils.handleEvent(this, model);

        },

        render: function () {

            log.info('Rendering Select: ' + this.props.id);

            var options = [];
            var isValid = true;

            var model = manywho.model.getComponent(this.props.id);
            var state = manywho.state.getComponent(this.props.id);

            var objectData = manywho.utils.convertToArray($.extend(model.objectData, state.objectData));
            var columnTypeElementPropertyId = manywho.componentUtils.getDisplayColumns(model.columns)[0].typeElementPropertyId;

            if (objectData) {
                options = objectData.map(renderOption, { column: columnTypeElementPropertyId });
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
                        React.createElement(Chosen, { children: options, onChange: this.handleChange }),
                        React.DOM.span({ className: 'help-block' }, model.message)
            ]);

        }

    });

    manywho.component.register("select", select);

}(manywho));