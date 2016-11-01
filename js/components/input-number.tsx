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
declare var $: any;
declare var moment: any;

interface IInputNumberState {
    value: string
}

class InputNumber extends React.Component<IInputProps, IInputNumberState> {

    constructor(props: IInputProps){
        super(props);

        this.state = { value: null };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ value: e.target.value });

        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        let value = e.target.value.replace(/^\s+|\s+$/g, '');
        let parsedValue = parseFloat(value);
        
        if (manywho.utils.isNullOrWhitespace(value))
            this.props.onChange(null);
        else if (!isNaN(value)) {
            const max = (Math.pow(10, model.maxSize)) - 1;
            const min = (Math.pow(10, model.maxSize) * - 1) + 1;

            parsedValue = Math.min(parsedValue, max);
            parsedValue = Math.max(parsedValue, min);
            
            manywho.state.setComponent(this.props.id, { isValid: true }, this.props.flowKey, true);
            this.props.onChange(parsedValue);
        }
        else if (isNaN(value) && !manywho.utils.isNullOrWhitespace(value))
            manywho.state.setComponent(this.props.id, { isValid: false }, this.props.flowKey, true);
    }

    componentWillMount() {
        this.setState({ value: this.props.value ? this.props.value.toString() : null });
    }

    render() {   
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);

        const style = { width: 30 + (15 * model.size) + "px !important" };
        let max = (Math.pow(10, Math.min(model.maxSize, 17))) - 1;
        let min = (Math.pow(10, Math.min(model.maxSize, 17)) * -1) + 1;
        let step = 1;

        if (model.attributes) {
            if (!manywho.utils.isNullOrUndefined(model.attributes.minimum))
                min = model.attributes.minimum;

            if (!manywho.utils.isNullOrUndefined(model.attributes.maximum))
                max = model.attributes.maximum;

            if (!manywho.utils.isNullOrUndefined(model.attributes.step))
                step = model.attributes.step;
        }

        return <input id={this.props.id}
                    value={this.state.value}
                    className="form-control"
                    type="number"
                    style={style}
                    max={max}
                    min={min}
                    step={step}
                    readOnly={this.props.readOnly}
                    disabled={this.props.disabled}
                    required={this.props.required}
                    onChange={this.onChange}
                    onBlur={this.props.onBlur} />
    }

}

manywho.component.register('input-number', InputNumber);
