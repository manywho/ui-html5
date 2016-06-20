/// <reference path="IComponentProps.ts" />

interface ITilesProps extends IComponentProps {
    objectData: Array<any>,
    onSearch: Function,
    refresh: Function,
    onNext: Function,
    hasMoreResults: boolean,
    onOutcome: Function,
    select: Function
}
