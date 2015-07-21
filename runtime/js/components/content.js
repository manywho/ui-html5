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

(function (manywho, window) {

    var content = React.createClass({

        changeInterval: null,
        skipSetContent: false,
        editor: null,

        initializeEditor: function() {
            
            var self = this;
            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);

            tinymce.init({
                selector: 'textarea#' + this.props.id,
                plugins: manywho.settings.global('richtext.plugins', this.props.flowKey, []),
                width: model.width * 19, // Multiply the width by a "best guess" font-size as the manywho width is columns and tinymce width is pixels
                height: model.height * 16, // Do the same for the height
                readonly: !model.isEditable,
                toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link mwimage',

                setup: function (editor) {

                    self.editor = editor;

                    editor.addButton('mwimage', {
                        title: 'Images',
                        image: 'img/example.gif',
                        onclick: function () {

                            self.setState({ isImageUploadOpen: true });
                            self.render();

                        }

                    });

                    editor.on('init', function () {

                         this.getDoc().body.style.fontSize = manywho.settings.global('richtext.fontsize', self.props.flowKey, '13px');

                     });

                 }
            });

            this.changeInterval = window.setInterval(this.handleChange, 1000);

            this.setState({ isInitialized: true });

        },

        statics: {
            isLoadingTinyMce: false,

            loadTinyMce: function (callback) {

                manywho.component.getByName('content').isLoadingTinyMce = true;

                var script = document.createElement('script');
                script.src = manywho.settings.global('richtext.url');

                script.onload = function () {

                    manywho.component.getByName('content').isLoadingTinyMce = false;
                    callback.apply();

                };

                window.document.body.appendChild(script);

            }

        },

        getInitialState: function() {

            return {
                isInitialized: false,
                isImageUploadOpen: false
            }

        },

        componentDidMount: function () {

            var self = this;

            if (!window.tinymce) {
                
                var component = manywho.component.getByName('content');

                if (!component.isLoadingTinyMce) {
                                        
                    component.loadTinyMce(function () {

                        self.initializeEditor();

                    });

                }
                else {

                    var loaderInterval = setInterval(function () {

                        if (window.tinymce) {

                            self.initializeEditor();
                            clearInterval(loaderInterval);

                        }

                    }, 50);

                }

            }
            else {

                self.initializeEditor();

            }

        },

        componentWillUnmount: function () {

            if (this.state.isInitialized && this.editor) {

                tinymce.remove('textarea#' + this.props.id);

            }

            window.clearInterval(this.changeInterval);

        },
        
        handleChange: function (e) {

            if (this.state.isInitialized && this.editor) {

                var content = this.editor.getContent();
                var state = manywho.state.getComponent(this.props.id, this.props.flowKey);

                if (!manywho.utils.isEqual(content, state.contentValue, false)) {

                    manywho.state.setComponent(this.props.id, { contentValue: content }, this.props.flowKey, true);
                    this.skipSetContent = true;

                    manywho.component.handleEvent(this, manywho.model.getComponent(this.props.id, this.props.flowKey), this.props.flowKey);

                }

            }

        },

        renderFileDialog: function () {

            return React.DOM.div({ className: 'modal show' }, [
                React.DOM.div({ className: 'modal-dialog full-screen', onKeyUp: this.onEnter }, [
                    React.DOM.div({ className: 'modal-content full-screen' }, [
                        React.DOM.div({ className: 'modal-header' }, [
                            React.DOM.h4({ className: 'modal-title' }, 'File Upload')
                        ]),
                        React.DOM.div({ className: 'modal-body' }, [
                            React.createElement(manywho.component.getByName('file-upload'), { flowKey: this.props.flowKey, id: this.props.id, multiple: true, uploadComplete: this.onUploadComplete})
                        ]),
                        React.DOM.div({ className: 'modal-footer' }, [
                            React.DOM.button({ className: 'btn btn-default', onClick: this.onCancel }, 'Cancel')
                        ])
                    ])
                ])
            ]);

        },

        onUploadComplete: function (response) {

            var imageUri = manywho.utils.extractOutputValue(response.objectData[0].properties, 'Download Uri');

            var imageName = manywho.utils.extractOutputValue(response.objectData[0].properties, 'Name');

            if (imageUri != null && imageUri.length > 0) {

                tinymce.activeEditor.execCommand('mceInsertContent', false, '<img src="' + imageUri[0].contentValue + '" alt="' + imageName[0].contentValue + '"/>');

                this.setState({ isImageUploadOpen: false });

            }

        },

        onCancel: function (event) {

            this.setState({ isImageUploadOpen: false });

        },

        render: function () {

            manywho.log.info('Rendering Content: ' + this.props.id);
            
            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);
            var isValid = true;

            var attributes = {
                id: this.props.id,
                placeholder: model.hintValue,
                defaultValue: state.contentValue,
                maxLength: model.maxSize,
                cols: model.width,
                rows: model.height
            };

            if (!model.isEnabled) {
                attributes.disabled = 'disabled';
            }

            if (model.isRequired) {
                attributes.required = '';
            }

            if (!model.isEditable) {
                attributes.readOnly = '';
            }

            if (typeof model.isValid !== 'undefined' && model.isValid == false) {
                isValid = false;
            }

            var classNames = [
                'form-group',
                (model.isVisible && this.state.isInitialized) ? '' : 'hidden',
                (isValid) ? '' : 'has-error'
            ]
            .concat(manywho.styling.getClasses(this.props.parentId, this.props.id, 'content', this.props.flowKey))
            .join(' ');

            if (this.state.isInitialized && state.contentValue && state.contentValue.length > 0 && !this.skipSetContent) {

                tinymce.get(this.props.id).setContent(state.contentValue);
                this.skipSetContent = false;

            }

            var childElements = [React.DOM.label({ htmlFor: this.props.id }, [
                    model.label,
                    (model.isRequired) ? React.DOM.span({ className: 'input-required' }, ' *') : null
                ]),
                React.DOM.textarea(attributes, null),
                React.DOM.span({ className: 'help-block' }, model.message)];

            if (this.state.isImageUploadOpen) {

                childElements.push(this.renderFileDialog());

            }

            return React.DOM.div({ className: classNames }, childElements);
            
        }

    });

    manywho.component.register('content', content);

}(manywho, window));