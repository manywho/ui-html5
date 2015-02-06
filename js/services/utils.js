manywho.utils = (function (manywho, $) {
  
    return {

        isNullOrWhitespace: function (value) {

            if (typeof value === 'undefined' || value == null) {

                return true;

            }

            return value.replace(/\s/g, '').length < 1;

        },

        isEqual: function (value1, value2, ignoreCase) {

            if (!value1 && !value2) {

                return true;

            }
            else if (value1 && value2) {

                if (ignoreCase) {

                    return value1.toLowerCase() === value2.toLowerCase();

                }
                else {

                    return value1 === value2;

                }

            }

            return false;

        },
      
        convertToArray: function(obj) {

            var items = null;

            if (obj) {

                items = [];
                for (prop in obj) {

                    items.push(obj[prop]);

                }

            }

            return items;

        }

    }

})(manywho, jQuery);



