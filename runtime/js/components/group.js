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

    var group = React.createClass({

        render: function () {

            manywho.log.info('Rendering Group: ' + this.props.id);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "group", this.props.flowKey).join(' ');
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);
            
            var childElements = children.map(function(child) {
                
                return React.createElement('li', { className: (child.order == 0) ? 'active' : null },
                            React.createElement('a', { href: '#' + child.id, "data-toggle": "tab" }, child.label)
                        );
                
            });
                        
            return React.DOM.div({ className: classes }, [
                React.createElement('ul', { className: 'nav nav-tabs' }, childElements),
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