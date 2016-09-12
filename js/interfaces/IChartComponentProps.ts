/// <reference path="../../typings/index.d.ts" />
/// <reference path="IComponentProps.ts" />

interface IChartComponentProps extends IComponentProps {
    id: string,
    parentId: string,
    flowKey: string,
    isDesignTime: boolean,
    contentElement: JSX.Element,
    hasMoreResults: boolean,
    onOutcome: Function,
    select: Function,
    selectAll: Function,
    clearSelection: Function,
    objectData: Array<any>,
    onSearch: Function,
    outcomes: Array<any>,
    refresh: (MouseEvent) => void,
    onNext: Function,
    onPrev: Function,
    page: number,
    limit: number,
    isLoading: boolean,
    type: string,
    options: any
}
