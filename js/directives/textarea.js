manywho.directive('mwTextarea', ['$compile', 'engine', 'model', 'viewBuilder', function ($compile, engine, model, viewBuilder) {

    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent'
        },
        link: function (scope, element, attrs) {

            var component = model.getComponent(scope.id);

            var textAreaElement = angular.element('<div></div>');
            textAreaElement
                .addClass('form-group')
                .addClass(viewBuilder.getClasses(scope.parent));
                
            if (component.label && component.label.trim().length > 0) {
                textAreaElement.append('<label for="{{id}}">' + component.label + '</label>');
            }

            textAreaElement.append('<textarea id="{{id}}" class="form-control"/>');
            element.replaceWith($compile(textAreaElement)(scope));

        }
    }

}]);