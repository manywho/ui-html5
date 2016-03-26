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

            tinymce.PluginManager.add('manywho_elements', function (editor, url) {

                editor.addButton('manywho_elements', {
                    text: 'Insert Reference',
                    icon: false,
                    onclick: function () {

                        var tenantId = manywho.utils.getObjectDataProperty(model.tags, 'ManyWhoTenantId').contentValue;
                        var authenticationToken = manywho.utils.getObjectDataProperty(model.tags, 'AuthenticationToken').contentValue;

                        manywho.ajax.getValueReferences(tenantId, authenticationToken).then(function(response) {
                            var items = response.map(function(item) {
                                if (item.typeElementPropertyDeveloperName) {
                                    return { text: item.developerName + ' / ' + item.typeElementPropertyDeveloperName, value: '{![' + item.developerName + '].[' + item.typeElementPropertyDeveloperName + ']}'};
                                } else {
                                    return { text: item.developerName, value: '{![' + item.developerName + ']}'};
                                }
                            });

                            items.unshift({ text: 'Please select reference value', value: '' });

                            editor.windowManager.open({
                                title: 'Add Reference to a Value',
                                body: [
                                    {
                                        type: 'listbox',
                                        name: 'reference',
                                        label: 'Reference',
                                        values: items
                                    }
                                ],
                                onsubmit: function (e) {
                                    // Insert content when the window form is submitted
                                    editor.insertContent(e.data.reference);
                                }
                            });
                        });
                    }
                });
            });

            tinymce.init({
                selector: 'textarea#' + this.props.id,
                plugins: manywho.settings.global('richtext.plugins', this.props.flowKey, []),
                width: model.width * 19, // Multiply the width by a "best guess" font-size as the manywho width is columns and tinymce width is pixels
                height: model.height * 16, // Do the same for the height
                readonly: !model.isEditable,
                menubar: 'edit insert view format table tools',
                toolbar: manywho.settings.global('richtext.toolbar', this.props.flowKey, []),

                setup: function (editor) {

                    self.editor = editor;

                    if (!self.props.isDesignTime) {

                        editor.addButton('mwimage', {
                            title: 'Images',
                            icon: 'image',
                            onclick: function () {

                                self.setState({ isImageUploadOpen: true });
                                self.render();

                            }

                        });

                        editor.on('change', self.handleChange);

                        if (model.hasEvents) {
                            editor.on('blur', self.handleEvent);
                        }

                    }

                    editor.on('init', function () {

                         this.getDoc().body.style.fontSize = manywho.settings.global('richtext.fontsize', self.props.flowKey, '13px');

                     });
                 }
            });

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

                }

            }

        },

        handleEvent: function (e) {

            manywho.component.handleEvent(this, manywho.model.getComponent(this.props.id, this.props.flowKey), this.props.flowKey);

        },

        renderFileDialog: function () {

            var tableAttributes = {
                flowKey: this.props.flowKey,
                id: this.props.id,
                selectionEnabled: true
            };

            var uploadAttributes = {
                flowKey: this.props.flowKey,
                id: this.props.id,
                multiple: true
            };

            if (!this.props.isDesignTime) {
                tableAttributes = manywho.utils.extend(tableAttributes,  { onRowClicked: this.onFileTableRowClicked });
                uploadAttributes = manywho.utils.extend(tableAttributes,  { uploadComplete: this.onUploadComplete });
            }

            return React.DOM.div({ className: 'modal show' }, [
                React.DOM.div({ className: 'modal-dialog full-screen', onKeyUp: this.onEnter }, [
                    React.DOM.div({ className: 'modal-content full-screen' }, [
                        React.DOM.div({ className: 'modal-body' }, [
                            React.DOM.ul({ className: 'nav nav-tabs' }, [
                                React.DOM.li({ className: 'active' }, [
                                    React.DOM.a({ href: '#files', 'data-toggle': 'tab'}, 'File List')
                                ]),
                                React.DOM.li({ className: '' }, [
                                    React.DOM.a({ href: '#upload', 'data-toggle': 'tab'}, 'Direct Upload')
                                ])
                            ]),
                            React.DOM.div({ className: 'tab-content'}, [
                                React.DOM.div({ className: 'tab-pane active', id: 'files'}, [
                                    React.createElement(manywho.component.getByName('table'), tableAttributes)
                                ]),
                                React.DOM.div({  className: 'tab-pane', id: 'upload'}, [
                                    React.createElement(manywho.component.getByName('file-upload'), uploadAttributes)
                                ])
                            ])
                        ]),
                        React.DOM.div({ className: 'modal-footer' }, [
                            React.DOM.button({ className: 'btn btn-default', onClick: this.onFileCancel }, 'Cancel')
                        ])
                    ])
                ])
            ]);

        },

        onUploadComplete: function (response) {

            var imageUri = manywho.utils.getObjectDataProperty(response.objectData[0].properties, 'Download Uri');
            var imageName = manywho.utils.getObjectDataProperty(response.objectData[0].properties, 'Name');

            if (imageUri) {

                tinymce.activeEditor.execCommand('mceInsertContent', false, '<img src="' + imageUri.contentValue + '" alt="' + imageName.contentValue + '"/>');

                this.setState({ isImageUploadOpen: false });

            }

        },

        onFileCancel: function (event) {

            this.setState({ isImageUploadOpen: false });

        },

        onFileTableRowClicked: function (event) {

            var imageUri = event.currentTarget.lastChild.innerText;

            var imageName = event.currentTarget.firstChild.innerText;

            if (imageUri != null && imageUri.length > 0) {

                tinymce.activeEditor.execCommand('mceInsertContent', false, '<img src="' + imageUri + '" alt="' + imageName + '"/>');

                this.setState({ isImageUploadOpen: false });

            }

        },

        render: function () {

            manywho.log.info('Rendering Content: ' + this.props.id);

            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);
            var outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
            var isValid = true;

            if (typeof model.isValid !== 'undefined' && model.isValid == false) {
                isValid = false;
            }

            var attributes = {
                id: this.props.id,
                placeholder: model.hintValue,
                maxLength: model.maxSize,
                cols: model.width,
                rows: model.height
            };

            if (!this.props.isDesignTime && state)
                attributes.defaultValue = state.contentValue;

            if (!model.isEnabled)
                attributes.disabled = 'disabled';

            if (model.isRequired)
                attributes.required = '';

            if (!model.isEditable)
                attributes.readOnly = 'readonly';

            var classNames = [
                'form-group',
                (model.isVisible == false || !this.state.isInitialized) ? 'hidden' : '',
                (isValid) ? '' : 'has-error'
            ]
            .concat(manywho.styling.getClasses(this.props.parentId, this.props.id, 'content', this.props.flowKey))
            .join(' ');

            if (!this.props.isDesignTime && this.state.isInitialized && state.contentValue && state.contentValue.length > 0 && !this.skipSetContent) {

                tinymce.get(this.props.id).setContent(state.contentValue);
                this.skipSetContent = false;

            }

            var childElements = [React.DOM.label({ htmlFor: this.props.id }, [
                    model.label,
                    (model.isRequired) ? React.DOM.span({ className: 'input-required' }, ' *') : null
                ]),
                React.DOM.textarea(attributes, null),
                React.DOM.span({ className: 'help-block' }, model.validationMessage),
                outcomes && outcomes.map(function (outcome) {
                    return React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey });
                }, this)];

            if (this.state.isImageUploadOpen) {

                childElements.push(this.renderFileDialog());

            }

            return React.DOM.div({ className: classNames }, childElements);

        }

    });

    manywho.component.register('content', content);

}(manywho, window));
