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

    var tableInput = React.createClass({

        onChange: function(e) {

            this.setState({ value: e.currentTarget.value })

        },

        onKeyUp: function(e) {

            if (e.keyCode == 13 && !this.props.isDesignTime) {

                e.preventDefault();
                e.stopPropagation();

                this.props.onCommitted(this.props.id, this.props.propertyId, this.state.value);

            }

        },

        onFocus: function() {

            this.setState({ isFocused: true });

        },

        onBlur: function() {

            this.setState({ isFocused: false });

            if (!this.props.isDesignTime)
                this.props.onCommitted(this.props.id, this.props.propertyId, this.state.value);

        },

        componentWillMount: function() {

            this.setState({ value: this.props.value });
            
        },

        render: function () {

            manywho.log.info('Rendering Table Input: ' + this.props.id);

            var classNames = ['form-control', 'input-sm'];
            if (!this.state.isFocused) {

                classNames.push('table-input-display');

            }

            return React.DOM.input({ className: classNames.join(' '), onChange: this.onChange, onKeyUp: this.onKeyUp, value: this.state.value, onFocus: this.onFocus, onBlur: this.onBlur });

        }

    });

    manywho.component.register("table-input", tableInput);

}(manywho));
