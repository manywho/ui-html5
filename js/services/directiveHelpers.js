manywho.service('directiveHelpers', ['model', function (model) {

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

    function getDirectiveHtml(directiveType, id, parentId) {

        var directive = angular.element(directives[directiveType]);

        if (id) {
            directive.attr('id', id);
        }

        if (parentId) {
            directive.attr('parent', parentId);
        }

        return directive[0].outerHTML;

    }

    return {

        registerDirective: function (name, directive) {

            directives[name] = directive;

        },

        getChildDirectives: function (id) {

            var childDirectives = [];
            var children = model.getChildren(id);

            children.forEach(function (item) {
                childDirectives.push(getDirectiveHtml(getDirectiveType(item), item.id, id));
            }, this);

            return childDirectives.join("\n");

        },

        getOutcomeDirectives: function (id) {

            var outcomeDirectives = [];
            var outcomes = model.getOutcomes(id);

            outcomes.forEach(function (item) {
                outcomeDirectives.push(getDirectiveHtml('OUTCOME', item.id, id));
            }, this);

            return outcomeDirectives.join("\n");

        }

    }

}]);