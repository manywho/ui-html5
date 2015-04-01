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

    var horizontal = React.createClass({

        mixins: [manywho.component.mixins.collapse],

        render: function () {

            log.info('Rendering Horizontal: ' + this.props.id);

            var model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "horizontal_flow", this.props.flowKey).join(' ');
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            var contentClass = this.state.isVisible ? '' : ' hidden';
            var labelClasses = this.getContainerHeaderClasses();
            var labelContent = manywho.settings.global('collapsable', this.props.flowKey) && model.label ? [model.label, React.DOM.i({ className: this.state.icon })] : model.label;

            return React.DOM.div({ className: classes, id: this.props.id }, [
                React.DOM.h3({ className: labelClasses, onClick: this.toggleVisibility }, labelContent),
                React.DOM.div({ className: contentClass, id: this.props.id }, [
                    React.DOM.div({ className: 'row' }, manywho.component.getChildComponents(children, this.props.id, this.props.flowKey))
                ])
            ]);

        }

    });

    manywho.component.register("horizontal_flow", horizontal);

    manywho.styling.registerContainer("horizontal_flow", function (item, container) {

        var columnSpan = Math.floor(12 / Math.max(1, container.childCount));
        return ['col-sm-' + columnSpan];

    });

}(manywho));