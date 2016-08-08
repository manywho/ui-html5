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
/// <reference path="../interfaces/IItemsComponentProps.ts" />

declare var manywho : any;
declare var Select: any;

interface IDropDownState {
    options: Array<any>,
    search: string
}

class DropDown extends React.Component<IItemsComponentProps, IDropDownState> {

    constructor(props) {
        super(props);

        this.state = { options: [], search: null }

        this.getOptions = this.getOptions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.isScrollLimit = this.isScrollLimit.bind(this);
    }

    getOptions(objectData) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const columnTypeElementPropertyId = manywho.component.getDisplayColumns(model.columns)[0].typeElementPropertyId;
    
        return objectData.map((item) => {
            var label = item.properties.filter(function (value) { return manywho.utils.isEqual(value.typeElementPropertyId, columnTypeElementPropertyId, true) })[0];
            return { value: item.externalId, label: label.contentValue };
        });
    }

    onChange(value, selectedValues) {
        if (selectedValues && selectedValues.length > 0)
            this.props.select(selectedValues[selectedValues.length -1].value);
        else
            this.props.clearSelection();
    }

    onInputChange(value) {
    	this.props.onSearch(value, false);
    }

    onOpen() {
        setTimeout(() => {
            const selectMenu = ReactDOM.findDOMNode(this.refs['select']).querySelector('.Select-menu');

            if (selectMenu) {
                selectMenu.removeEventListener('scroll', this.isScrollLimit);
                selectMenu.addEventListener('scroll', this.isScrollLimit);
            }
        });
    }

    isScrollLimit(e) {
        if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight && this.props.hasMoreResults)
            this.props.onNext();
    }

    componentWillReceiveProps(nextProps) {
        const state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        if (nextProps.objectData && !nextProps.isDesignTime) {
            if (this.state.options.length < nextProps.limit * nextProps.page)
                this.setState({ options: this.state.options.concat(this.getOptions(nextProps.objectData)), search: state.search });
            else
                this.setState({ options: this.getOptions(nextProps.objectData), search: state.search });

            if (!manywho.utils.isNullOrWhitespace(state.search))
               setTimeout(() => (this.refs['select'] as any).setState({ placeholder: null }));
        }
    }

    componentWillMount() {
        if (this.props.objectData && !this.props.isDesignTime)
            this.setState({ options: this.getOptions(this.props.objectData ), search: null });
    }

    render() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);

        manywho.log.info(`Rendering Select: ${this.props.id}, ${model.developerName}`);
        
        const state = this.props.isDesignTime ? { error: null, loading: false } : manywho.state.getComponent(this.props.id, this.props.flowKey);

        let options = null;
        let value = null;
        let refreshButton = null;

        let props: any = {
            multi: model.isMultiSelect,
            disabled: !model.isEnabled || !model.isEditable || (state && state.loading) || this.props.isDesignTime,
            placeholder: model.hintValue || 'Please select an option',
            inputProps: {
                value: this.state.search
            },
            isLoading: state.loading
        };

        if (this.props.objectData && !this.props.isDesignTime) {
            props.onChange = this.onChange;
            props.onInputChange = this.onInputChange;
            props.onFocus = this.onOpen;

            if (state && state.objectData)
                value = state.objectData.map((item) => item.externalId);
            else
                value = this.props.objectData.filter((item) => item.isSelected)
                                        .map((item) => item.externalId);

            if (value && value.length > 0)
                value = value.filter((item) => {
                    return this.state.options.filter((option) => item == option.value).length > 0;
                })

            props.options = this.state.options;
            props.value = value;
        }

        if (this.state.search && this.state.search !== "") {
            props.placeholder = null;
            props.inputProps.placeholder = null;
        }
        
        const outcomeButtons = this.props.outcomes && this.props.outcomes.map((outcome) => React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey }));

        let containerClassName = manywho.styling.getClasses(this.props.parentId, this.props.id, 'select', this.props.flowKey).join(' ');
        containerClassName += ' form-group';

        if (model.isVisible === false)
            containerClassName += ' hidden';

        if ((typeof model.isValid !== 'undefined' && model.isValid == false) || (state.error))
            containerClassName += ' has-error';

        let wrapperClassName = 'select-wrapper';

        if (model.objectDataRequest || model.fileDataRequest) {
            wrapperClassName += ' input-group';
            let iconClassName = 'glyphicon glyphicon-refresh';

            if (state.loading && !state.error)
                iconClassName += ' spin';

            refreshButton = <button className="btn btn-default refresh-button" onClick={this.props.refresh} disabled={!!state.loading}>
                <span className={iconClassName}></span>
            </button>
        }

        let style: any = {}
        
        if (model.width && model.width > 0) {
            style.width = model.width + 'px';
            style.minWidth = style.width;
        }

        return <div className={containerClassName} id={this.props.id}>
            <label>
                {model.label}
                {(model.isRequired) ? <span className="input-required"> *</span> : null}
            </label>
            <div className={wrapperClassName} style={style}>
                <Select {...props} ref="select"></Select>
                {refreshButton}
            </div>
            <span className="help-block">{state.error && state.error.message}</span>
            <span className="help-block">{model.helpInfo}</span>
            {outcomeButtons}
        </div>
    }
}

manywho.component.register('mw-select', DropDown);
