manywho.directive('mwPresentation', ['$compile', 'view', 'viewBuilder', function ($compile, viewData, viewBuilder) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var html = viewData.getComponent(scope.id).content;

            var compiledElement = $compile(html)(scope);
            element.append(compiledElement);

        }
    }

}]);