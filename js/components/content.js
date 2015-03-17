(function (manywho, window) {

    var content = React.createClass({

        changeInterval: null,
        skipSetContent: false,

        initializeEditor: function() {
            
            var self = this;
            var model = manywho.model.getComponent(this.props.id, this.props.flowKey);

             var test = tinymce.init({
                selector: 'textarea#' + this.props.id,
                width: model.width,
                height: model.height,
                plugins: manywho.settings.global('richtext.plugins', this.props.flowKey, []),
                setup: function (editor) {

                    editor.on('init', function () {

                         this.getDoc().body.style.fontSize = manywho.settings.global('richtext.fontsize', self.props.flowKey, '13px');

                     });

                 }
            });

            this.changeInterval = window.setInterval(this.handleChange, 1000);

            this.setState({ isInitialized: true });

        },

        getInitialState: function() {

            return {
                isInitialized: false
            }

        },

        componentDidMount: function () {

            if (!window.tinymce) {

                var self = this;
                var script = document.createElement('script');
                script.src = manywho.settings.global('richtext.url');

                script.onload = function () {

                    self.initializeEditor();

                }

                window.document.body.appendChild(script);

            }
            else {

                self.initializeEditor();

            }

        },

        componentWillUnmount: function () {

            if (this.refs.editor) {

                tinymce.remove('textarea#' + this.props.id);

            }

            window.clearInterval(this.changeInterval);

        },
        
        handleChange: function (e) {

            var content = tinymce.get(this.props.id).getContent();
            var state = manywho.state.getComponent(this.props.id, this.props.flowKey);

            if (!manywho.utils.isEqual(content, state.contentValue, false)) {

                manywho.state.setComponent(this.props.id, { contentValue: content }, this.props.flowKey, true);
                this.skipSetContent = true;

                manywho.component.handleEvent(this, manywho.model.getComponent(this.props.id, this.props.flowKey), this.props.flowKey);

            }

        },

        render: function () {

            log.info('Rendering Vertical: ' + this.props.id);
            
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