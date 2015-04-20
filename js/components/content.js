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
                setup: function (editor) {

                    self.editor = editor;

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
                isInitialized: false
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

        render: function () {

            log.info('Rendering Content: ' + this.props.id);
            
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

            return React.DOM.div({ className: classNames }, [
                React.DOM.label({ htmlFor: this.props.id }, [
                    model.label,
                    (model.isRequired) ? React.DOM.span({ className: 'input-required' }, ' *') : null
                ]),
                React.DOM.textarea(attributes, null),
                React.DOM.span({ className: 'help-block' }, model.message)
            ]);
            
        }

    });

    manywho.component.register('content', content);

}(manywho, window));