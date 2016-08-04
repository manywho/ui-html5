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

/// <reference path="../../typings/index.d.ts" />

declare var manywho: any;

(function (manywho) {

    function getType(model) {
        if (model.attributes && model.attributes.type)
            return 'btn-' + model.attributes.type;

        const action: string = model.pageActionType || model.pageActionBindingType;

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

    function getIcon(model) {
        if (model.attributes && model.attributes.icon)
            return 'glyphicon-' + model.attributes.icon;

        const action: string = model.pageActionType || model.pageActionBindingType;

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

    var outcome = React.createClass({

        getContent: function (model, display: string) {
            if (display)
                switch (display.toUpperCase()) {
                    case "ICON":
                    case "ICONS":
                        return <span className={'glyphicon ' + getIcon(model)} />
                    case "ICONNOBACKGROUND":
                        return <span className={'glyphicon ' + getIcon(model)} />
                    case 'ICONANDTEXT':
                        return [<span className={'glyphicon ' + getIcon(model)} />, model.label]
                    default:
                        return model.label
                }
            else
                return model.label
        },

        getSize: function(model) {
            if (this.props.size)
                return 'btn-' + this.props.size;

            if (model.attributes && model.attributes.size)
                return 'btn-' + model.attributes.size;

            if (!manywho.utils.isNullOrWhitespace(model.pageObjectBindingId)) {
                var component = manywho.model.getComponent(model.pageObjectBindingId, this.props.flowKey);
                if (component)
                    return 'btn-sm'
            }

            return '';
        },

        onClick: function(e) {
            e.preventDefault();
            e.stopPropagation();

            const model = manywho.model.getOutcome(this.props.id, this.props.flowKey);
            
            if (this.props.onClick)
                this.props.onClick(e, model, this.props.flowKey);
            else
                manywho.engine.move(model, this.props.flowKey).then(() => {
                    if (model.isOut)
                        manywho.engine.flowOut(model, this.props.flowKey);
                });
        },

        shouldComponentUpdate(nextProps: any, nextState) {
            return this.props.id != nextProps.id;
        },

        render: function () {
            manywho.log.info('Rendering Outcome: ' + this.props.id);

            const model = manywho.model.getOutcome(this.props.id, this.props.flowKey);
            let className = `outcome btn ${getType(model)} ${this.getSize(model)}`;
            let content = this.getContent(model, manywho.settings.global('outcomes.display', this.props.flowKey));
            let uri = null;

            if (model.attributes) {
                if (model.attributes.classes)
                    className += ' ' + model.attributes.classes;

                if (model.attributes.display)
                    content = this.getContent(model, model.attributes.display);

                if (manywho.utils.isEqual(model.attributes.display, 'ICONNOBACKGROUND', true)) {
                    className += ' btn-nobackground';
                }

                if (model.attributes.uri)
                    uri = model.attributes.uri;
            }

            // Back compat for existing "outcome" attribute on tables
            if (!manywho.utils.isNullOrWhitespace(this.props.display))
                content = this.getContent(model, this.props.display);

            if (uri)
                return <a id={this.props.id} className={className} title={model.label} href={uri} target="_blank">{content}</a>
            else
                return <button id={this.props.id} className={className} onClick={this.onClick} title={model.label}>{content}</button>
        }

    });

    manywho.component.register('outcome', outcome);

}(manywho));