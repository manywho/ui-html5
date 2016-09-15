/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IChartBaseProps.ts" />

declare var manywho: any;
declare var Chart: any;
declare var $: any;

class ChartBase extends React.Component<IChartBaseProps, any> {

    chart = null
    displayName = 'ChartBase'

    constructor(props: any){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const element = this.chart.getElementAtEvent(e);
		if (element && element.length > 0)
            this.props.onClick(this.props.objectData[element[0]._datasetIndex][element[0]._index].externalId, element[0]._datasetIndex);            
    }

    componentWillUnmount() {
		this.chart.destroy();
	}

    componentDidMount() {
        if (this.props.isVisible == false)
            return

		const canvas = ReactDOM.findDOMNode(this.refs['canvas']);
        const chartSettings = manywho.settings.global('charts.' + this.props.type, this.props.flowKey, null);

        let backgroundColors = chartSettings && chartSettings.backgroundColors ? 
            chartSettings.backgroundColors 
            : manywho.settings.global('charts.backgroundColors', this.props.flowKey);

        let borderColors = chartSettings && chartSettings.borderColors ? 
            chartSettings.borderColors 
            : manywho.settings.global('charts.borderColors', this.props.flowKey);

        const data: any = {
            labels: [],
            datasets: []
        };

        this.props.objectData.forEach((objectData, index) => {
            const dataset: any = {
                data: [],
                fill: false,
                backgroundColor: [],
                borderColor: []
            }

            if (this.props.labels)
                dataset.label = this.props.labels[index];

            objectData.forEach((objectDatum, rowIndex) => {

                this.props.columns.forEach((column, columnIndex) => {
                    let property = objectDatum.properties.find(prop => manywho.utils.isEqual(prop.typeElementPropertyId, column.typeElementPropertyId));

                    if (property)
                        switch (columnIndex) {
                            case 0:
                                if (index === 0)
                                    data.labels.push(property.contentValue);
                                break;

                            case 1:
                                dataset.data.push(property.contentValue);
                                break;

                            case 2:
                                let backgroundColor = property.contentValue;
                                if (manywho.utils.isNullOrWhitespace(property.contentValue))
                                    backgroundColor = backgroundColors[rowIndex % backgroundColors.length]

                                dataset.backgroundColor.push(backgroundColor);
                                break;

                            case 3:
                                let borderColor = property.contentValue;
                                if (manywho.utils.isNullOrWhitespace(property.contentValue))
                                    borderColor = borderColors[rowIndex % borderColors.length]

                                dataset.borderColor.push(borderColor);
                                break;
                        }
                });

                if (this.props.objectData.length > 1
                    && (this.props.type === 'bar' || this.props.type === 'line')) {
                    if (dataset.backgroundColor.length - 1 < rowIndex)
                        dataset.backgroundColor.push(backgroundColors[index % backgroundColors.length]);

                    if (dataset.borderColor.length - 1 < rowIndex)
                        dataset.borderColor.push(borderColors[index % borderColors.length])
                }
                else {
                    if (dataset.backgroundColor.length - 1 < rowIndex)
                        dataset.backgroundColor.push(backgroundColors[rowIndex % backgroundColors.length]);

                    if (dataset.borderColor.length - 1 < rowIndex)
                        dataset.borderColor.push(borderColors[rowIndex % borderColors.length])
                }
            });

            data.datasets.push(dataset);
        });

        if (manywho.utils.isEqual(this.props.type, 'line', true)) {
            data.datasets = data.datasets.map((dataset, index) => {
                dataset.backgroundColor = backgroundColors[index];
                dataset.borderColor = dataset.backgroundColor;
                return dataset;
            });
        }

        const options = $.extend({}, manywho.settings.global('charts.options', this.props.flowKey, {}), this.props.options)

		this.chart = new Chart(canvas, {
			type: this.props.type,
			data: data,
            options: options
        });
    }

    render() {
		return <canvas onClick={this.onClick} ref="canvas" />
    }

}

manywho.component.register('mw-chart-base', ChartBase);
