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

    var feedInput = React.createClass({

        send: function() {

            var deferred = null;
            var self = this;

            if (this.refs.files && this.refs.files.state.fileNames.length > 0) {

                deferred = this.refs.files.onUpload()

            }
            else {

                deferred = jQuery.Deferred();
                deferred.resolve();

            }

            deferred.done(function(response) {

                return self.props.send(self.refs.textarea.getDOMNode().value, self.props.messageId, self.state.mentionedUsers, response && response.files);

            })
            .then(function() {

                self.refs.textarea.getDOMNode().value = '';

            });

        },


        onKeyPress: function(e) {

            e.stopPropagation();

            if (e.charCode == 13 && !e.shiftKey) {

                e.preventDefault();
                this.send();

            }


        },

        getInitialState: function() {

            return {
                mentionedUsers: {}
            }

        },

        componentDidMount: function() {

            var self = this;

            $(this.refs.textarea.getDOMNode()).textcomplete([{
                match: /@([A-Za-z]{2,})$/,
                index: 1,
                search: function (term, callback) {

                    manywho.social.getUsers(self.props.flowKey, term)
                        .done(function(response) { callback(response); })
                        .fail(function(response) { callback([]); });

                },
                template: function(value) {

                    return '<img src="' + value.avatarUrl + '"></img> ' + value.fullName;

                },
                replace: function (value) {

                    self.state.mentionedUsers[value.id] = value;
                    return '@[' + value.fullName + '] ';

                }
            }],
            { appendTo: $('.mw-bs') } );

        },

        render: function () {

            var fileUpload = null;
            if (this.props.isAttachmentsEnabled) {

                fileUpload = React.createElement(manywho.component.getByName('file-upload'), { flowKey: this.props.flowKey, multiple: true, upload: manywho.social.attachFiles, smallInputs: true, isUploadVisible: false, browseCaption: 'Attach Files', ref: 'files' });

            }

            return React.DOM.div({ className: 'feed-post clearfix' }, [
                React.DOM.div({ className: 'feed-post-text' }, [
                    React.DOM.textarea({ className: 'form-control feed-message-text', rows: '2', onKeyPress: this.onKeyPress, onChange: this.onChange, defaultValue: '', ref: 'textarea' }, null),
                    fileUpload
                ]),
                React.DOM.button({ className: 'btn btn-sm btn-primary feed-post-send', onClick: this.send }, this.props.caption)
            ]);

        }

    });

    var feed = React.createClass({

        onToggleFollow: function(e) {

            manywho.social.toggleFollow(this.props.flowKey);

        },

        onRefresh: function(e) {

            manywho.social.refreshMessages(this.props.flowKey);

        },

        onGetNextPage: function(e) {

            manywho.social.getMessages(this.props.flowKey);

        },

        onSendMessage: function(message, messageId, mentionedUsers, attachments) {

            return manywho.social.sendMessage(this.props.flowKey, message, messageId, mentionedUsers, attachments);

        },

        renderThread: function(messages, isCommentingEnabled, isAttachmentsEnabled) {

            if (messages) {

                return React.DOM.ul({ className: 'media-list' }, messages.map(function (message) {

                    var createdDate = new Date(message.createdDate);
                    var attachments = message.attachments || [];

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
                            React.DOM.div({ className: 'feed-message-text', dangerouslySetInnerHTML: { __html: message.text } }, null),
                            React.DOM.div({ className: 'feed-message-attachments' },
                                attachments.map(function(attachment) {

                                    return React.DOM.a({ href: attachment.downloadUrl, target: "_blank"  }, attachment.name);

                                })
                            ),
                            this.renderThread(message.comments, false, false),
                            isCommentingEnabled && React.createElement(feedInput, { caption: 'Reply', flowKey: this.props.flowKey, messageId: message.id, send: this.onSendMessage, isAttachmentsEnabled: isAttachmentsEnabled }, null)
                        ])
                    ]);

                }, this));

            }

            return null;

        },

        renderFollowers: function(followers) {

            if (followers) {

                var followerElements = followers.map(function (follower) {

                    return React.DOM.img({ className: 'feed-follower', src: follower.avatarUrl, title: follower.fullName, width: '32', height: '32' });

                });

                return React.DOM.div({ className: 'row' },
                    React.DOM.ul({ className: 'list-inline' }, [
                        React.DOM.span(null, React.DOM.strong(null, 'Followers: '))
                    ].concat(followerElements)
                    )
                );

            }

            return null;

        },

        render: function () {

            var stream = manywho.social.getStream(this.props.flowKey);

            if (stream && stream.me) {

                manywho.log.info('Rendering Feed');

                var streamMessages = stream.messages || {};
                var loading = manywho.state.getLoading('feed', this.props.flowKey);

                var followCaption = (stream.me.isFollower) ? 'Un-Follow' : 'Follow';
                var isFooterVisible = streamMessages.nextPage && streamMessages.nextPage > 1;

                return React.DOM.div({ className: 'panel panel-default feed', onKeyUp: this.onEnter }, [
                    React.DOM.div({ className: 'panel-heading clearfix' }, [
                        React.DOM.h3({ className: 'panel-title pull-left' }, 'Feed'),
                        React.DOM.div({ className: 'pull-right btn-group' }, [
                            React.DOM.button({ className: 'btn btn-default btn-sm', onClick: this.onToggleFollow }, [
                                React.DOM.span({ className: 'glyphicon glyphicon-pushpin'}, null),
                                ' ' + followCaption
                            ]),
                            React.DOM.button({ className: 'btn btn-default btn-sm', onClick: this.onRefresh }, [
                                React.DOM.span({ className: 'glyphicon glyphicon-refresh' }, null),
                                ' Refresh'
                            ])
                        ])
                    ]),
                    React.DOM.div({ className: 'panel-body' }, [
                        this.renderFollowers(stream.followers),
                        React.createElement(feedInput, { caption: 'Post', flowKey: this.props.flowKey, send: this.onSendMessage, isAttachmentsEnabled: true }, null),
                        this.renderThread(streamMessages.messages, true)
                    ]),
                    React.DOM.div({ className: 'panel-heading clearfix ' + (!isFooterVisible) ? 'hidden' : '' },
                        React.DOM.button({ className: 'btn btn-default pull-right', onClick: this.onGetNextPage }, 'More')
                    ),
                    React.createElement(manywho.component.getByName('wait'), { isVisible: loading != null, message: loading && loading.message }, null)
                ]);

            }

            return null;

        }

    });

    manywho.component.register("feed", feed);

}(manywho));
