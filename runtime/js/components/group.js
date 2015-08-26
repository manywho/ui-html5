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

    function childContainsInvalidItems(child, flowKey) {

        if (!manywho.model.isContainer(child) && !child.isValid) {

            return true;

        }
        else {

            var items = manywho.model.getChildren(child.id, flowKey)
            for (var i = 0; i < items.length; i++) {

                if (childContainsInvalidItems(items[i], flowKey)) {

                    return true;

                }

            }

        }

        return false;

    }

    var group = React.createClass({

        componentDidMount: function() {

            $(this.refs.group.getDOMNode().children[this.state.activeTabIndex].querySelector('a')).tab('show');

        },

        componentDidUpdate: function() {

            $(this.refs.group.getDOMNode().children[this.state.activeTabIndex].querySelector('a')).tab('show');

        },

        getInitialState: function() {

            return {
                activeTabIndex: 0
            }

        },

        onTabSelected: function(index) {

            this.setState({ activeTabIndex: index });
            $(this.refs.group.getDOMNode().children[this.state.activeTabIndex].querySelector('a')).tab('show');

        },

        render: function () {

            manywho.log.info('Rendering Group: ' + this.props.id);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "group", this.props.flowKey).join(' ');
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            var childElements = children.map(function(child, index) {

                var classNames = [];

                if (childContainsInvalidItems(child, this.props.flowKey)) {

                    classNames.push('has-error');

                }

                return React.createElement('li', { className: classNames.join(' ') },
                            React.createElement('a', { href: '#' + child.id, "data-toggle": "tab", className: 'control-label', onChange: this.onTabSelected.bind(null, index) }, child.label)
                        );

            }, this);

            return React.DOM.div({ className: classes, ref: 'group' }, [
                React.createElement('ul', { className: 'nav nav-tabs' }, childElements),
                React.createElement('div', { className: classes + ' tab-content' }, manywho.component.getChildComponents(children, this.props.id, this.props.flowKey))
            ]);

        }

    });

    manywho.component.register("group", group);

    manywho.styling.registerContainer("group", function (item, container) {

        return ['tab-pane'];

    });

}(manywho));
