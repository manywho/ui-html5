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

            log.info("Rendering Notification");

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
