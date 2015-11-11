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

    var history = React.createClass({

        onClick: function (e) {

            var mapElementId = e.currentTarget.id;

            manywho.model.popHistory(mapElementId, this.props.flowKey);

            manywho.engine.navigate(this.props.id, null, e.currentTarget.id, this.props.flowKey);

        },

        renderOutcome: function (outcome, selectedOutcome, outcomeWidth) {

            var classes = 'outcome-info alert ';
            if (outcome.id == selectedOutcome) classes += ' selected-outcome';

            return React.DOM.div({ className: classes, style: { width: outcomeWidth }}, [
                React.DOM.p({ align: 'center' }, outcome.label)
            ])

        },

        renderSteps: function (history) {

            var self = this;

            return history.map(function (step, index) {

                if (index < history.length-1 && step.name) {

                    var outcomes = step.outcomes || [];

                    var outcomeWidth = Math.floor(100 / outcomes.length)-2 + '%';

                    return React.DOM.div({ className: 'history-row' }, [
                        React.DOM.div({ id: step.id, className: 'alert step bg-primary', onClick: self.onClick }, [
                            React.DOM.div({ className: 'step-title' }, step.label || step.name),
                            React.DOM.div({ className: 'step-content', dangerouslySetInnerHTML: {__html: step.content || '' } })
                        ]),
                        outcomes.map(function (outcome) {
                            return self.renderOutcome(outcome, step.selectedOutcome, outcomeWidth);
                        })
                    ]);

                }

            });

        },

        render: function () {

            if (manywho.settings.global('history', this.props.flowKey) && !manywho.settings.isDebugEnabled(this.props.flowKey)) {

                var historyData = manywho.model.getHistory(this.props.flowKey);

                return React.DOM.div({ className: 'panel panel-default history-view' }, [
                    React.DOM.div({ className: 'panel-heading' }, React.DOM.h3({ className: 'panel-title' }, 'History')),
                    React.DOM.div({ className: 'panel-body' }, this.renderSteps(historyData))
                ]);


            }

            return null;

        }

    });

    manywho.component.register("history", history);

}(manywho));