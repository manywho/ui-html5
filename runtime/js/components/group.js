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

    function clearActivePanes(groupContainer) {

        for (var i = 0; i < groupContainer.children.length; i++) {

            var child = groupContainer.children[i];

            for (var j = 0; j < child.children.length; j++) {

                child.children[j].classList.remove('active');

            }

        }

    }

    var group = React.createClass({

        mixins: [manywho.component.mixins.collapse],

        componentDidMount: function() {

            if (!this.props.isDesignTime && this.refs.group.getDOMNode().children[0].children && this.refs.group.getDOMNode().children[0].children.length > 0) {

                clearActivePanes(this.refs.group.getDOMNode());

                this.refs.group.getDOMNode().children[0].children[this.state.activeTabIndex].classList.add('active');

                this.refs.group.getDOMNode().children[1].children[this.state.activeTabIndex].classList.add('active');

            }

        },

        componentDidUpdate: function() {

            if (!this.props.isDesignTime && this.refs.group.getDOMNode().children[0].children && this.refs.group.getDOMNode().children[0].children.length > 0) {

                clearActivePanes(this.refs.group.getDOMNode());

                this.refs.group.getDOMNode().children[0].children[this.state.activeTabIndex].classList.add('active');

                this.refs.group.getDOMNode().children[1].children[this.state.activeTabIndex].classList.add('active');

            }

        },

        getInitialState: function() {

            return {
                activeTabIndex: 0
            }

        },

        onTabSelected: function(index) {

            this.setState({ activeTabIndex: index });
            $(this.refs.tabs.getDOMNode().children[index].querySelector('a')).tab('show');

        },

        render: function () {

            manywho.log.info('Rendering Group: ' + this.props.id);

            var classes = manywho.styling.getClasses(this.props.parentId, this.props.id, "group", this.props.flowKey).join(' ');
            var children = manywho.model.getChildren(this.props.id, this.props.flowKey);
            var outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
            var model = manywho.model.getContainer(this.props.id, this.props.flowKey);

            var tabs = children.map(function(child, index) {

                var classNames = [];

                if (!this.props.isDesignTime && childContainsInvalidItems(child, this.props.flowKey)) {

                    classNames.push('has-error');

                }

                return React.createElement('li', { className: classNames.join(' ') },
                            React.createElement('a', { href: '#' + child.id, "data-toggle": "tab", className: 'control-label', onClick: this.onTabSelected.bind(null, index) }, child.label)
                        );

            }, this);

            var outcomeButtons = outcomes && outcomes.map(function (outcome) {
                return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey });
            }, this);

            if (this.props.isDesignTime) {

                var childClasses = ['clearfix'];

                return React.DOM.div({ className: classes, id: this.props.id }, [
                    this.getLabel(model.label),
                    React.DOM.div({ className: childClasses.join(' '), style: { height: this.state.height} }, [
                        this.props.children || manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)
                    ])
                ]);

            }

            return React.DOM.div({ className: classes, ref: 'group' }, [
                React.createElement('ul', { className: 'nav nav-tabs', ref: 'tabs' }, tabs),
                React.createElement('div', { className: classes + ' tab-content' }, this.props.children || manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)),
                outcomeButtons
            ]);

        }

    });

    manywho.component.register("group", group);

    manywho.styling.registerContainer("group", function (item, container) {

        return ['tab-pane'];

    });

}(manywho));
