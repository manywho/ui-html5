manywho.directive('mwMain', ['$compile', 'engine', 'model', 'directiveHelpers', function ($compile, engine, model, directiveHelpers) {
    return {
        restrict: 'E',
        scope: true,
        controller: ['$scope', function($scope) {

        }],
        link: function (scope, element, attrs) {

            var mainElement = angular.element('<div></div>');
            mainElement
                .addClass('container')
                .append(directiveHelpers.getChildDirectives('root'))
                .append(directiveHelpers.getOutcomeDirectives(null));

            element.replaceWith($compile(mainElement)(scope));

        }
    }
}]);