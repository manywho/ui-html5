/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IItemsComponentProps.ts" />

declare var manywho: any;

class ChartPolar extends React.Component<IItemsComponentProps, any> {

    displayName = 'Chart-Polar'

    constructor(props: any){
        super(props);
    }

    render() {
        const props: any = this.props;
        props.type = 'polarArea'; 
        return React.createElement(manywho.component.getByName('mw-chart-base'), props, null)
    }

}

manywho.component.registerItems('chart-polar', ChartPolar);
