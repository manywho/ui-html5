/// <reference path="../../typings/index.d.ts" />
/// <reference path="IComponentProps.ts" />

interface IItemsComponentProps extends IComponentProps {
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
    onFirstPage: Function,
    page: number,
    limit: number,
    isLoading: boolean
}
