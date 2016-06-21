/// <reference path="../../typings/index.d.ts" />
/// <reference path="IComponentProps.ts" />

interface ITilesProps extends IComponentProps {
    objectData: Array<any>,
    onSearch: Function,
    refresh: Function,
    onPrev: Function,
    onNext: Function,
    hasMoreResults: boolean,
    onOutcome: Function,
    select: Function,
    contentElement: JSX.Element,
    page: number
}
