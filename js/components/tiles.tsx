/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/ITilesProps.ts" />

declare var manywho: any;
declare var ReactMotion: any;

interface ITilesState {
    flip: boolean,
    isContentElementVisible: boolean;
}

class Tiles extends React.Component<ITilesProps, ITilesState> {

    constructor(props: ITilesProps){
        super(props);

        this.state = { flip: false, isContentElementVisible: false };

        this.onSelect = this.onSelect.bind(this);
        this.onOutcome = this.onOutcome.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onRest = this.onRest.bind(this);
    }

    onSelect(e) {
        this.props.select(e.currentTarget.id);
    }

    onOutcome(e) {
        this.props.onOutcome(e.currentTarget.parentElement.parentElement.id, e.currentTarget.id);
    }

    onPrev() {
        this.props.onPrev();
        setTimeout(() => (this.refs['container'] as HTMLElement).scrollIntoView(true));
    }

    onNext() {
        this.props.onNext();
        setTimeout(() => (this.refs['container'] as HTMLElement).scrollIntoView(true));
    }

    onRest() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        
        if (this.props.contentElement)
            this.setState({ flip: false, isContentElementVisible: true });

        if (this.props.objectData)
            this.setState({ flip: true, isContentElementVisible: false });        
    }

    renderItem(item: any, columns: Array<any>, outcomes: Array<any>, deleteOutcome: any) : JSX.Element {
        if (item.type === 'next')
            return <div className="mw-tiles-next" onClick={this.onNext}><span className="glyphicon glyphicon-arrow-right"/></div>;

        if (item.type === 'prev')
            return <div className="mw-tiles-prev" onClick={this.onPrev}><span className="glyphicon glyphicon-arrow-left"/></div>;

        let className = 'mw-tiles-item';
        if (item.isSelected)
            className += ' bg-info';

        const header: string = item.properties.find((property) => property.typeElementPropertyId == columns[0].typeElementPropertyId).contentValue;
        
        let deleteOutcomeElement = null;
        if (deleteOutcome)
            deleteOutcomeElement = React.createElement(manywho.component.getByName('outcome'), { id: deleteOutcome.id, flowKey: this.props.flowKey, onClick: this.onOutcome, size: 'sm' });

        let content: string = null;
        if (columns.length > 1)
            content = item.properties.find((property) => property.typeElementPropertyId == columns[1].typeElementPropertyId).contentValue;
        
        let footer: Array<JSX.Element> = null;
        if (columns.length > 2)
            footer = columns.map((column, index) => {
                if (index > 1) {
                    const property = item.properties.find((property) => property.typeElementPropertyId == column.typeElementPropertyId);
                    return <li><strong>{property.developerName}</strong>: {property.contentValue}</li>
                }
            });

        return (<div className={className} onClick={this.onSelect} id={item.externalId}>
            <div className="mw-tiles-item-header">
                <h3>{header}</h3>
                {deleteOutcomeElement}
            </div>
            <div className="mw-tiles-item-content">{content}</div>
            <ul className="mw-tiles-item-footer list-unstyled">{footer}</ul>
            <div className="mw-tiles-item-outcomes">{outcomes}</div>
        </div>);
    }

    render() {
        manywho.log.info('Rendering Tiles: ' + this.props.id);

        if (this.props.isDesignTime)
            return null;

        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);
        const state = this.props.isDesignTime ? { error: null, loading: false } : manywho.state.getComponent(this.props.id, this.props.flowKey) || {};
        const outcomes: any = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
        const columns: Array<any> = manywho.component.getDisplayColumns(model.columns) || [];

        let className = manywho.styling.getClasses(this.props.parentId, this.props.id, "tiles", this.props.flowKey).join(' ');

        if (model.isVisible == false)
            className += ' hidden';

        let labelElement = null;
        if (!manywho.utils.isNullOrWhitespace(model.label))
            labelElement = <label>{model.label}</label>;

        const headerElement = React.createElement(manywho.component.getByName('mw-items-header'), {
            flowKey: this.props.flowKey,
            isSearchable: model.isSearchable,
            isRefreshable: (model.objectDataRequest || model.fileDataRequest),
            onSearch: this.props.onSearch,
            outcomes: manywho.model.getOutcomes(this.props.id, this.props.flowKey),
            refresh: this.props.refresh
        });

        let items = this.props.objectData;

        if (!this.props.objectData) {
            items = [];
            for (var i = 1; i <= manywho.settings.global('paging.tiles', this.props.flowKey) + 1; i++) {
                items.push(i);
            }
        }

        if (this.props.page > 1)
            items.unshift({ type: 'prev' });

        if (this.props.hasMoreResults === true)
            items = items.concat([{ type: 'next' }]);

        const footerOutcomes: Array<JSX.Element> = outcomes && outcomes
            .filter((outcome) => !manywho.utils.isEqual(outcome.pageActionType, 'Delete', true) && !outcome.isBulkAction)
            .map((outcome) => React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey, onClick: this.onOutcome, size: 'default' }));
            
        const deleteOutcome: any = outcomes && outcomes
            .filter((outcome) => manywho.utils.isEqual(outcome.pageActionType, 'Delete', true) && !outcome.isBulkAction)[0];

        let contentElement = null;
        
        if (this.state.isContentElementVisible && this.props.contentElement)
            contentElement = this.props.contentElement;
        else {
            contentElement = (<ReactMotion.Motion defaultStyle={{ scale: 0 }} style={{ scale: ReactMotion.spring(1, ReactMotion.presets.gentle) }} onRest={this.onRest}>
                {interpolatingStyle => {
                    const transform : string = `scale(${interpolatingStyle.scale},${interpolatingStyle.scale})`;
                    
                    return (<div className="mw-tiles-items">
                        {items.map((item, index) => {
                            const key: string = `${this.props.page.toString()}-${index}`;

                            if (state.loading || !this.state.flip)
                                return <div className="mw-tiles-item-container" key={key} style={{ transform: transform }}></div> 

                            return (<div className="mw-tiles-item-container" key={key} style={{ transform: transform }} ref="items">
                                <ReactMotion.Motion defaultStyle={{ rotate: 0}} style={{ rotate: ReactMotion.spring(180, { stiffness: 65, damping: 9.5 }) }}>
                                    {interpolatingStyle => {
                                        const transform : string = `rotateY(${interpolatingStyle.rotate}deg)`;

                                        return (<div style={{ transform: transform }}>
                                            <div className="front"></div>
                                            <div className="back">{this.renderItem(item, columns, footerOutcomes, deleteOutcome)}</div>
                                        </div>);
                                    }}
                                </ReactMotion.Motion>
                            </div>)                            
                        })}
                    </div>) 
                }}
            </ReactMotion.Motion>);
        }

        return (<div className={className} id={this.props.id} ref="container">
            {labelElement}
            {headerElement}
            {contentElement}
        </div>);
    }

}

manywho.component.register('mw-tiles', Tiles);
