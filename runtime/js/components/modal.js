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

    var modal = React.createClass({

        mixins: [manywho.component.mixins.enterKeyHandler],

        componentDidMount: function () {

            manywho.component.focusInput(manywho.model.getParentForModal(this.props.flowKey));

        },

        renderModal: function() {

            var children = manywho.model.getChildren('root', this.props.flowKey);
            var outcomes = manywho.model.getOutcomes('root', this.props.flowKey);
            var drawKey = manywho.model.getParentForModal(this.props.flowKey);
            var state = manywho.state.getComponent('modal', this.props.flowKey) || {};

            return React.DOM.div({ className: 'modal show' }, [
                React.DOM.div({ className: 'modal-dialog', onKeyUp: this.onEnter }, [
                    React.DOM.div({ className: 'modal-content' }, [
                        React.DOM.div({ className: 'modal-header' }, [
                            React.DOM.h4({ className: 'modal-title' }, manywho.model.getLabel(this.props.flowKey))
                        ]),
                        React.DOM.div({ className: 'modal-body' }, [
                            manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)
                        ]),
                        React.DOM.div({ className: 'modal-footer' }, [
                            manywho.component.getOutcomes(outcomes, this.props.flowKey)
                        ]),
                        React.createElement(manywho.component.getByName('wait'), { isVisible: state.loading, message: state.loading && state.loading.message }, null)
                    ])
                ])
            ]);

        },

        renderBackdrop: function(modal) {

            return React.DOM.div({ className: 'modal-container', id: this.props.flowKey, key: this.props.flowKey}, [
                React.DOM.div({ className: 'modal-backdrop in full-height' }, null),
                modal
            ]);

        },

        render: function () {

            manywho.log.info("Rendering Modal");

            if (this.props.container) {

                this.props.container.classList.remove('hidden');

            }

            return this.renderBackdrop(this.renderModal());

        }

    });

    manywho.component.register("modal", modal);

}(manywho));
