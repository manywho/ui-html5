manywho.directive('mwInline', ['$compile', 'engine', 'model', 'viewBuilder', function ($compile, engine, model, viewBuilder) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var classes = viewBuilder.getClasses(scope.parent);

            var html = '<div id="{{id}}" class="' + classes + '">';
            html += viewBuilder.getChildDirectives(scope.id);
            html += '</div>';

            var compiledElement = $compile(html)(scope);
            element.replaceWith(compiledElement);
        }
    }

}]);