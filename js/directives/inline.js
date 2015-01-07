manywho.directive('mwInline', ['$compile', 'engine', 'model', 'viewBuilder', function ($compile, engine, model, viewBuilder) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var inlineElement = angular.element('<div></div>');
            inlineElement
                .attr('id', '{{id}}')
                .addClass(viewBuilder.getClasses(scope.parent))
                .append(viewBuilder.getChildDirectives(scope.id));

            element.replaceWith($compile(inlineElement)(scope));

        }
    }

}]);