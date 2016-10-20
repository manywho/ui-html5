/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IChartComponentProps.ts" />

declare var manywho: any;
declare var Chart: any;
declare var $: any;

class ChartComponent extends React.Component<IChartComponentProps, any> {

    chart = null
    displayName = 'Chart'

    constructor(props: any){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(externalId) {
        const outcome = this.props.outcomes.filter(item => !item.isBulkAction)[0];
        
        if (outcome)
            this.props.onOutcome(externalId, outcome.id);            
    }

    render() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);

        manywho.log.info(`Rendering Chart: ${model.developerName}, ${this.props.id}`);

        const state = this.props.isDesignTime ? { error: null, loading: false } : manywho.state.getComponent(this.props.id, this.props.flowKey) || {};
        let columns = manywho.component.getDisplayColumns(model.columns) || [];

        let className = manywho.styling.getClasses(this.props.parentId, this.props.id, 'chart', this.props.flowKey).join(' ');

        if (model.isVisible == false)
            className += ' hidden';

        if (model.attributes && model.attributes.classes)
            className += ' ' + model.attributes.classes;

        let labelElement = null;
        if (!manywho.utils.isNullOrWhitespace(model.label))
            labelElement = <label>{model.label}</label>;

        let headerElement = null;
        if (!this.props.isDesignTime)
            headerElement = React.createElement(manywho.component.getByName('mw-items-header'), {
                flowKey: this.props.flowKey,
                isSearchable: false,
                isRefreshable: (model.objectDataRequest || model.fileDataRequest),
                outcomes: manywho.model.getOutcomes(this.props.id, this.props.flowKey),
                refresh: this.props.refresh
            });

        let contentElement = this.props.contentElement;
        let objectData = [this.props.objectData];
        
        if (this.props.isDesignTime) {
            objectData =[[Math.random() * 10, Math.random() * 15, Math.random() * 50, Math.random() * 25].map((item, index) => {
                return {
                    properties: [
                        { contentValue: 'Label ' + index, typeElementPropertyId: 'id' },
                        { contentValue: item, typeElementPropertyId: 'id1' }
                    ]
                }
            })];

            columns = [{ typeElementPropertyId: 'id' }, { typeElementPropertyId: 'id1' }];
        }

        if (!contentElement || this.props.isDesignTime)
            contentElement = React.createElement(manywho.component.getByName('mw-chart-base'), {
                isVisible: model.isVisible,
                objectData: objectData,
                columns: columns,
                flowKey: this.props.flowKey,
                type: this.props.type,
                options: this.props.options,
                onClick: !this.props.isDesignTime ? this.onClick : null,
                width: model.width > 0 ? model.width : undefined,
                height: model.height > 0 ? model.height : undefined,
                isLoading: this.props.isLoading
            }, null);
       
        let validationElement = null;
        if (typeof model.isValid !== 'undefined' && model.isValid == false)
            validationElement = <div className="has-error"><span className="help-block">{model.validationMessage}</span></div>;

		return <div className={className} id={this.props.id}>
            {labelElement}
            {headerElement}
            {contentElement}
            {validationElement}
            <span className="help-block">{model.validationMessage}</span>
            <span className="help-block">{model.helpInfo}</span>
            {React.createElement(manywho.component.getByName('wait'), { isVisible: this.props.isLoading, message: state.loading && state.loading.message, isSmall: true }, null)}
        </div>
    }

}

manywho.component.register('mw-chart', ChartComponent);
