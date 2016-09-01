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
declare var reactSelectize: any;

interface IDropDownState {
    options?: Array<any>,
    search?: string,
    isOpen?: boolean
}

class DropDown extends React.Component<IItemsComponentProps, IDropDownState> {

    debouncedOnSearch = null;

    constructor(props) {
        super(props);
        this.state = { options: [], search: '', isOpen: false }

        this.getOptions = this.getOptions.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.onValuesChange = this.onValuesChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onOpenChange = this.onOpenChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.isScrollLimit = this.isScrollLimit.bind(this);

        this.debouncedOnSearch = manywho.utils.debounce(this.props.onSearch, 750);
    }

    getOptions(objectData) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const columns = manywho.component.getDisplayColumns(model.columns);

        if (columns && columns.length > 0) {
            const columnTypeElementPropertyId = columns[0].typeElementPropertyId;

            return objectData.map((item) => {
                var label = item.properties.filter(function (value) { return manywho.utils.isEqual(value.typeElementPropertyId, columnTypeElementPropertyId, true) })[0];
                return { value: item, label: label.contentValue };
            });
        }
    }

    onValueChange(option) {
        if (!this.props.isLoading) {
            if (option)
                this.props.select(option.value);
            else
                this.props.clearSelection();

            this.setState({ isOpen: false });
        }
    }

    onValuesChange(options) {
        if (!this.props.isLoading) {
            if (options.length > 0) {
                const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
                this.props.select(options[options.length -1].value);
            }
            else
                this.props.clearSelection();
        }
    }

    onSearchChange(search) {
        if (!this.props.isLoading && this.state.search != search) {
            this.setState({ search: search });
            this.debouncedOnSearch(search);
        }
    }

    onOpenChange(isOpen) {
        if (!this.props.isLoading)
            this.setState({ isOpen: isOpen });
    }

    onFocus() {
        if (!this.props.isLoading)
            this.setState({ isOpen: true });
    }

    onBlur() {
        this.setState({ isOpen: false });
    }

    filterOptions(options, search) {
        return options;
    }

    getUid(option) {
        return option.value.externalId;
    }

    isScrollLimit(e) {
        if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight && this.props.hasMoreResults)
            this.props.onNext();
    }

    componentWillReceiveProps(nextProps) {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const state = manywho.state.getComponent(this.props.id, this.props.flowKey);

        const doneLoading = this.props.isLoading && !nextProps.isLoading;
        const hasRequest = model.objectDataRequest !== null || model.fileDataRequest !== null;

        if ((doneLoading || !hasRequest) && nextProps.objectData && !nextProps.isDesignTime) {
            let options = []

            if (nextProps.page > 1 && this.state.options.length < nextProps.limit * nextProps.page) {
                options = this.state.options.concat(this.getOptions(nextProps.objectData)),
                this.setState({ isOpen: true });
            }
            else
                options = this.getOptions(nextProps.objectData);

            if (state && state.objectData) {
                const selectedOptions = state.objectData.filter(item => !options.find(option => option.value === item.externalId));
                options = (this.getOptions(selectedOptions) || []).concat(options);
            }

            this.setState({ options: options });
        }

        if (!this.props.isLoading && nextProps.isLoading)
            this.setState({ isOpen: false });

        if (this.props.isLoading && !nextProps.isLoading && !manywho.utils.isNullOrWhitespace(this.state.search))
            this.setState({ isOpen: true });
    }

    componentWillMount() {
        this.setState({ options: this.getOptions(this.props.objectData || [])});
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.isOpen && this.state.isOpen)
            (ReactDOM.findDOMNode(this) as HTMLElement)
                .querySelector('.dropdown-menu')
                .addEventListener('scroll', this.isScrollLimit);
    }

    render() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);

        manywho.log.info(`Rendering Select: ${this.props.id}, ${model.developerName}`);
        
        const state = this.props.isDesignTime ? { error: null, loading: null } : manywho.state.getComponent(this.props.id, this.props.flowKey);
        const props: any = {
            filterOptions: this.filterOptions,
            uid: this.getUid,
            search: this.state.search,
            open: this.state.isOpen,
            theme: 'default',
            placeholder: model.hintValue
        }

        if (!this.props.isDesignTime) {
            props.onValueChange = this.onValueChange;
            props.onValuesChange = this.onValuesChange;
            props.onSearchChange = this.onSearchChange;
            props.onOpenChange = this.onOpenChange;
            props.onBlur = this.onBlur;
            props.onFocus = this.onFocus;
            props.value = null;
            props.options = null;

            if (this.props.objectData) {             

                let externalIds = null;

                if (state && state.objectData)
                    externalIds = state.objectData.map((item) => item.externalId);
                else
                    externalIds = this.props.objectData.filter((item) => item.isSelected)
                                            .map((item) => item.externalId);

                if (externalIds && externalIds.length > 0)
                    props.value = this.state.options.filter(option => externalIds.indexOf(option.value.externalId) !== -1);

                if (!model.isMultiSelect && props.value)
                    props.value = props.value[0];

                if (externalIds && externalIds.length > 0 && model.isMultiSelect)
                    props.options = this.state.options.filter(option => externalIds.indexOf(option.value.externalId) === -1);
                else
                    props.options = this.state.options;
            }
        }

        const selectElement = (model.isMultiSelect) ? <reactSelectize.MultiSelect {...props} /> : <reactSelectize.SimpleSelect {...props} /> 
        
        let refreshButton = null;
        if (model.objectDataRequest || model.fileDataRequest) {
            let className = 'glyphicon glyphicon-refresh';

            if (this.props.isLoading)
                className += ' spin';

            refreshButton = <button className="btn btn-default refresh-button" onClick={this.props.refresh} disabled={this.props.isLoading}>
                <span className={className} />
            </button>
        }

        const outcomeButtons = this.props.outcomes && this.props.outcomes.map((outcome) => React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey, }));

        let className = manywho.styling.getClasses(this.props.parentId, this.props.id, 'select', this.props.flowKey).join(' ');

        if (model.isVisible === false)
            className += ' hidden';

        if ((typeof model.isValid !== 'undefined' && model.isValid === false) || state.error)
            className += ' has-error';

        let style: any = {}
        let widthClassName = null;

        if (model.width && model.width > 0) {
            style.width = model.width + 'px';
            style.minWidth = style.width;
            widthClassName = "width-specified";
        }

        return <div className={className} id={this.props.id}>
            <label>
                {model.label}
                {(model.isRequired) ? <span className="input-required"> * </span> : null}
            </label>
            <div style={style} className={widthClassName}>
                {selectElement}
                {refreshButton}
            </div>
            <span className="help-block">{state.error && state.error.message}</span>
            <span className="help-block">{model.helpInfo}</span>
            {outcomeButtons}
        </div>
    }
}

manywho.component.registerItems('select', DropDown);
