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

    var list = React.createClass({

        render: function () {

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, 'list', this.props.flowKey);
            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey) || {};
            var outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
            var columnTypeElementPropertyId = manywho.component.getDisplayColumns(model.columns)[0].typeElementPropertyId;

            if (model.isVisible == false) {

                classes.push('hidden');

            }

            if (model.objectData) {

                var elements = model.objectData.map(function (element) {

                    var label = element.properties.filter(function (value) { return manywho.utils.isEqual(value.typeElementPropertyId, columnTypeElementPropertyId, true) })[0].contentValue;
                    return React.DOM.li({ id: element.externalId }, label);

                });

            }

            var list = React.DOM.ul(null, elements || null);

            if (model.attributes.ordered && !manywho.utils.isEqual(model.attributes.ordered, 'false', true)) {
                list = React.DOM.ol(null, elements || null);
            }

            var outcomeButtons = outcomes && outcomes.map(function (outcome) {
                return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey });
            }, this);

            return React.DOM.div({ className: classes.join(' ') }, [
                list,
                outcomeButtons,
                React.createElement(manywho.component.getByName('wait'), { isVisible: state.loading, message: state.loading && state.loading.message, isSmall: true }, null)
            ]);

        }

    });

    manywho.component.register("list", list);

}(manywho));
