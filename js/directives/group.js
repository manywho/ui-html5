manywho.directive('mwGroup', ['$compile', 'engine', 'model', 'directiveHelpers', function ($compile, engine, model, directiveHelpers) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var html = '<div id="{{id}}">';
            html += directiveHelpers.getChildDirectives(scope.id);
            html += '</div>';

            var compiledElement = $compile(html)(scope);
            element.append(compiledElement);
        }
    }

}]);