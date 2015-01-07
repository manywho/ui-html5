manywho.directive('mwMain', ['$compile', 'engine', 'model', 'viewBuilder', function ($compile, engine, model, viewBuilder) {
    return {
        restrict: 'E',
        scope: true,
        controller: ['$scope', function($scope) {

        }],
        link: function (scope, element, attrs) {

            var mainElement = angular.element('<div></div>');
            mainElement
                .addClass('container')
                .append(viewBuilder.getChildDirectives('root'))
                .append(viewBuilder.getOutcomeDirectives(null));

            element.replaceWith($compile(mainElement)(scope));

        }
    }
}]);