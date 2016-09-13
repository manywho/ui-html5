/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IChartComponentProps.ts" />

declare var manywho: any;
declare var reactChart: any;
declare var Chart: any;
declare var $: any;

class ChartBase extends React.Component<IChartComponentProps, any> {

    chart = null
    displayName = 'ChartBase'

    constructor(props: any){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const element = this.chart.getElementAtEvent(e);
		if (element && element.length > 0) {
            const outcome = this.props.outcomes.filter(item => !item.isBulkAction)[0];
           
            if (outcome)
                this.props.onOutcome(this.props.objectData[element[0]._index].externalId, outcome.id);            
		}
    }

    componentWillUnmount() {
		this.chart.destroy();
	}

    componentDidMount() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);

        if (model.isVisible == false)
            return

        const columns: Array<any> = manywho.component.getDisplayColumns(model.columns) || [];
		const node = ReactDOM.findDOMNode(this.refs['canvas']);
        const backgroundColors = manywho.settings.global('charts.backgroundColors', this.props.flowKey);
        const borderColors = manywho.settings.global('charts.borderColors', this.props.flowKey);

        const data: any = {
            labels: [],
            datasets: [{
                data: [],
                fill: false,
                backgroundColor: [],
                borderColor: []
            }]
        };

        this.props.objectData.forEach((objectData, rowIndex) => {
            columns.forEach((column, index) => {
                let property = objectData.properties.find(prop => manywho.utils.isEqual(prop.typeElementPropertyId, column.typeElementPropertyId));

                if (property )
                    switch (index) {
                        case 0:
                            data.labels.push(property.contentValue);
                            break;

                        case 1:
                            data.datasets[0].data.push(property.contentValue);
                            break;

                        case 2:
                            let backgroundColor = property.contentValue;
                            if (manywho.utils.isNullOrWhitespace(property.contentValue))
                                backgroundColor = backgroundColors[rowIndex % backgroundColors.length]

                            data.datasets[0].backgroundColor.push(backgroundColor);
                            break;

                        case 3:
                            let borderColor = property.contentValue;
                            if (manywho.utils.isNullOrWhitespace(property.contentValue))
                                borderColor = borderColors[rowIndex % borderColors.length]

                            data.datasets[0].borderColor.push(borderColor);
                            break;
                    }
            });
        });

        if (manywho.utils.isEqual(this.props.type, 'line', true)) {
            data.datasets[0].backgroundColor = backgroundColors[0];
            data.datasets[0].borderColor = data.datasets[0].backgroundColor;
        }

        const options = $.extend({}, manywho.settings.global('charts.options', this.props.flowKey, {}), this.props.options)

		this.chart = new Chart(node, {
			type: this.props.type,
			data: data,
            options: options
        });
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
            contentElement = <canvas onClick={this.onClick} ref="canvas" />;
       
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

manywho.component.register('mw-chart-base', ChartBase);
