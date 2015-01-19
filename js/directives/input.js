manywho.directive('mwInput', ['$compile', 'engine', 'model', 'directiveHelpers', 'styling', function ($compile, engine, model, directiveHelpers, styling) {

    function getInputType(component) {

        switch (component.contentType.toLowerCase()) {
            case 'contentnumber':
                return 'number';
                break;
            case 'contentdatetime':
                return 'date';
                break;
            default:
                return 'text';
        }

    }

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent',
            value: '@value'
        },
        link: function (scope, element, attrs) {

            var component = model.getComponent(scope.id);

            var formElement = angular.element('<div></div>');
            formElement
                .addClass('form-group')
                .addClass(styling.getClasses(scope.parent, scope.id, 'input'));

            if (component.label != null && component.label.trim().length > 0) {
                formElement.append('<label for="{{id}}">' + component.label + '</label>');
            }

            var inputElement = angular.element('<input />');
            inputElement
                .attr('id', '{{id}}')
                .attr('ng-model', 'value')
                .attr('ng-change', 'change()')
                .attr('value', '{{value}}')
                .attr('type', getInputType(component))
                .attr('placeholder', component.hintValue)
                .addClass('form-control');

            formElement.append(inputElement);
            element.replaceWith($compile(formElement)(scope));

            // If the user changes anything in this input, we update the component input response requests
            scope.change = function () {
                model.setComponentInputResponseRequest(scope.id, scope.value, null);
            }

        }
    }

}]);