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

    var login = React.createClass({

        getInitialState: function() {
            return {
                username: this.props.username || '',
                password: '',
                usernameError: '',
                passwordError: '',
                loading: null,
                faults: null
            }
        },

        handleChange: function(name, e) {

            var newState = this.state;

            newState[name] = e.target.value;

            this.setState(newState);

        },

        onEnter: function (e) {

            if (e.keyCode && e.keyCode == 13) {

                this.onSubmit();

            }

        },

        dismiss: function (e) {

            this.setState({ faults: null });

        },

        onSubmit: function() {

            var newState = this.state;

            if (!manywho.utils.isNullOrWhitespace(this.state.username) && !manywho.utils.isNullOrWhitespace(this.state.password)) {

                newState.loading = { message: '' };
                newState.usernameError = '';
                newState.passwordError = '';

                var self = this;

                if (manywho.utils.isEqual(this.props.api, 'run', true)) {

                    manywho.ajax.login(this.props.loginUrl, this.state.username, this.state.password, null, null, this.props.stateId, manywho.utils.extractTenantId(this.props.flowKey))
                        .then(function (response) {

                            var newState = self.state;

                            newState.loading = null;

                            manywho.state.setLogin(null, self.props.flowKey);

                            manywho.authorization.setAuthenticationToken(response, self.props.flowKey);

                            if (self.props.callback) {

                                self.props.callback.execute.apply(undefined, [self.props.callback].concat(self.props.callback.args))

                            }

                            self.setState(newState);

                        }).fail(function (error) {

                        var newState = self.state;

                        newState.loading = null;
                        newState.password = '';
                        newState.faults = error.responseText;

                        self.setState(newState);

                    });

                } else if (manywho.utils.isEqual(this.props.api, 'draw', true)) {

                    var authenticationData = {
                        loginUrl: this.props.loginUrl,
                        username: this.state.username,
                        password: this.state.password
                    };

                    manywho.ajax.builderLogin(authenticationData)
                        .then(function (response) {

                            var newState = self.state;

                            newState.loading = null;

                            if (self.props.callback) {

                                self.props.callback.call(this, response);

                            }

                            localStorage.setItem('manywho-draw-login-username', self.state.username);
                            
                            if (this._isMounted)
                                self.setState(newstate);
                            
                        }).fail(function (error) {

                        var newState = self.state;

                        newState.loading = null;
                        newState.password = '';
                        self.refs.password.value = '';
                        newState.faults = error.responseText;

                        self.setState(newState);

                    });

                }

            } else {

                newState.usernameError = '';
                newState.passwordError = '';

                if (manywho.utils.isNullOrWhitespace(this.state.username)) {

                    newState.usernameError = 'This field is required.';

                }

                if (manywho.utils.isNullOrWhitespace(this.state.password)) {

                    newState.passwordError = 'This field is required.';

                }

            }

            this.setState(newState);

        },

        componentDidMount: function() {

            if (this.refs.username) {

                this.refs.username.focus();

                if (this.props.username)
                    this.refs.username.setSelectionRange(0, this.props.username.length);

            }

            this._isMounted = true;
        },
        
        componentWillUnmount: function() {
            this._isMounted = false;  
        },

        renderForm: function() {

            var usernameFormClasses = ['form-group', 'has-outcomes', 'pull-left', 'mw-input'];
            var passwordFormClasses = ['form-group', 'has-outcomes', 'pull-left', 'mw-input'];

            if (!manywho.utils.isNullOrWhitespace(this.state.usernameError))
                usernameFormClasses.push('has-error');

            if (!manywho.utils.isNullOrWhitespace(this.state.passwordError))
                passwordFormClasses.push('has-error');

            return React.DOM.div({ className: 'mw-vertical_flow mw-container clearfix'}, [
                React.DOM.div({ className: 'mw-inline_flow mw-container clearfix'},
                    React.DOM.div({ className: 'pull-left mw-presentation'},
                        React.DOM.span({}, ['Directory: ', React.DOM.strong({}, this.props.directoryName)])
                    )
                ),
                React.DOM.div({ className: 'mw-inline_flow mw-container clearfix'},
                    React.DOM.div({ className: 'clearfix' },
                        React.DOM.div({ className: usernameFormClasses.join(' ') }, [
                            React.DOM.label({ htmlFor: 'mw-username' }, [
                                React.DOM.span({}, 'Username'),
                                React.DOM.span({ className: 'input-required'}, ' *')
                            ]),
                            React.DOM.input({ type: 'text', id: 'mw-username', defaultValue: this.state.username, maxLength: '255', size: '60', className: 'form-control', ref: 'username', onChange: this.handleChange.bind(null, 'username') }),
                            React.DOM.span({ className: 'help-block' }, this.state.usernameError)
                        ])
                    )
                ),
                React.DOM.div({ className: 'mw-inline_flow mw-container clearfix'}, [
                    React.DOM.div({ className: 'clearfix' }, [
                        React.DOM.div({ className: passwordFormClasses.join(' ')}, [
                            React.DOM.label({ htmlFor: 'mw-password' }, [
                                React.DOM.span({}, 'Password'),
                                React.DOM.span({ className: 'input-required'}, ' *')
                            ]),
                            React.DOM.input({ type: 'password', id: 'mw-password', defaultValue: this.state.password, maxLength: '255', size: '25', className: 'form-control', ref: 'password', onChange: this.handleChange.bind(null, 'password') }),
                            React.DOM.span({ className: 'help-block' }, this.state.passwordError)
                        ])
                    ])
                ])
            ])

        },

        renderModal: function() {

            var faults = this.state.faults &&
                React.DOM.ul({ className: 'center-notifications notifications' }, [
                    React.DOM.li({}, [
                        React.DOM.div({ className: 'alert notification alert-danger' }, [
                            React.DOM.button({ className: 'close', onClick: this.dismiss }, React.DOM.span(null, '\u00D7')),
                            React.DOM.span(null, this.state.faults)
                        ])
                    ])
                ]);

            return React.DOM.div({ className: 'modal show' }, [
                React.DOM.div({ className: 'modal-dialog', onKeyUp: this.onEnter }, [
                    React.DOM.div({ className: 'modal-content' }, [
                        React.DOM.div({ className: 'modal-header' },
                            React.DOM.h4({ className: 'modal-title' }, 'Login')
                        ),
                        React.DOM.div({ className: 'modal-body' }, [
                            this.renderForm()
                        ]),
                        React.DOM.div({ className: 'modal-footer' },
                            React.DOM.button({ className: 'btn btn-primary', onClick: this.onSubmit }, 'Login')
                        ),
                        React.createElement(manywho.component.getByName('wait'), { isVisible: this.state.loading, message: this.state.loading && this.state.loading.message }, null),
                        faults
                    ])
                ])
            ]);

        },

        renderBackdrop: function(modal) {

            return React.DOM.div(null, [
                React.DOM.div({ className: 'modal-backdrop full-height' }, null),
                modal
            ]);

        },

        render: function () {

            manywho.log.info("Rendering Login");

            return this.renderBackdrop(this.renderModal());

        }

    });

    manywho.component.register("mw-login", login, ["mw_login"]);

}(manywho));
