manywho.directive('mwOutcome', ['$compile', 'engine', 'model', 'viewBuilder', function ($compile, engine, model, viewBuilder) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var outcome = model.getOutcome(scope.id);
            var html = '<button data-ng-click="click()" class="btn btn-primary">' + outcome.label + '</button>';

            var compiledElement = $compile(html)(scope);
            element.replaceWith(compiledElement);
            
            scope.click = function() {
                engine.move(model.getOutcome(scope.id));
            }
        }
    }

}]);