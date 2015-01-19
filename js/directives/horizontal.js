manywho.directive('mwHorizontal', ['$compile', 'engine', 'model', 'directiveHelpers', 'styling', function ($compile, engine, model, directiveHelpers, styling) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var horizontalElement = angular.element('<div></div>');
            horizontalElement
                .attr('id', '{{id}}')
                .addClass('row')
                .addClass(styling.getClasses(scope.parent, scope.id, 'horizontal_flow'))
                .append(directiveHelpers.getChildDirectives(scope.id));

            element.replaceWith($compile(horizontalElement)(scope));

        }
    }

}]);