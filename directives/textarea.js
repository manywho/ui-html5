manywho.directive('mwTextarea', ['$compile', 'view', 'viewBuilder', function ($compile, viewData, viewBuilder) {

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