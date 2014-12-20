manywho.directive('mwMain', ['$compile', 'engine', 'model', 'viewBuilder', function ($compile, engine, model, viewBuilder) {
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