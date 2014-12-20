manywho.directive('mwOutcome', ['$compile', 'outcomeCallback', 'view', 'viewBuilder', function ($compile, outcomeCallback, viewData, viewBuilder) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var outcome = viewData.getOutcome(scope.id);
            var html = '<button data-ng-click="click()" class="btn btn-primary">' + outcome.label + '</button>';

            var compiledElement = $compile(html)(scope);
            element.append(compiledElement);
            
            scope.click = function() {
                outcomeCallback.onClick(viewData.getOutcome(scope.id));
            }
        }
    }

}]);