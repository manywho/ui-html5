manywho.directive('mwMain', ['$compile', 'engine', 'model', 'viewBuilder', function ($compile, engine, model, viewBuilder) {
    return {
        restrict: 'E',
        scope: true,
        controller: ['$scope', function($scope) {

        }],
        link: function (scope, element, attrs) {

            var html = '<div class="container">';
            html += viewBuilder.getChildDirectives('root');
            html += viewBuilder.getOutcomeDirectives(null);
            html += '</div>';

            var compiledElement = $compile(html)(scope);
            element.replaceWith(compiledElement);

        }
    }
}]);