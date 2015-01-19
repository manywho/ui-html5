manywho.directive('mwVertical', ['$compile', 'engine', 'model', 'directiveHelpers', 'styling', function ($compile, engine, model, directiveHelpers, styling) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var verticalElement = angular.element('<div></div>');
            verticalElement
                .attr('id', '{{id}}')
                .addClass(styling.getClasses(scope.parent, scope.id, 'vertical_flow'))
                .append(directiveHelpers.getChildDirectives(scope.id));

            element.replaceWith($compile(verticalElement)(scope));

        }
    }

}]);