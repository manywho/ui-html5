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

    var presentation = React.createClass({

        replaceContent: function() {

            manywho.log.info('Rendering Presentation: ' + this.props.id);

            var html = manywho.model.getComponent(this.props.id, this.props.flowKey).content
                .replace(/&quot;/g, '\"')
                .replace(/&#39;/g, '\'')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');

            var node = React.findDOMNode(this.refs.content);
            node.innerHTML = html;

            var imgs = node.querySelectorAll('img')
            if (imgs && imgs.length > 0) {

                for (var i = 0; i < imgs.length; i++) {

                    imgs[i].className += ' img-responsive';

                }

            }

        },

        componentDidUpdate: function() { this.replaceContent() },
        componentDidMount: function() { this.replaceContent() },

        render: function () {

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "presentation", this.props.flowKey).join(' ');

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);

            if (model.isVisible == false) {

                classes += ' hidden';

            }

            var outcomeButtons = outcomes && outcomes.map(function (outcome) {
                return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey });
            }, this);

            return React.DOM.div({ className: classes, id: this.props.id }, [
                React.DOM.div({ ref: "content" }, null),
                outcomeButtons
            ]);

        }

    });

    manywho.component.register("presentation", presentation);

}(manywho));
