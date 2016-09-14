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

        if (this.props.isDesignTime)
            return null;

        const state = this.props.isDesignTime ? { error: null, loading: false } : manywho.state.getComponent(this.props.id, this.props.flowKey) || {};
        
        let className = manywho.styling.getClasses(this.props.parentId, this.props.id, 'chart', this.props.flowKey).join(' ');

        if (model.isVisible == false)
            className += ' hidden';

        if (model.attributes && model.attributes.classes)
            className += ' ' + model.attributes.classes;

        let labelElement = null;
        if (!manywho.utils.isNullOrWhitespace(model.label))
            labelElement = <label>{model.label}</label>;

        const headerElement = React.createElement(manywho.component.getByName('mw-items-header'), {
            flowKey: this.props.flowKey,
            isSearchable: false,
            isRefreshable: (model.objectDataRequest || model.fileDataRequest),
            outcomes: manywho.model.getOutcomes(this.props.id, this.props.flowKey),
            refresh: this.props.refresh
        });

        let contentElement = this.props.contentElement;
        if (!contentElement)
            //contentElement = <canvas onClick={this.onClick} ref="canvas" />;
            contentElement = React.createElement(manywho.component.getByName('mw-chart-base'), {
                isVisible: model.isVisible,
                objectData: [this.props.objectData],
                columns: manywho.component.getDisplayColumns(model.columns) || [],
                flowKey: this.props.flowKey,
                type: this.props.type,
                options: this.props.options,
                onClick: this.onClick
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
