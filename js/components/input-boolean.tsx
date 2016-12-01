/*!
Copyright 2016 ManyWho, Inc.
Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
file except in compliance with the License.
You may obtain a copy of the License at: http://manywho.com/sharedsource
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/

/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IInputProps.ts" />

declare var manywho: any;
declare var moment: any;

interface IInputBooleanState {
    value: string
}

class InputBoolean extends React.Component<IInputProps, IInputBooleanState> {

    constructor(props: IInputProps){
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onChange(e.target.checked);
    }

    render() {   
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const checked = (typeof this.props.value == "string" && manywho.utils.isEqual(this.props.value, "true", true)) || this.props.value === true;

        return <div className="checkbox">
            <label>
                <input id={this.props.id}
                        checked={checked}
                        type="checkbox"
                        disabled={this.props.disabled || this.props.readOnly}
                        required={this.props.required}
                        onChange={!this.props.isDesignTime && this.onChange} />
                {model.label}
                {model.isRequired ? <span className="input-required"> *</span> : null}
            </label>
        </div>
    }

}

manywho.component.register('input-boolean', InputBoolean);
