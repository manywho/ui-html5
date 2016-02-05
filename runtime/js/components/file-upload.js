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
                Array.prototype.slice.call(this.state.files).forEach(function (file) {

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
                        isUploadComplete: true,
                        fileNames: [],
                        error: null
                    });

                    setTimeout(function() {
                        self.setState({ isUploadComplete: false, isProgressVisible: false, progress: 100, });
                    }, 2000);

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

        onDrop: function (files) {

            if (!this.props.isDesignTime) {

                this.onFileSelected(files);

            }

        },

        onFileSelected: function (files) {

            if (!this.props.isDesignTime) {

                this.setState({
                    fileNames: Array.prototype.slice.call(files).map(function(file) { return file.name }),
                    files: files,
                    isFileSelected: true
                });

                var model = !manywho.utils.isNullOrWhitespace(this.props.id) && manywho.model.getComponent(this.props.id, this.props.flowKey);
                if (model && model.attributes && model.attributes.isAutoUpload) {

                    setTimeout(this.onUpload.bind(this));

                }

            }

        },

        getInitialState: function() {

            return {
                isUploadDisabled: false,
                isFileSelected: false,
                isProgressVisible: false,
                isUploadComplete: false,
                fileNames: [],
                error: null
            }

        },

        render: function () {

            manywho.log.info('Rendering File Upload ' + this.props.id);

            var model = !manywho.utils.isNullOrWhitespace(this.props.id) && manywho.model.getComponent(this.props.id, this.props.flowKey);
            var outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);

            var progress = (this.state.progress || 0) + '%';
            var isAutoUpload = false;

            if (model)
                isAutoUpload = model.attributes && model.attributes.isAutoUpload;

            var uploadClasses = ['btn', 'btn-primary'];
            var inputClasses = ['form-control', 'filenames'];
            var progressClasses = ['progress-bar'];
            var componentClasses = ['file-upload'];

            if (this.props.smallInputs) {

                uploadClasses.push('btn-sm');
                inputClasses.push('input-sm');

            }

            if (!this.props.isUploadVisible)
                uploadClasses.push('hidden');

            if (this.state.isUploadComplete)
                progressClasses.push('progress-bar-success');

            if (model.isVisible == false)
                componentClasses.push('hidden');

            var dropzoneAttributes = {
                ref: 'upload',
                multiple: (null != this.props.multiple) ? this.props.multiple : model.multiple,
                className: 'dropzone'
            };

            var buttonAttributes = {
                className: uploadClasses.join(' '),
                disabled: this.state.isUploadDisabled || !this.state.isFileSelected || this.props.isDesignTime
            };

            if (!this.props.isDesignTime) {
                dropzoneAttributes = manywho.utils.extend(dropzoneAttributes, { onDrop: this.onDrop });
                buttonAttributes = manywho.utils.extend(buttonAttributes, { onClick: this.onUpload });
            }

            var outcomeButtons = outcomes && outcomes.map(function (outcome) {
                return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey });
            }, this);

            return React.DOM.div({ className: componentClasses.join(' ') }, [
                React.DOM.div({ className: 'clearfix' }, [
                    React.createElement(Dropzone, dropzoneAttributes, [
                        React.DOM.div(null, 'Drop files here, or click to select files')
                    ]),
                    React.DOM.div({ className: 'input-group ' + ((isAutoUpload) ? 'hidden' : '') }, [
                        React.DOM.input({ type: "text", className: inputClasses.join(' '), readOnly: true, value: this.state.fileNames.join(' ') }),
                        React.DOM.span({ className: 'input-group-btn'},
                            React.DOM.button(buttonAttributes, this.props.uploadCaption)
                        )
                    ])
                ]),
                React.DOM.div({ className: 'progress files-progress ' + ((this.state.isProgressVisible) ? '' : 'hidden') },
                    React.DOM.div({ className: progressClasses.join(' '), style: { width: progress } })
                ),
                outcomeButtons
            ]);

        }

    });

    manywho.component.register("file-upload", fileUpload, ['file_upload']);

}(manywho));
