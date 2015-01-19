manywho.directive('mwPresentation', ['$compile', 'engine', 'model', 'directiveHelpers', function ($compile, engine, model, directiveHelpers) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var html = model.getComponent(scope.id).content
                .replace(/&quot;/g, '\"')
                .replace(/&#39;/g, '\'')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');

            var compiledElement = $compile(html)(scope);
            element.replaceWith(compiledElement);

        }
    }

}]);