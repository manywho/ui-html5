manywho.directive('mwMain', ['$compile', 'view', 'viewBuilder', function ($compile, viewData, viewBuilder) {
    return {
        restrict: 'E',
        scope: true,
        controller: ['$scope', function($scope) {

        }],
        link: function (scope, element, attrs) {

            var html = '';
            html += viewBuilder.getChildDirectives('root');
            html += viewBuilder.getOutcomeDirectives(null);
            var compiledElement = $compile(html)(scope);
            element.append(compiledElement);

        }
    }
}]);