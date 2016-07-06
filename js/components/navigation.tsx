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

            for (itemId in items) {
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

        onClick: function(e) {
            e.preventDefault();

            if (!manywho.utils.isEqual(window.getComputedStyle(this.refs.toggle).display, 'none', true))
                this.refs.toggle.click();

            manywho.engine.navigate(this.props.id, e.target.id, null, this.props.flowKey);
        },

        componentDidMount: function () {
            this.handleResizeDebounced = manywho.utils.debounce(this.handleResize, 500);
            window.addEventListener('resize', this.handleResizeDebounced);
        },

        componentWillUnmount: function () {
            window.removeEventListener('resize', this.handleResizeDebounced);
        },

        handleResize: function () {

            if (this.refs.navigationBar) {

                var navigationElement = this.refs.navigationBar.getDOMNode();

                if (navigationElement.classList.contains('navbar-double-height')) navigationElement.classList.remove('navbar-double-height');

                if (navigationElement.classList.contains('navbar-triple-height')) navigationElement.classList.remove('navbar-triple-height');

                var header = navigationElement.querySelector('.navbar-header');

                var navigationTitle = header.querySelector('.navbar-brand');

                if (!navigationElement.classList.contains('navbar-double-height')) {

                    if (navigationTitle && navigationElement.clientHeight > 100) {

                        navigationElement.classList.add('navbar-triple-height');

                    } else if (!navigationTitle && navigationElement.clientHeight > 100) {

                        navigationElement.classList.add('navbar-double-height');

                    }

                }

            }

        },

        componentDidUpdate: function () {
            this.handleResize();
        },

        render: function () {
            var navigation = manywho.model.getNavigation(this.props.id, this.props.flowKey);

            if (navigation && navigation.isVisible) {

                manywho.log.info("Rendering Navigation");

                let navElements = this.getNavElements(navigation.items, true);

                navElements = navElements.concat(manywho.settings.global('navigation.components') || []);
                navElements = navElements.concat(manywho.settings.flow('navigation.components', this.props.flowKey) || []);

                const returnToParent = navigation.returnToParent || null;

                let className = 'navbar navbar-default';

                if (!this.props.isFullWidth)
                    className += ' container'

                if (manywho.settings.global('navigation.isWizard', this.props.flowKey, true))
                    className += ' navbar-wizard';

                if (manywho.settings.isDebugEnabled(this.props.flowKey))
                    className += ' nav-debug';

                if (manywho.settings.global('history', this.props.flowKey))
                    className += ' nav-history';

                return (<nav className={className} ref="navigationBar">
                    <div>
                        {this.getHeaderElement(this.props.id, navigation)}
                        <div className="collapse navbar-collapse" id={this.props.id} ref="container">
                            <ul className="nav navbar-nav">{navElements}</ul>
                            {returnToParent}
                        </div>
                    </div>
                </nav>);
            }

            return null;

        }

    });

    manywho.component.register("navigation", navigation);

}(manywho));
