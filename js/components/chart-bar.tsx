/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IItemsComponentProps.ts" />

declare var manywho: any;
declare var $: any;

class ChartBar extends React.Component<IItemsComponentProps, any> {

    displayName = 'ChartBar'

    constructor(props: any){
        super(props);
    }

    render() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        let label = null;

        if (model.attributes)
            label = model.attributes.label;

        const props: any = $.extend({}, this.props, {
            type : 'bar', 
            options: {
                legend: {
                    display: !manywho.utils.isNullOrWhitespace(label)
                }
            }
        });

        return React.createElement(manywho.component.getByName('mw-chart'), props, null)
    }

}

manywho.component.registerItems('chart-bar', ChartBar);
