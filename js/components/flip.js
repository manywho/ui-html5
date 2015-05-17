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

        onTouchStart: function() {

            this.setState({ isFlipped: true });

        },

        onTouchEnd: function() {

            this.setState({ isFlipped: false });

        },

        getInitialState: function() {

            return {
                isFlipped: false
            }

        },

        render: function () {

            log.info('Rendering Flip: ' + this.props.id);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "flip", this.props.flowKey);
            classes.push('flip-container');

            if (this.state.isFlipped) {

                classes.push('hover')

            }

            classes = classes.join(' ');

            var children = manywho.model.getChildren(this.props.id, this.props.flowKey)

            var childComponents = manywho.component.getChildComponents(children, this.props.id, this.props.flowKey);

            return React.DOM.div({ className: classes, onTouchStart: this.onTouchStart, onTouchEnd: this.onTouchEnd, id: this.props.id }, [
                React.DOM.div({ className: 'flipper '}, [
                    React.DOM.div({ className: 'front' }, childComponents[0]),
                    React.DOM.div({ className: 'back' }, childComponents[1])
                ])
            ]);

        }

    });

    manywho.component.register("flip", flip);

}(manywho));
