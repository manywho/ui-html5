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

(function (manywho) {

    var navigation = React.createClass({

        getItem(items: any, id: string) {
            for (const itemId in items) {
                if (itemId === id)
                    return items[id];
                else {
                    const item = items[itemId];
                    if (item.items) {
                        let foundItem = this.getItem(item.items, id);
                        if (foundItem)
                            return foundItem;
                    }
                }
            }
        },

        getHeaderElement: function(id, navigation) {
            var children = [
                <button className="navbar-toggle collapsed" data-toggle="collapse" data-target={'#' + id} ref="toggle">
                    <span className="sr-only">Toggle Navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
            ];

            if (navigation.label != null && navigation.label.trim().length > 0)
                children.push(<a className="navbar-brand" href="#">{navigation.label}</a>);

            return <div className="navbar-header">{children}</div>
        },

        getNavElements: function(items, isTopLevel) {
            var elements = [];

            for (const itemId in items) {
                var item = items[itemId];
                var element = null;

                var classNames = [
                    (item.isCurrent) ? 'active' : '',
                    (item.isVisible == false) ? 'hidden' : '',
                    (item.isEnabled) ? '' : 'disabled',
                    (isTopLevel) ? 'top-nav-element': ''
               ];

                if (item.items != null) {
                    classNames.push('dropdown');

                    element = <li className={classNames.join(' ')}>
                        <a href="#" id={item.id} data-toggle="dropdown">
                            {item.label}
                            <span className="caret" />
                        </a>
                        <ul className="dropdown-menu">
                            {this.getNavElements(item.items, false)}
                        </ul>
                    </li>
                }
                else
                    element = <li className={classNames.join(' ')}>
                        <a href="#" onClick={this.onClick} id={item.id}>{item.label}</a>
                    </li>

                elements.push(element);
            }

            return elements;
        },

        onClick: function(item) {
            if (!item.isEnabled)
                return false;

            if (this.refs.toggle && !manywho.utils.isEqual(window.getComputedStyle(this.refs.toggle).display, 'none', true))
                this.refs.toggle.click();

            manywho.engine.navigate(this.props.id, item.id, null, this.props.flowKey);
        },

        render: function () {
            var navigation = manywho.model.getNavigation(this.props.id, this.props.flowKey);

            if (navigation && navigation.isVisible) {

                manywho.log.info("Rendering Navigation");

                let navElements = this.getNavElements(navigation.items, true);

                navElements = navElements.concat(manywho.settings.global('navigation.components') || []);
                navElements = navElements.concat(manywho.settings.flow('navigation.components', this.props.flowKey) || []);

                const returnToParent = navigation.returnToParent || null;

                if (!manywho.settings.global('navigation.isWizard', this.props.flowKey, true)) {
                    let innerClassName = '';

                    if (!this.props.isFullWidth)
                        innerClassName += ' container'

                    return (<nav className="navbar navbar-default" ref="navigationBar">
                        <div className={innerClassName}>
                            {this.getHeaderElement(this.props.id, navigation)}
                            <div className="collapse navbar-collapse" id={this.props.id} ref="container">
                                <ul className="nav navbar-nav">{navElements}</ul>
                                {returnToParent}
                            </div>
                        </div>
                    </nav>);
                }
                else {
                    return <div className="navbar-wizard">
                        {(!manywho.utils.isNullOrWhitespace(navigation.label) ? <span className="navbar-brand">{navigation.label}</span> : null )}
                        <ul className="steps">
                            {manywho.utils.convertToArray(navigation.items).map(item => {
                                let className = null;

                                if (item.isCurrent)
                                    className += ' active';

                                if (item.isVisible === false)
                                    className += ' hidden';

                                if (item.isEnabled === false)
                                    className += ' disabled';

                                return <li onClick={this.onClick.bind(null, item)} id={item.id} className={className}><span className="indicator"/><span className="glyphicon glyphicon-ok" />{item.label}</li>
                            })}
                        </ul>
                        {returnToParent}
                    </div>
                }                
            }

            return null;
        }

    });

    manywho.component.register("navigation", navigation);

}(manywho));
