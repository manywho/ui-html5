manywho.directive('mwTextarea', ['$compile', 'engine', 'model', 'viewBuilder', function ($compile, engine, model, viewBuilder) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var html = '<textarea id="{{id}}" />';

            var compiledElement = $compile(html)(scope);
            element.append(compiledElement);

        }
    }

}]);