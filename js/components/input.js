(function (manywho) {

    var input = React.createClass({

        render: function () {

            log.info('Rendering Input: ' + this.props.id);

            var model = manywho.model.getComponent(this.props.id);

            var labelElement = React.createElement('label', { 'for': this.props.id }, model.label);
            var inputElement = React.createElement('input', { type: 'text', placeholder: model.placeholder, className: 'form-control' }, null);
            var formElement = React.createElement('div', { className: 'form-group' }, [labelElement, inputElement]);

            return formElement

        }

    });

    manywho.component.register("input", input);

}(manywho));