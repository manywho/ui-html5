/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IItemsComponentProps.ts" />

declare var manywho: any;

class ChartPolar extends React.Component<IItemsComponentProps, any> {

    displayName = 'ChartPolar'

    constructor(props: any){
        super(props);
    }

    render() {
        const props: any = $.extend({}, this.props, {
            type : 'polarArea'
        });

        return React.createElement(manywho.component.getByName('mw-chart'), props, null)
    }

}

manywho.component.registerItems('chart-polar', ChartPolar);
