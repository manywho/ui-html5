/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IItemsComponentProps.ts" />

declare var manywho: any;
declare var $: any;

class ChartPie extends React.Component<IItemsComponentProps, any> {

    displayName = 'ChartPie'

    constructor(props: any){
        super(props);
    }

    render() {
        const props: any = $.extend({}, this.props, {
            type : 'pie'
        });

        return React.createElement(manywho.component.getByName('mw-chart'), props, null)
    }

}

manywho.component.registerItems('chart-pie', ChartPie);
