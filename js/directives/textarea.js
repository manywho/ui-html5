manywho.directive('mwTextarea', ['$compile', 'engine', 'model', 'viewBuilder', function ($compile, engine, model, viewBuilder) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var component = model.getComponent(scope.id);
            var classes = viewBuilder.getClasses(scope.parent);

            var html = '<div class="form-group ' + classes + '">';

            if (component.label && component.label.trim().length > 0) {
                html += '<label for="{{id}}">' + component.label + '</label>';
            }
            
            html += '<textarea id="{{id}}" class="form-control"/>';
            html += '</div>';

            var compiledElement = $compile(html)(scope);
            element.replaceWith(compiledElement);

        }
    }

}]);