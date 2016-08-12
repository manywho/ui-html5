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

/// <reference path="../../typings/index.d.ts" />

declare var manywho: any;
declare var $: any;

(function (manywho) {

    function childContainsInvalidItems(child, flowKey) {
        if (!manywho.model.isContainer(child) && !child.isValid)
            return true;
        else {
            var items = manywho.model.getChildren(child.id, flowKey)
            for (var i = 0; i < items.length; i++) {
                if (childContainsInvalidItems(items[i], flowKey))
                    return true;
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

        componentDidMount: function() {
            if (!this.props.isDesignTime && this.refs.group.children[0].children && this.refs.group.children[0].children.length > 0) {
                clearActivePanes(this.refs.group);
                this.refs.group.children[0].children[this.state.activeTabIndex].classList.add('active');
                this.refs.group.children[1].children[this.state.activeTabIndex].classList.add('active');
            }
        },

        componentDidUpdate: function() {
            if (!this.props.isDesignTime && this.refs.group.children[0].children && this.refs.group.children[0].children.length > 0) {
                clearActivePanes(this.refs.group);
                this.refs.group.children[0].children[this.state.activeTabIndex].classList.add('active');
                this.refs.group.children[1].children[this.state.activeTabIndex].classList.add('active');
            }
        },

        getInitialState: function() {
            return {
                activeTabIndex: 0
            }
        },

        onTabSelected: function(index) {
            this.setState({ activeTabIndex: index });
            $(this.refs.tabs.children[index].querySelector('a')).tab('show');
        },

        render: function () {
            const children = manywho.model.getChildren(this.props.id, this.props.flowKey);

            const tabs = children.map((child, index) => {
                let className = null;

                if (!this.props.isDesignTime && childContainsInvalidItems(child, this.props.flowKey))
                    className += 'has-error';

                return <li className={className}>
                    <a href={'#' + child.id} className="control-label" onClick={this.onTabSelected.bind(null, index)} data-toggle="tab">{child.label}</a>
                </li>
            });

            if (this.props.isDesignTime)
                return <div className="clearfix">
                    {this.props.children || manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)}
                </div>

            return <div ref="group">
                <ul className="nav nav-tabs" ref="tabs">{tabs}</ul>
                <div className="tab-content">
                    {this.props.children || manywho.component.getChildComponents(children, this.props.id, this.props.flowKey)}
                </div>
            </div>
        }

    });

    manywho.component.registerContainer('group', group);

    manywho.styling.registerContainer('group', (item, container) => {
        return ['tab-pane', 'label-hidden'];
    });

}(manywho));
