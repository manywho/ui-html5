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
    search: string,
    isFocused: boolean
}

class DropDown extends React.Component<IItemsComponentProps, IDropDownState> {

    debouncedOnSearch = null;

    constructor(props) {
        super(props);

        this.state = { options: [], search: null, isFocused: false }

        this.getOptions = this.getOptions.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.isScrollLimit = this.isScrollLimit.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.debouncedOnSearch = manywho.utils.debounce(this.onSearch, 800);
    }

    getOptions(objectData) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const columnTypeElementPropertyId = manywho.component.getDisplayColumns(model.columns)[0].typeElementPropertyId;
    
        return objectData.map((item) => {
            var label = item.properties.filter(function (value) { return manywho.utils.isEqual(value.typeElementPropertyId, columnTypeElementPropertyId, true) })[0];
            return { value: item, label: label.contentValue };
        });
    }

    updateOptions(objectData, limit, page, isDesignTime) {
        if (objectData && !isDesignTime) {
            if (page > 1 && this.state.options.length < limit * page)
                this.setState({ options: this.state.options.concat(this.getOptions(objectData)), search: this.state.search, isFocused: this.state.isFocused });
            else
                this.setState({ options: this.getOptions(objectData), search: this.state.search, isFocused: this.state.isFocused });
        }
    }

    onChange(selectedValues) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);

        if (model.isMultiSelect && selectedValues && selectedValues.length > 0)
            this.props.select(selectedValues[selectedValues.length -1].value, true)
        else if (!model.isMultiSelect && selectedValues)
            this.props.select(selectedValues.value, true);
        else
            this.props.clearSelection(true);

        manywho.component.handleEvent(this, model, this.props.flowKey);
        
        setTimeout(() => {
            this.setState({ search: null, options: this.state.options, isFocused: this.state.isFocused })

            if (!manywho.utils.isNullOrWhitespace(this.state.search) || model.objectDataRequest || model.fileDataRequest)
                this.props.onSearch(null, false);
        });
    }

    onInputChange(value) {
        this.setState({ options: this.state.options, search: value, isFocused: this.state.isFocused });

        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);

        if (model.objectDataRequest || model.fileDataRequest)
            this.debouncedOnSearch(value);
        else
            setTimeout(() => this.onSearch(value));
    }

    onSearch(search: string) {
        this.props.onSearch(search, false);
    }

    onFocus(e) {
        this.setState({ options: this.state.options, search: this.state.search, isFocused: true });

        setTimeout(() => {
            const selectMenu = ReactDOM.findDOMNode(this.refs['select']).querySelector('.Select-menu');

            if (selectMenu) {
                selectMenu.removeEventListener('scroll', this.isScrollLimit);
                selectMenu.addEventListener('scroll', this.isScrollLimit);
            }
        });
    }

    onBlur(e) {
        this.setState({ options: this.state.options, search: this.state.search, isFocused: false });
    }

    isScrollLimit(e) {
        if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight && this.props.hasMoreResults) {
            this.props.onNext();
            (this.refs['select'] as any).setState({ isOpen: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        if (!model.objectDataRequest && !model.fileDataRequest)
            this.updateOptions(nextProps.objectData, nextProps.limit, nextProps.page, nextProps.isDesignTime);

        if (this.props.isLoading && !nextProps.isLoading) {
            this.updateOptions(nextProps.objectData, nextProps.limit, nextProps.page, nextProps.isDesignTime);

            if (!manywho.utils.isNullOrWhitespace(this.state.search)) {
                setTimeout(() => {
                    (this.refs['select'] as any).setState({ isOpen: true });

                    const inputElement: HTMLInputElement = ReactDOM.findDOMNode(this.refs['select'] as any).querySelector('input') as HTMLInputElement;
                    inputElement.setSelectionRange(this.state.search.length, this.state.search.length);                
                });
            }

            if (this.state.isFocused) {
                setTimeout(() => {
                    (this.refs['select'] as any).setState({ isOpen: true })
                    (this.refs['select'] as any).focus()
                });   
            }
        } 
    }

    componentWillMount() {
        if (this.props.objectData && !this.props.isDesignTime)
            this.setState({ options: this.getOptions(this.props.objectData ), search: this.state.search, isFocused: this.state.isFocused });
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
            placeholder: 'Please select an option'
        };

        if (!manywho.utils.isNullOrWhitespace(model.hintValue))
            props.placeholder = model.hintValue;

        if (this.state.search)
            props.placeholder = null;

        if (this.props.objectData && !this.props.isDesignTime) {
            props.onChange = this.onChange;
            props.onFocus = this.onFocus;
            props.onBlur = this.onBlur;
            props.isLoading = (state && (state.loading !== null && typeof state.loading !== 'undefined'))
            props.onInputChange = this.onInputChange;
            props.filterOptions = false;
            props.inputProps = { value: this.state.search };
            props.openOnFocus = false;

            if (state && state.objectData && state.objectData.length > 0)
                value = this.getOptions(state.objectData);
            else
                value = this.getOptions(this.props.objectData.filter((item) => item.isSelected));

            if (value && value.length > 0) {
                if (!model.isMultiSelect)
                    value = value[0];
            }
            else
                value = null;

            props.options = this.state.options;
            props.value = value;

            if (model.objectDataRequest || model.fileDataRequest)
                props.openOnInputChange = false;
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
