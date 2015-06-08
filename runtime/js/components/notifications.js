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

    var notifications = React.createClass({

        render: function () {

            var models = manywho.model.getNotifications(this.props.flowKey, this.props.position);
            var notificationComponent = manywho.component.getByName('notification');
            var padding = (models.length > 0) ? '20px' : null;

            return React.DOM.ul({ className: this.props.position + '-notifications notifications', style: { padding: padding } }, models.map(function (item) {

                return React.DOM.li(null, React.createElement(notificationComponent, { model: item, flowKey: this.props.flowKey }));

            }, this));

        }

    });

    manywho.component.register("notifications", notifications);

    var notification = React.createClass({

        dismiss: function() {

            manywho.model.removeNotification(this.props.flowKey, this.props.model);

        },

        componentDidMount: function() {

            if (this.props.model.timeout && this.props.model.timeout > 0) {

                var self = this;

                this.timeout = setTimeout(function () {

                    clearTimeout(self.timeout);
                    self.dismiss();

                }, this.props.model.timeout);

            }

        },

        render: function () {

            manywho.log.info("Rendering Notification");

            var classNames = [
                'alert notification',
                'alert-' + this.props.model.type,
                (this.props.model.dismissible) ? 'alert-dismissible' : null
            ].join(' ');

            return React.DOM.div({ className: classNames }, [
                (this.props.model.dismissible) ? React.DOM.button({ className: 'close', onClick: this.dismiss }, React.DOM.span(null, '\u00D7')) : null,
                React.DOM.span(null, this.props.model.message)
            ]);

        }

    });

    manywho.component.register("notification", notification);


}(manywho));
