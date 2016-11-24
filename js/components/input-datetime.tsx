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

interface IInputDateTimeState {
    value: string
}

class InputDateTime extends React.Component<IInputProps, IInputDateTimeState> {

    constructor(props: IInputProps){
        super(props);

        this.state = { value: null };

        this.onChange = this.onChange.bind(this);
    }

    isEmptyDate(date) {
        if (date == null
            || date.indexOf('01/01/0001') != -1
            || date.indexOf('1/1/0001') != -1
            || date.indexOf('0001-01-01') != -1)
            return true;

        return false;
    }

    onChange(e) {
        if (!e.date)
            this.props.onChange(null)
        else if (e.date.isValid())
            this.props.onChange(e.date.format());
        else
            this.props.onChange(e.target.value);
    }

    componentDidMount() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        let stateDate = null;
        const datepickerElement = ReactDOM.findDOMNode(this.refs['datepicker']);

        $(datepickerElement).datetimepicker({
            locale: model.attributes.dateTimeLocale || 'en-us',
            format: model.attributes.dateTimeFormat || manywho.formatting.toMomentFormat(model.contentFormat) || 'MM/DD/YYYY'
        })
        .on('dp.change', this.onChange);

        if (this.isEmptyDate(state.contentValue))
            manywho.state.setComponent(this.props.id, { contentValue: null }, this.props.flowKey, true);
        else {
            stateDate = moment(state.contentValue, ['MM/DD/YYYY hh:mm:ss A ZZ', 'YYYY-MM-DDTHH:mm:ss.SSSSSSSZ', moment.ISO_8601]);
            stateDate.utcOffset(state.contentValue);

            manywho.state.setComponent(this.props.id, { contentValue: stateDate.format() }, this.props.flowKey, true);
            $(datepickerElement).data("DateTimePicker").date(stateDate);
        }
    }

    componentWillUnmount () {
        if (this.refs['datepicker'])
            $(ReactDOM.findDOMNode(this.refs['datepicker'])).data('DateTimePicker').destroy();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value === null) {
            this.setState({ value: null });
            return;
        }

        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const formats = [moment.ISO_8601, 'MM/DD/YYYY hh:mm:ss A ZZ'];
        let customFormat = null;

        if (model.attributes && model.attributes.dateTimeFormat) {
            customFormat = model.attributes.dateTimeFormat;
            formats.push(customFormat);
        }        

        const dateTime = moment(nextProps.value, formats);
        dateTime.utcOffset(nextProps.value);

        if (dateTime.isValid())
            this.setState({ value: dateTime.format(customFormat || 'MM/DD/YYYY') });
    }

    render() {       
        return <input id={this.props.id}
                        value={this.state.value}
                        className="form-control datepicker"
                        ref="datepicker"
                        type="datetime"
                        size={this.props.size}
                        readOnly={this.props.readOnly}
                        disabled={this.props.disabled}
                        required={this.props.required}
                        onBlur={this.props.onBlur} />
    }

}

manywho.component.register('input-datetime', InputDateTime);
