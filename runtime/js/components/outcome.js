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

    function getButtonType(action) {

        if (!manywho.utils.isNullOrWhitespace(action)) {

            switch (action.toLowerCase()) {
                case 'save':
                case 'new':
                case 'apply':
                case 'submit':
                case 'insert':
                    return 'btn-primary';
                case 'add':
                case 'import':
                case 'update':
                case 'upsert':
                    return 'btn-success';
                case 'edit':
                case 'escalate':
                case 'import':
                case 'query':
                    return 'btn-info';
                case 'delete':
                case 'cancel':
                case 'reject':
                case 'remove':
                    return 'btn-danger';
                default:
                    return 'btn-default';
            }

        }

        return 'btn-default';

    }

    function getButtonSize(bindingId) {

        if (!manywho.utils.isNullOrWhitespace(bindingId)) {

            return 'btn-sm';

        }

        return '';

    }

    var outcome = React.createClass({

        onClick: function(e) {

            e.preventDefault();
            e.stopPropagation();

            var model = manywho.model.getOutcome(this.props.id, this.props.flowKey);
            var self = this;

            if (this.props.onClick) {

                this.props.onClick(e, model, this.props.flowKey);

            }
            else {

                manywho.engine.move(model, this.props.flowKey).then(function() {

                    if (model.isOut) {

                        manywho.engine.flowOut(model, self.props.flowKey);

                    }

                });

            }

        },

        render: function () {

            manywho.log.info('Rendering Outcome: ' + this.props.id);

            var model = manywho.model.getOutcome(this.props.id, this.props.flowKey);

            var classes = [
                'outcome btn',
                getButtonType(model.pageActionType || model.pageActionBindingType),
                getButtonSize(model.pageObjectBindingId)
            ].join(' ');

            return React.DOM.button({ id: this.props.id, className: classes, onClick: this.onClick }, model.label);

        }

    });

    manywho.component.register('outcome', outcome);

}(manywho));
