(function (manywho) {

    var feed = React.createClass({

        renderInput: function() {

            return React.DOM.div({ className: 'input-group feed-post' }, [
                React.DOM.div({ className: 'input-group-btn' }, React.DOM.button({ className: 'btn btn-primary feed-post-button' }, 'Post')),
                React.DOM.textarea({ className: 'form-control feed-post-text', rows: '3' }, null)
            ]);

        },

        renderCommenting: function(isEnabled) {

            if (isEnabled) {

                return React.DOM.div({ className: 'input-group input-group-sm feed-comment' }, [
                        React.DOM.span({ className: 'input-group-btn' }, React.DOM.button({ className: 'btn btn-primary' }, 'Comment')),
                        React.DOM.input({ className: 'form-control' }, null)
                    ])
                
            }

            return null;

        },

        renderThread: function(messages, isCommentingEnabled) {

            if (messages) {

                return React.DOM.ul({ className: 'media-list' }, messages.map(function (message) {

                    var createdDate = new Date(message.createdDate);

                    return React.DOM.li({ className: 'media' }, [
                        React.DOM.div({ className: 'media-left' },
                            React.DOM.a({ href: '#' },
                                React.DOM.img({ className: 'media-object', src: message.sender.avatarUrl, width: '32', height: '32' }, null)
                            )
                        ),
                        React.DOM.div({ className: 'media-body feed-message' }, [
                            React.DOM.div({ className: 'media-heading' }, [
                                React.DOM.span({ className: 'feed-sender' }, message.sender.fullName),
                                React.DOM.span({ className: 'feed-created-date' }, createdDate.toLocaleString()),
                            ]),
                            React.DOM.span({ className: 'feed-message-text' }, message.text),
                            this.renderCommenting(isCommentingEnabled),
                            this.renderThread(message.comments, false)
                        ])
                    ]);

                }, this));

            }

            return null;

        },

        render: function () {

            var stream = manywho.social.getStream(this.props.flowKey);

            if (stream) {

                log.info('Rendering Feed');

                var streamMessages = stream.messages || {};

                return React.DOM.div({ className: 'panel panel-default feed' }, [
                    React.DOM.div({ className: 'panel-heading' }, React.DOM.h3({ className: 'panel-title' }, 'Feed')),
                    React.DOM.div({ className: 'panel-body' }, [
                        this.renderInput(),
                        this.renderThread(streamMessages.messages, true)
                    ])
                ]);

            }

            return null;

        }

    });

    manywho.component.register("feed", feed);

}(manywho));

