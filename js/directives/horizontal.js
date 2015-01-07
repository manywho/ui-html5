manywho.directive('mwHorizontal', ['$compile', 'engine', 'model', 'viewBuilder', function ($compile, engine, model, viewBuilder) {

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
                .addClass(viewBuilder.getClasses(scope.parent))
                .append(viewBuilder.getChildDirectives(scope.id));

            element.replaceWith($compile(horizontalElement)(scope));

        }
    }

}]);