manywho.directive('mwInput', ['$compile', 'engine', 'model', 'viewBuilder', function ($compile, engine, model, viewBuilder) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent',
            value: '@value'
        },
        link: function (scope, element, attrs) {

            var component = model.getComponent(scope.id);

            // Check to see if the component has a label
            var hasLabel = false;

            if (component.label != null &&
                component.label.trim().length > 0) {
                hasLabel = true;
            }

            // Convert to the HTML5 input types
            var inputType = 'text';

            if (component.contentType.toLowerCase() == 'contentnumber') {
                inputType = 'number';
            } else if (component.contentType.toLowerCase() == 'contentdatetime') {
                inputType = 'date';
            }

            var classes = viewBuilder.getClasses(scope.parent);

            // Create the actual html for the input			
            var html = '<div class="form-group ' + classes + '">';

            if (hasLabel) {
                html += '<label for="{{id}}">' + component.label + '</label>';
            }

            html += '<input id="{{id}}" ng-model="value" ng-change="change()" value="{{value}}" class="form-control" ';
            html += 'type="' + inputType + '" ';
            html += 'placeholder="' + component.hintValue + '" ';
            html += '/>';

            html += '</div>';

            var compiledElement = $compile(html)(scope);
            element.replaceWith(compiledElement);

            // If the user changes anything in this input, we update the component input response requests
            scope.change = function () {
                model.setComponentInputResponseRequest(scope.id, scope.value, null);
            }

        }
    }

}]);