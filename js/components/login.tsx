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

/// <reference path="../../typings/index.d.ts" />

declare var manywho: any;

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

        handleUsernameChange: function(e) {
            this.setState({ username: e.target.value });
        },

        handlePasswordChange: function(e) {
            this.setState({ password: e.target.value });
        },

        onEnter: function (e) {
            if (e.keyCode && e.keyCode == 13)
                this.onSubmit();
        },

        dismiss: function (e) {
            this.setState({ faults: null });
        },

        onSubmit: function() {
            let newState: any = {};

            if (!manywho.utils.isNullOrWhitespace(this.state.username) && !manywho.utils.isNullOrWhitespace(this.state.password)) {
                this.setState({ loading: { message: '' } });
                
                manywho.ajax.login(this.props.loginUrl, this.state.username, this.state.password, null, null, this.props.stateId, manywho.utils.extractTenantId(this.props.flowKey))
                    .then((response) => {
                        manywho.state.setLogin(null, this.props.flowKey);
                        manywho.authorization.setAuthenticationToken(response, this.props.flowKey);

                        if (this.props.callback)
                            this.props.callback.execute.apply(undefined, [this.props.callback].concat(this.props.callback.args))

                        this.setState({ loading: null });
                    })
                    .fail((error) => {
                        this.setState({
                            loading: null,
                            password: null,
                            faults: error.responseText
                        });
                    });
            }
            else {
                if (manywho.utils.isNullOrWhitespace(this.state.username))
                    this.setState({ usernameError: 'This field is required.' });

                if (manywho.utils.isNullOrWhitespace(this.state.password))
                     this.setState({ passwordError: 'This field is required.' });
            }
        },

        componentDidMount: function() {
            if (this.refs.username) {
                this.refs.username.focus();

                if (this.props.username)
                    this.refs.username.setSelectionRange(0, this.props.username.length);
            }
        },

        render: function () {
            manywho.log.info("Rendering Login");
            
            let faults = null;
            if (this.state.faults)
                faults = <ul className="center-notifications notifications">
                    <li>
                        <div className="notification alert alert-danger">
                            <button className="close" onClick={this.dismiss}><span>{'\u00D7'}</span></button>
                            <span>{this.state.faults}</span>
                        </div>
                    </li>
                </ul>

            let usernameClassName = 'form-group';
            let passwordClassName = 'form-group';

            if (!manywho.utils.isNullOrWhitespace(this.state.usernameError))
                usernameClassName += ' has-error';

            if (!manywho.utils.isNullOrWhitespace(this.state.passwordError))
                passwordClassName += ' has-error';

            return <div>
                <div className="modal-backdrop full-height"></div>
                <div className="modal show">
                    <div className="modal-dialog" onKeyUp={this.onEnter}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Login</h4>
                            </div>
                            <div className="modal-body">
                                <p>Directory: <strong>{this.props.directoryName}</strong></p>
                                <div className={usernameClassName}>
                                    <label>Username <span className="input-required"> *</span></label>
                                    <input type="text" maxLength={255} size={60} className="form-control" ref="username" value={this.state.username} onChange={this.handleUsernameChange} id="mw-username" />
                                    <span className="help-block">{this.state.usernameError}</span>
                                </div>
                                <div className={passwordClassName}>
                                    <label>Password <span className="input-required"> *</span></label>
                                    <input type="password" maxLength={255} size={60} className="form-control" value={this.state.password} onChange={this.handlePasswordChange} id="mw-password" />
                                    <span className="help-block">{this.state.passwordError}</span>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={this.onSubmit}>Login</button>
                            </div>
                            {React.createElement(manywho.component.getByName('wait'), { isVisible: this.state.loading, message: this.state.loading && this.state.loading.message }, null)}
                            {faults}
                        </div>
                    </div>
                </div>
            </div>
        }
    });

    manywho.component.register("mw-login", login, ["mw_login"]);

}(manywho));
