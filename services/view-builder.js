manywho.service('viewBuilder', ['view', function (view) {

    var directives = {};

    function getDirectiveType(item) {

        if ('containerType' in item) {
            return item.containerType;
        }
        else if ('componentType' in item) {
            return item.componentType;
        }
        return null;

    }

    return {

        registerDirective: function (name, directive) {

            directives[name] = directive;

        },

        getChildDirectives: function (id) {

            var childDirectives = [];
            var children = view.getChildren(id);

            children.forEach(function (item) {

                var directive = angular.element(directives[getDirectiveType(item)]);
                directive.attr('id', item.id);
                directive.attr('parent', id);

                childDirectives.push(directive[0].outerHTML);

            }, this);

            return childDirectives.join("\n");

        },
        
        getOutcomeDirectives: function (id) {

			var outcomeDirectives = [];
            var outcomes = view.getOutcomes(id);

            outcomes.forEach(function (item) {

                var directive = angular.element(directives['OUTCOME']);
                directive.attr('id', item.id);
                directive.attr('parent', id);

                outcomeDirectives.push(directive[0].outerHTML);

            }, this);

            return outcomeDirectives.join("\n");

        }

    }

}]);