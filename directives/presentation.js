manywho.directive('mwPresentation', ['$compile', 'view', 'viewBuilder', function ($compile, viewData, viewBuilder) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var html = viewData.getComponent(scope.id).content
                .replace(/&quot;/g, '\"')
                .replace(/&#39;/g, '\'')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');

            var compiledElement = $compile(html)(scope);
            element.append(compiledElement);

        }
    }

}]);