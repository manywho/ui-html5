/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IItemsComponentProps.ts" />

declare var manywho: any;

class ChartPie extends React.Component<IItemsComponentProps, any> {

    displayName = 'ChartPie'

    constructor(props: any){
        super(props);
    }

    render() {
        const props: any = this.props;
        props.type = 'pie'; 
        return React.createElement(manywho.component.getByName('mw-chart'), props, null)
    }

}

manywho.component.registerItems('chart-pie', ChartPie);
