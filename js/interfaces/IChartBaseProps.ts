/// <reference path="../../typings/index.d.ts" />

interface IChartBaseProps {
    isVisible: boolean,
    columns: Array<any>,
    objectData: Array<Array<any>>,
    labels: Array<string>,
    onClick: Function,
    flowKey: string,
    type: string,
    options: any,
    width: number,
    height: number
}
