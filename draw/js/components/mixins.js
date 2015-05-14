/*!
 Copyright 2015 ManyWho, Inc.
 Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
 file except in compliance with the License.
 You may obtain a copy of the License at: http://manywho.com/sharedsource
 Unless required by applicable law or agreed to in writing, software distributed under
 the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied. See the License for the specific language governing
 permissions and limitations under the License.
 */

(function (manywho) {

    function validateComponent (element, item, attribute) {

        if (element.required && (item.attributes[attribute] == null || item.attributes[attribute].length == 0)) {

            element.parentNode.classList.add('has-error');

        } else {

            element.parentNode.classList.remove('has-error');

        }

        return !(element.required && (item.attributes[attribute] == null || item.attributes[attribute].length == 0))

    }

    manywho.layout.mixins.component = {

        validate: function (item) {

            var validation = [];

            if (item.content) {

                var contentElement = document.getElementById('content');

                validation.push(validateComponent(contentElement, item, 'content'));

            }

            if (item.name) {

                var nameElement = document.getElementById('name');

                validation.push(validateComponent(nameElement, item, 'name'));

            }

            if (item.name) item.attributes['name'] = item.name;

            for (var attribute in item.attributes) {

                var element = document.getElementById(attribute);

                validation.push(validateComponent(element, item, attribute));

            }

            return validation.indexOf(false) == -1;

        },

        onSave: function (event) {

            event.preventDefault();

            if (this.validate(this.props.item)) {

                this.props.onSave(event);

                return true;

            }

            return false;

        },

        onChange: function (event) {

            if (event.target.id == 'content' || event.target.id == 'name') {

                this.props.item[event.target.id] = event.target.value;

            } else {

                if (event.target.type == 'checkbox') {

                    this.props.item.attributes[event.target.id] = event.target.checked;

                } else {

                    this.props.item.attributes[event.target.id] = event.target.value;

                }

            }

            this.props.item.saved = false;

        }

    };

}(manywho));
