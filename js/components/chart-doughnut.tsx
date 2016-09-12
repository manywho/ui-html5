/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IItemsComponentProps.ts" />

declare var manywho: any;

class ChartDoughnut extends React.Component<IItemsComponentProps, any> {

    displayName = 'Chart-Doughnut'

    constructor(props: any){
        super(props);
    }

    render() {
        const props: any = this.props;
        props.type = 'doughnut'; 
        return React.createElement(manywho.component.getByName('mw-chart-base'), props, null)
    }

}

manywho.component.registerItems('chart-doughnut', ChartDoughnut);
