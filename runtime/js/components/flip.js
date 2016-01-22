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

// Stolen From: http://davidwalsh.name/css-flip
(function (manywho) {

    var flip = React.createClass({

        toggleFlip: function () {

            this.setState({ isFlipped: !this.state.isFlipped });

        },

        getInitialState: function() {

            return {
                isFlipped: false,
                animationStyle: 'rotateY'
            }

        },

        render: function () {

            manywho.log.info('Rendering Flip: ' + this.props.id);

            var outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "flip", this.props.flowKey);
            classes.push('flip-container');

            if (this.state.isFlipped) {

                classes.push(this.state.animationStyle);

            }

            classes = classes.join(' ');

            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            var childComponents = manywho.component.getChildComponents(children, this.props.id, this.props.flowKey);

            var outcomeButtons = outcomes && outcomes.map(function (outcome) {
                return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey });
            }, this);

            return React.DOM.div({ className: classes, onTouchEnd: this.toggleFlip, onClick: this.toggleFlip, id: this.props.id }, [
                React.DOM.div({ className: 'flipper '}, [
                    React.DOM.div({ className: 'front front-' + this.state.animationStyle }, childComponents[0]),
                    React.DOM.div({ className: 'back back-' + this.state.animationStyle }, childComponents[1])
                ]),
                outcomeButtons
            ]);

        }

    });

    manywho.component.register("flip", flip);

}(manywho));
