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

    var fileDialog = React.createClass({

        getInitialState: function() {

            return {



            }

        },

        render: function () {

            return React.DOM.div({ className: classes }, [
                React.createElement('ul', { className: 'nav nav-tabs' }, [
                    React.createElement('li', { className: 'active'}, [
                        React.createElement('a', { href: '#', 'data-toggle': 'tab'}, 'Files')
                    ]),
                    React.createElement('li', { className: ''}, [
                        React.createElement('a', { href: '#', 'data-toggle': 'tab'}, 'Upload')
                    ])
                ]),
                React.DOM.div({ className: classes + ' tab-content' }, [
                    React.DOM.div({ className: 'tab-pane active mw-vertical_flow clearfix'},
                        React.createElement('file-upload', { multiple: true, id: 'rtf', flowKey: this.props.flowKey })
                    ),
                    React.DOM.div({ className: 'tab-pane mw-vertical_flow clearfix'},
                        React.createElement('file-list', {  })
                    )
                ])
            ]);

            return React.DOM.div(null, [
                React.DOM.div({ className: 'clearfix' }, [
                    React.DOM.button({ className: uploadClasses.join(' '), disabled: this.state.isUploadDisabled || !this.state.isFileSelected, onClick: this.onUpload }, this.props.uploadCaption),
                    React.DOM.div({ className: "input-group" },
                        React.DOM.span({ className: "input-group-btn" },
                            React.DOM.span({ className: browseClasses.join(' ')  },[
                                this.props.browseCaption,
                                React.DOM.input({ type: "file", multiple: isMultiple, onChange: this.onFileSelected, ref: 'upload' })
                            ])
                        ),
                        React.DOM.input({ type: "text", className: inputClasses.join(' '), readOnly: true, value: this.state.fileNames.join(' ') })
                    )
                ]),
                React.DOM.div({ className: 'progress ' + ((this.state.isProgressVisible) ? '' : 'hidden') },
                    React.DOM.div({ className: 'progress-bar', style: { width: progress } })
                )
            ]);

        }

    });

    manywho.component.register("file-dialog", fileDialog, ['file_dialog']);

}(manywho));
