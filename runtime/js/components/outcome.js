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

    function getIconType(action) {

        if (!manywho.utils.isNullOrWhitespace(action)) {

            switch (action.toLowerCase()) {
                case 'save':
                    return 'glyphicon-floppy-disk';
                case 'new':
                    return 'glyphicon-new-window';
                case 'apply':
                    return 'glyphicon-ok';
                case 'submit':
                    return 'glyphicon-circle-arrow-down';
                case 'insert':
                    return 'glyphicon-log-in';
                case 'add':
                    return 'glyphicon-plus';
                case 'import':
                    return 'glyphicon-import';
                case 'update':
                    return 'glyphicon-edit';
                case 'upsert':
                    return 'glyphicon-chevron-up';
                case 'edit':
                    return 'glyphicon-pencil';
                case 'escalate':
                    return 'glyphicon-hand-up';
                case 'query':
                    return 'glyphicon-console';
                case 'delete':
                    return 'glyphicon-trash';
                case 'cancel':
                    return 'glyphicon-arrow-left';
                case 'reject':
                    return 'glyphicon-thumbs-down';
                case 'remove':
                    return 'glyphicon-remove';
                default:
                    return 'glyphicon-plus';
            }

        }

        return null;

    }

    function getButtonSize(bindingId, flowKey) {

        if (!manywho.utils.isNullOrWhitespace(bindingId)) {

            var component = manywho.model.getComponent(bindingId, flowKey);
            if (component) {

                return 'btn-sm'

            }

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

                if (model.isOut) {

                    manywho.engine.flowOut(model, self.props.flowKey);

                } else {

                    manywho.engine.move(model, this.props.flowKey);

                }

            }

        },

        render: function () {

            manywho.log.info('Rendering Outcome: ' + this.props.id);

            var model = manywho.model.getOutcome(this.props.id, this.props.flowKey);

            var classes = [
                'outcome btn',
                getButtonType(model.pageActionType || model.pageActionBindingType),
                getButtonSize(model.pageObjectBindingId, this.props.flowKey)
            ];

            var content;

            if (manywho.utils.isEqual(this.props.outcomeDisplay, 'icons', true)  && model.pageActionType) {

                var icon = 'glyphicon ' + getIconType(model.pageActionType || model.pageActionBindingType);

                classes.push('btn-icons');

                content = React.DOM.span({ className: icon, title: model.pageActionType || model.pageActionBindingType }, null);

            } else {

                content = model.label;

            }

            classes = classes.join(' ');

            return React.DOM.button({ id: this.props.id, className: classes, onClick: this.onClick }, content);

        }

    });

    manywho.component.register('outcome', outcome);

}(manywho));
