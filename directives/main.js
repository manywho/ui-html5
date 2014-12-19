manywho.directive('mwMain', ['$compile', 'view', 'viewBuilder', function ($compile, viewData, viewBuilder) {
    return {
        restrict: 'E',
        scope: true,
        controller: ['$scope', function($scope) {

        }],
        link: function (scope, element, attrs) {

            var html = viewBuilder.getChildDirectives('root');
            var compiledElement = $compile(html)(scope);
            element.append(compiledElement);

        }
    }
}]);