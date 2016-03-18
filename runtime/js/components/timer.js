/*!
 Copyright 2016 ManyWho, Inc.
 Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
 file except in compliance with the License.
 You may obtain a copy of the License at: http://manywho.com/sharedsource
 Unless required by applicable law or agreed to in writing, software distributed under
 the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied. See the License for the specific language governing
 permissions and limitations under the License.
 */

(function (manywho) {

    function getFormattedTime(timeInSeconds) {

        var hours   = Math.floor(timeInSeconds / 3600);
        var minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
        var seconds = timeInSeconds - (hours * 3600) - (minutes * 60);

        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        return minutes + ':' + seconds;

    }

    function getSecondsRemaining(contentValue) {

        var multiplier = 1;
        contentValue = contentValue.toLowerCase();

        // If we're dealing with minutes multiply the value by 60, otherwise, we assume seconds
        if (contentValue.indexOf('minute') >= 0) {
            multiplier = 60;
        }

        // Parse the number and apply the appropriate multiplier
        return multiplier * parseInt(contentValue.replace(/\D/g,''));

    }

    var timer = React.createClass({

        getInitialState: function() {
            return {
                secondsRemaining: 0,
                formattedTime: '00:00'
            };
        },

        tick: function() {

            this.setState({
                secondsRemaining: this.state.secondsRemaining - 1,
                formattedTime: getFormattedTime(this.state.secondsRemaining - 1)
            });

            if (this.state.secondsRemaining <= 0) {

                // Clear the interval so we don't have multiple threads going
                clearInterval(this.interval);

                var outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);

                if (outcomes != null &&
                    outcomes.length > 0) {

                    // If we have an outcome bound, choose that one
                    manywho.engine.move(outcomes[0], this.props.flowKey);

                } else {

                    var flowKey = this.props.flowKey;

                    // Give the engine another second
                    setTimeout(function() {

                        // Re-sync with the server here so that any events attached to the component are processed
                        // This is a bit slicker than simply refreshing the page
                        manywho.engine.sync(flowKey).then(function() {

                            manywho.engine.render(flowKey);

                        });

                        manywho.collaboration.sync(flowKey);

                    }, 10000);

                }
            }

        },

        componentDidMount: function() {

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var manywhoState = manywho.state.getComponent(this.props.id, this.props.flowKey);

            var contentValue = manywhoState && manywhoState.contentValue != null ?  manywhoState.contentValue : model.contentValue;

            this.setState({ secondsRemaining: getSecondsRemaining(contentValue) });
            this.interval = setInterval(this.tick, 1000);

        },

        componentWillUnmount: function() {

            clearInterval(this.interval);

        },

        render: function () {

            manywho.log.info('Rendering Timer: ' + this.props.id);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "timer", this.props.flowKey).join(' ');

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);

            if (model.isVisible == false) {

                classes += ' hidden';

            }

            // Don't render outcomes as any bound outcomes will be used "silently"
            return React.DOM.div({ className: classes, id: this.props.id }, [
                React.DOM.div(null, model.label + ' ', this.state.formattedTime)
            ]);

        }

    });

    manywho.component.register("timer", timer);

}(manywho));
