/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IComponentProps.ts" />

declare var manywho: any;

interface IToggleState {
}

class Toggle extends React.Component<IComponentProps, IToggleState> {

    constructor(props: IComponentProps){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        manywho.state.setComponent(this.props.id, { contentValue: e.target.checked }, this.props.flowKey, true);
        this.handleEvent(null);
        this.forceUpdate();
    }

    handleEvent(e) {
        manywho.component.handleEvent(this, manywho.model.getComponent(this.props.id, this.props.flowKey), this.props.flowKey);
    }

    render() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);

        manywho.log.info(`Rendering Toggle: ${this.props.id}, ${model.developerName}`);

        const state = manywho.state.getComponent(this.props.id, this.props.flowKey) || {};
        const outcomes: any = manywho.model.getOutcomes(this.props.id, this.props.flowKey);
        const outcomeElements: Array<JSX.Element> = outcomes && outcomes
            .map((outcome) => React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey }));

        let className = (manywho.styling.getClasses(this.props.parentId, this.props.id, 'toggle', this.props.flowKey)).join(' ');

        if (typeof model.isValid !== 'undefined' && model.isValid == false)
            className += 'has-error';

        if (!model.isVisible)
            className += 'hidden';

        const contentValue = state && state.contentValue != null ?  state.contentValue : model.contentValue;

        const props: any = {
            type: 'checkbox',
            readOnly: !model.isEditable,
            required: model.isRequired,
            disabled: !model.isEnabled,
            checked: (typeof contentValue == "string" && manywho.utils.isEqual(contentValue, "true", true)) || contentValue === true
        }

        if (!this.props.isDesignTime) {
            props.onChange = this.handleChange;
            props.onBlur = this.handleEvent;
        }

        const backgrounds = [null, 'success', 'info', 'warning', 'danger'];

        let shape = manywho.settings.global('toggle.shape', this.props.flowKey, null);
        let background = manywho.settings.global('toggle.background', this.props.flowKey, null);

        if (model.attributes) {
            if (typeof model.attributes.shape !== 'undefined')
                shape = model.attributes.shape;

            if (typeof model.attributes.background !== 'undefined')
                background = model.attributes.background;
        }

        const sliderClassName = `${shape} ${(background) ? background : ''}`;
        let style = null;

        if (backgrounds.indexOf(background) == -1)
            style = { background: background }

        return <div className={className} id={this.props.id}>
            <label>{model.label}</label>
            <div>
                <label>
                    <input {...props} />
                    <div className={sliderClassName} style={style}></div>
                </label>
            </div>
            <span className="help-block">{model.validationMessage}</span>
            <span className="help-block">{model.helpInfo}</span>
            {outcomeElements}
        </div>
    }

}

manywho.component.register('toggle', Toggle);
