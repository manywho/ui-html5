manywho.directive('mwNavigation', ['$compile', 'engine', 'model', 'directiveHelpers', function ($compile, engine, model, directiveHelpers) {

    function getHeaderElement(navigation) {

        var headerHtml = '<div class="navbar-header">';
        headerHtml += '<button type="button" class="navbar-toggle" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed">';
        headerHtml += '<span class="sr-only">Toggle navigation</span>';
        headerHtml += '<span class="icon-bar"></span>';
        headerHtml += '<span class="icon-bar"></span>';
        headerHtml += '<span class="icon-bar"></span>';
        headerHtml += '</button>';
        headerHtml += '</div>';

        var headerElement = angular.element(headerHtml);

        if (navigation.label != null && navigation.label.trim().length > 0) {
            headerElement.append('<a class="navbar-brand" href="#">' + navigation.label + '</a>');
        }

        return headerElement;

    }

    function getListElements(items) {

        var elements = [];

        for (itemId in items)
        {
            item = items[itemId];

            var listItemElement = angular.element('<li></li>');
            var listItemAnchorElement = angular.element('<a href="#" id="' + item.id + '">' + item.label + '</a>');
            listItemElement.append(listItemAnchorElement);

            if (item.items != null) {

                listItemElement
                    .addClass('dropdown')
                    .attr('dropdown', '');

                listItemAnchorElement
                    .addClass('dropdown-toggle')
                    .attr('dropdown-toggle', '')
                    .attr('aria-haspopup', 'true')
                    .attr('aria-expanded', 'false')
                    .append('<span class="caret"></span>');

                var childListItemElement = angular.element('<ul class="dropdown-menu" role="menu"></ul>');
                getListElements(item.items).forEach(function (childItem) {
                    childListItemElement.append(childItem);
                });

                listItemElement.append(childListItemElement);
            }

            elements.push(listItemElement);
        }

        return elements;
    }

    return {
        restrict: 'E',
        scope: {
            id: '@id'
        },
        link: function (scope, element, attrs) {

            var navigation = model.getNavigation(scope.id);

            var navigationItemsElement = angular.element('<div class="collapse navbar-collapse" ng-class="!navCollapsed && \' in \'"><ul class="nav navbar-nav"></ul></div>');

            getListElements(navigation.items).forEach(function (item) {
                navigationItemsElement.children().append(item);
            });           

            var navigationContainer = angular.element('<div class="container-fluid"></div>');
            navigationContainer
                .append(getHeaderElement(navigation))
                .append(navigationItemsElement);

            var navigationElement = angular.element('<nav class="navbar navbar-default"></nav>');
            navigationElement
                .attr('id', '{{id}}')
                .append(navigationContainer);

            element.replaceWith($compile(navigationElement)(scope));

        }
    }

}]);