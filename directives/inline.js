manywho.directive('mwInline', ['$compile', 'view', 'viewBuilder', function ($compile, viewData, viewBuilder) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var html = '<div id="{{id}}">';
            html += viewBuilder.getChildDirectives(scope.id);
            html += '</div>';

            var compiledElement = $compile(html)(scope);
            element.append(compiledElement);
        }
    }

}]);