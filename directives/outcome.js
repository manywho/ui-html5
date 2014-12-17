manywho.directive('mwOutcome', ['$compile', 'outcome', 'view', 'viewBuilder', function ($compile, outcome, viewData, viewBuilder) {

    return {
        restrict: 'E',
        scope: {
            id: '&data',
            parent: '&parent'
        },
        link: function (scope, element, attrs) {

            var item = null;
            var html = '<button data-ng-click="click()" class="btn btn-primary">' + item.label + '</button>';

            var compiledElement = $compile(html)(scope);
            element.replaceWith(compiledElement);
            
            scope.click = function() {
                outcome.onClick(scope.data);
            }
        }
    }

}]);