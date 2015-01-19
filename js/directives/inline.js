manywho.directive('mwInline', ['$compile', 'engine', 'model', 'directiveHelpers', 'styling', function ($compile, engine, model, directiveHelpers, styling) {

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
                .addClass(styling.getClasses(scope.parent, scope.id, 'inline_flow'))
                .append(directiveHelpers.getChildDirectives(scope.id));

            element.replaceWith($compile(inlineElement)(scope));

        }
    }

}]);