/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IItemsComponentProps.ts" />

declare var manywho: any;

class ChartBar extends React.Component<IItemsComponentProps, any> {

    displayName = 'Chart-Bar'

    constructor(props: any){
        super(props);
    }

    render() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        let label = null;

        if (model.attributes)
            label = model.attributes.label;

        const props: any = this.props;
        props.type = 'bar'; 
        props.options = {
            legend: {
                display: !manywho.utils.isNullOrWhitespace(label)
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }

        return React.createElement(manywho.component.getByName('mw-chart-base'), props, null)
    }

}

manywho.component.registerItems('chart-bar', ChartBar);
