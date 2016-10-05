/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IComponentProps.ts" />

declare var manywho: any;

interface IOutcomesProps extends IComponentProps {
}

interface IOutcomesState {
}

class Outcomes extends React.Component<IOutcomesProps, IOutcomesState> {

    constructor(props: IOutcomesProps){
        super(props);

        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent(e) {
        manywho.component.handleEvent(this, manywho.model.getComponent(this.props.id, this.props.flowKey), this.props.flowKey);
    }

    render() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);

        manywho.log.info(`Rendering Outcomes: ${this.props.id}, ${model.developerName}`);

        const state = manywho.state.getComponent(this.props.id, this.props.flowKey) || {};

        let className = (manywho.styling.getClasses(this.props.parentId, this.props.id, 'outcomes', this.props.flowKey)).join(' ');

        if (model.isValid === false || state.isValid === false)
            className += ' has-error';

        if (!model.isVisible)
            className += ' hidden';

        let rowClassName = 'row';
        let groupClassName = '';

        if (model.attributes) {
            if (!manywho.utils.isNullOrWhitespace(model.attributes.justify))
                rowClassName += ' justify-' + model.attributes.justify;

            if (manywho.utils.isEqual(model.attributes.group, 'horizontal', true))
                groupClassName += ' btn-group';

            if (manywho.utils.isEqual(model.attributes.group, 'vertical', true))
                groupClassName += ' btn-group-vertical';
        }

        const outcomes: Array<any> = manywho.model.getOutcomes(this.props.id, this.props.flowKey);

        let size = 'default';
        if (model.attributes && !manywho.utils.isNullOrWhitespace(model.attributes.size))
            size = model.attributes.size;

        let outcomeElements: Array<JSX.Element> = outcomes && outcomes
            .map((outcome) => React.createElement(manywho.component.getByName('outcome'), { 
                id: outcome.id,
                size: size,
                className: model.attributes.outcomeClasses,
                disabled: !model.isEnabled,
                flowKey: this.props.flowKey
            }));

        if (!manywho.utils.isNullOrWhitespace(model.attributes.group))
            outcomeElements = [<div className={groupClassName}>{outcomeElements}</div>];

        return <div className={className} id={this.props.id}>
            <label>{model.label}</label>
            <div className={rowClassName}>
                {outcomeElements}
            </div>
            <span className="help-block">{model.validationMessage || state.validationMessage}</span>
            <span className="help-block">{model.helpInfo}</span>
        </div>
    }
}

manywho.component.register('outcomes', Outcomes);
