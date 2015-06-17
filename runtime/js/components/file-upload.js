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

        getDefaultProps: function() {

            return {
                uploadCaption: 'Upload',
                browseCaption: 'Browse',
                smallInputs: false,
                isUploadVisible: true,
                uploadComplete: null,
                upload: function(flowKey, formData, onProgress) {

                    var tenantId = manywho.utils.extractTenantId(flowKey);
                    var authenticationToken = manywho.state.getAuthenticationToken(flowKey);

                    return manywho.ajax.uploadFile(formData, tenantId, authenticationToken, onProgress);

                }
            }

        },

        onUpload: function () {

            if (this.state.fileNames.length > 0) {

                this.setState({
                    isUploadDisabled: true,
                    isProgressVisible: true,
                    progress: 0,
                    error: null
                });

                var self = this;

                var formData = new FormData();
                Array.prototype.slice.call(this.refs.upload.getDOMNode().files).forEach(function (file) {

                    formData.append('FileData', file);

                });

                var model = !manywho.utils.isNullOrWhitespace(this.props.id) ? manywho.model.getComponent(this.props.id, this.props.flowKey) : false;
                if (model && model.fileDataRequest) {

                    formData.append('FileDataRequest', JSON.stringify(model.fileDataRequest));

                }

                return this.props.upload(this.props.flowKey, formData, function(e) {

                    if (e.lengthComputable) {

                        self.setState({ progress: parseInt(e.loaded / e.total * 100) });

                    }

                })
                .done(function (response) {

                    self.setState({
                        isUploadDisabled: false,
                        isFileSelected: false,
                        isProgressVisible: false,
                        progress: 0,
                        fileNames: [],
                        error: null
                    });

                    self.refs.upload.getDOMNode().value = '';

                    if (self.props.uploadComplete) {

                        self.props.uploadComplete(response);

                    }

                })
                .fail(function (response) {

                    self.setState({
                        isUploadDisabled: false,
                        isProgressVisible: false,
                        progress: 0,
                        error: response.statusText
                    });

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
                fileNames: [],
                error: null
            }

        },

        render: function () {

            manywho.log.info('Rendering File Upload ' + this.props.id);

            var model = manywho.utils.isNullOrWhitespace(this.props.id) && manywho.model.getComponent(this.props.id, this.props.flowKey);

            var progress = (this.state.progress || 0) + '%';
            var isMultiple = this.props.multiple;

            if (model) {

                isMultiple = model.multiple;

            }

            var uploadClasses = ['btn', 'btn-default', 'pull-left', 'btn-file-upload'];
            var browseClasses = ['btn', 'btn-primary', 'btn-file'];
            var inputClasses = ['form-control', 'filenames'];

            if (this.props.smallInputs) {

                uploadClasses.push('btn-sm');
                browseClasses.push('btn-sm');
                inputClasses.push('input-sm');

            }

            if (!this.props.isUploadVisible) {

                uploadClasses.push('hidden');

            }

            if (this.state.fileNames.length == 0) {

                inputClasses.push('hidden');

            }

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

    manywho.component.register("file-upload", fileUpload, ['file_upload']);

}(manywho));
