manywho.directive('mwWait', ['$compile', 'engine', 'model', 'directiveHelpers', function ($compile, engine, model, directiveHelpers) {

    return {
        restrict: 'E',
        scope: {
            message: '@message',
            isVisible: '@visible'
        },
        link: function (scope, element, attrs) {

            scope.isVisible = (scope.isVisible === 'true');

            var waitElement = angular.element('<div></div>');
            waitElement
                .attr('id', 'wait')
                .attr('ng-hide', '{{!isVisible}}')
                .addClass('wait');                

            var waitIndicatorElement = angular.element('<div></div>');
            waitIndicatorElement
                .addClass('wait-inner')
                .append('<span class="glyphicon glyphicon-refresh wait-icon" aria-hidden="true"></span>')
                .append('<p class="wait-message">{{message}}</p>');

            waitElement.append(waitIndicatorElement);

            element.replaceWith($compile(waitElement)(scope));

        }
    }

}]);