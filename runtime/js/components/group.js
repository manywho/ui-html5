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

        render: function () {

            manywho.log.info('Rendering Group: ' + this.props.id);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "group", this.props.flowKey).join(' ');
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);
            var activeTab = null;

            if (this.refs.tabs != null) {

                activeTab = this.refs.tabs.getDOMNode().querySelector('li.active');
             
            }

            var childElements = children.map(function(child) {

                var classNames = [];

                if (child.order == 0 && (activeTab == null || manywho.utils.isEqual(activeTab.id, child.id))) {

                    classNames.push('active');

                }

                if (childContainsInvalidItems(child, this.props.flowKey)) {

                    classNames.push('has-error');

                }

                return React.createElement('li', { className: classNames.join(' '), id: child.id },
                            React.createElement('a', { href: '#' + child.id, "data-toggle": "tab", className: 'control-label' }, child.label)
                        );

            }, this);

            return React.DOM.div({ className: classes }, [
                React.createElement('ul', { className: 'nav nav-tabs', ref: 'tabs' }, childElements),
                React.createElement('div', { className: classes + ' tab-content' }, manywho.component.getChildComponents(children, this.props.id, this.props.flowKey))
            ]);

        }

    });

    manywho.component.register("group", group);

    manywho.styling.registerContainer("group", function (item, container) {

        var classes = ['tab-pane'];

        if (item.order == 0) {
            classes.push('active');
        }

        return classes;

    });

}(manywho));
