manywho.directive('mwTextarea', ['$compile', 'engine', 'model', 'directiveHelpers', 'styling', function ($compile, engine, model, directiveHelpers, styling) {

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
                .addClass(styling.getClasses(scope.parent, scope.id, 'textarea'));
                
            if (component.label && component.label.trim().length > 0) {
                textAreaElement.append('<label for="{{id}}">' + component.label + '</label>');
            }

            textAreaElement.append('<textarea id="{{id}}" class="form-control"/>');
            element.replaceWith($compile(textAreaElement)(scope));

        }
    }

}]);