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

    var fileUpload = React.createClass({
        
        onUpload: function (e) {

            if (this.state.fileNames.length > 0) {

                this.setState({
                    isUploadDisabled: true,
                    isProgressVisible: true,
                    progress: 0
                });

                var self = this;
                
                this.props.upload(Array.prototype.slice.call(this.refs.upload.getDOMNode().files), function (e) {

                    if (e.lengthComputable) {

                        self.setState({ progress: parseInt(e.loaded / e.total * 100) });

                    }

                }).done(function (response) {

                    self.setState({
                        isUploadDisabled: false,
                        isFileSelected: false,
                        isProgressVisible: false,
                        progress: 0,
                        fileNames: []
                    });

                    self.refs.upload.getDOMNode().value = '';

                    if (self.props.onUploadComplete) {

                        self.props.onUploadComplete(response);

                    }

                });

            }

        },

        onFileSelected: function (e) {

            this.setState({
                fileNames: Array.prototype.slice.call(e.currentTarget.files).map(function(file) { return file.name }), 
                isFileSelected: true
            });

        },

        getInitialState: function() {

            return {
                isUploadDisabled: false,
                isFileSelected: false,
                isProgressVisible: false,
                fileNames: []
            }

        },

        render: function () {

            log.info('Rendering File Upload' + this.props.id);

            var progress = (this.state.progress || 0) + '%';

            return React.DOM.div(null, [
                React.DOM.div({ className: 'clearfix' }, [
                    React.DOM.button({ className: 'btn btn-default pull-left', disabled: this.state.isUploadDisabled || !this.state.isFileSelected, onClick: this.onUpload }, this.props.caption || 'Upload'),
                    React.DOM.div({ className: 'form-group pull-left file-upload-browse' },
                        React.DOM.div({ className: 'input-group' }, [
                            React.DOM.span({ className: 'input-group-btn' },
                                React.DOM.span({ className: 'btn btn-primary btn-file', disabled: this.state.isUploadDisabled }, [
                                    'Browse',
                                    React.DOM.input({ type: 'file', onChange: this.onFileSelected, ref: 'upload', multiple: this.props.multiple })
                                ])
                            ),
                            React.DOM.input({ type: 'text', className: 'form-control file-selected', readOnly: 'readonly', value: this.state.fileNames.join(' ') })
                        ])
                    )
                ]),
                React.DOM.div({ className: 'progress ' + ((this.state.isProgressVisible) ? '' : 'hidden') },
                    React.DOM.div({ className: 'progress-bar', style: { width: progress } })
                )
            ]);

        }

    });

    manywho.component.register("file-upload", fileUpload);

}(manywho));