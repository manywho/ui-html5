manywho.directive('mwInput', ['$compile', 'view', 'viewBuilder', function ($compile, viewData, viewBuilder) {
    
    return {
        restrict: 'E',
        scope: {
            id: '@id',
            parent: '@parent',
            value: '@value'
        },
        link: function (scope, element, attrs) {

			var component = viewData.getComponent(scope.id);
						
			// Check to see if the component has a label
			var hasLabel = false;

            if (component.label != null &&
                component.label.trim().length > 0) {
                hasLabel = true;
			}
			
			// Convert to the HTML5 input types
			var inputType = 'text';
			
			if (component.contentType.toLowerCase() == 'contentnumber') {
				inputType = 'number';
			} else if (component.contentType.toLowerCase() == 'contentdatetime') {
				inputType = 'date';
			}

			// Create the actual html for the input			
            var html = '';
            
            if (hasLabel) {
                html += '<label for="{{id}}">' + component.label;
        	}
            
            html += '<input ';
            html += 'ng-model="value" ';
            html += 'ng-change="change()" ';
            html += 'id="{{id}}" ';
            html += 'type="' + inputType + '" ';
            html += 'placeholder="' + component.hintValue + '" ';
            html += 'value="{{value}}" ';
            html += '/>';

            if (hasLabel) {
                html += '</label>';
			}
						
            var compiledElement = $compile(html)(scope);
            element.append(compiledElement);

			// If the user changes anything in this input, we update the component input response requests
            scope.change = function() {
                viewData.setComponentInputResponseRequest(scope.id, scope.value, null);
            }
            
        }
    }

}]);