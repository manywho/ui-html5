/*!
Copyright 2017 ManyWho, Inc.
Licensed under the ManyWho License, Version 1.0 (the "License"); you may not use this
file except in compliance with the License.
You may obtain a copy of the License at: http://manywho.com/sharedsource
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied. See the License for the specific language governing
permissions and limitations under the License.
*/

/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/ITour.ts" />

declare var manywho: any;

class Tour extends React.Component<ITourProps, ITourState> {

	domWatcher: number;

	constructor(props) {
		super(props);

		this.state = {
			foundTarget: false,
			style: null
		}

		this.onNext = this.onNext.bind(this);
		this.onBack = this.onBack.bind(this);
		this.onDone = this.onDone.bind(this);
	}

	onInterval(stepIndex) {
		if (document.getElementById(this.props.tour.steps[stepIndex].target)) {
			clearInterval(this.domWatcher);
			this.setState({ foundTarget: true, style: this.state.style });
		}
	}

	onNext() {
		manywho.tours.next(this.props.tour);
	}

	onBack() {
		manywho.tours.previous(this.props.tour);
	}

	onDone() {
		manywho.tours.done(this.props.tour);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.stepIndex !== nextProps.stepIndex) {
			clearInterval(this.domWatcher);
			this.setState({ foundTarget: false, style: this.state.style });
			this.domWatcher = setInterval(() => { this.onInterval(this.props.stepIndex) }, 500);
		}
	}

	componentDidMount() {
		this.domWatcher = setInterval(() => { this.onInterval(this.props.stepIndex) }, 500);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.foundTarget === false && this.state.foundTarget) {
			const step = this.props.tour.steps[this.props.tour.currentStep];
			const stepRect = (this.refs['step'] as HTMLElement).getBoundingClientRect();

			const target = document.getElementById(step.target);
			const targetRect = target.getBoundingClientRect();

			let style = {
				left: 0,
				top: 0
			};

			switch (step.placement.toUpperCase()) {
				case 'LEFT':
					style.left = targetRect.left - stepRect.width - 16;
					break;

				case 'RIGHT':
					style.left = targetRect.right + 16;
					break;

				case 'BOTTOM':
					style.top = targetRect.bottom + 16
					break;

				case 'TOP':
					style.top = targetRect.top - stepRect.height - 16;
					break;
			}

			if (manywho.utils.isEqual(step.placement, 'bottom', true) || manywho.utils.isEqual(step.placement, 'top', true))
				switch (step.align.toUpperCase()) {
					case 'LEFT':
						style.left = targetRect.left;
						break;

					case 'CENTER':
						style.left = targetRect.left + (targetRect.width / 2);
						break;

					case 'RIGHT':
						style.left = targetRect.left + (targetRect.width - stepRect.width);
						break;
				}

			if (manywho.utils.isEqual(step.placement, 'left', true) || manywho.utils.isEqual(step.placement, 'right', true))
				switch (step.align.toUpperCase()) {
					case 'TOP':
						style.top = targetRect.top;
						break;

					case 'CENTER':
						style.top = (targetRect.top + (targetRect.height / 2)) - (stepRect.height / 2)
						break;

					case 'BOTTOM':
						style.top = targetRect.bottom - stepRect.height;
						break;
				}

			this.setState({ style: style, foundTarget: this.state.foundTarget });
		}
	}

	componentWillUnMount() {
		clearInterval(this.domWatcher);
	}

	render() {
		if (!this.state.foundTarget)
			return null;

		manywho.log.info(`Rendering Tour ${this.props.tour.id}, Step ${this.props.stepIndex}`);

		const step = this.props.tour.steps[this.props.tour.currentStep] as ITourStep;
		const className = "mw-tour-step popover " + step.placement;

		let arrowStyle = null;
		let offset = manywho.utils.isNullOrUndefined(step.offset) ? 16 : step.offset;

		switch (step.placement.toUpperCase()) {
			case 'LEFT':
			case 'RIGHT':
				let top = '50%';
				if (manywho.utils.isEqual(step.align, 'top', true))
					top = `calc(0% + ${offset.toString()}px)`;
				else if (manywho.utils.isEqual(step.align, 'top', true))
					top = `calc(100% - ${offset.toString()}px)`;

				arrowStyle = { top: top }
				break;

			case 'TOP':
			case 'BOTTOM':
				let left = '50%';
				if (manywho.utils.isEqual(step.align, 'left', true))
					left = `calc(0% + ${offset.toString()}px)`;
				else if (manywho.utils.isEqual(step.align, 'right', true))
					left = `calc(100% - ${offset.toString()}px)`;

				arrowStyle = { left: left }
				break;
		}

		return <React.addons.CSSTransitionGroup transitionName="mw-tour-step"
												transitionAppear={true}
												transitionAppearTimeout={500}
												transitionEnter={false}
												transitionLeave={true}
												transitionLeaveTimeout={250}>
			<div className={className} ref="step" style={this.state.style} key={this.props.stepIndex} id={`tour-${this.props.tour.id}-step${this.props.stepIndex}`}>
				<div className="arrow" style={arrowStyle} />
				{manywho.utils.isNullOrWhitespace(step.title) ? null : <div className="popover-title">{step.title}<button className="close" onClick={this.onDone}><span>&times;</span></button></div>}
				<div className="popover-content">
					<p>{step.content}</p>
					<div className="popover-buttons">
						{step.showBack ? <button className="btn btn-default btn-sm" onClick={this.onBack}>Back</button> : null}
						{step.showNext ? <button className="btn btn-primary btn-sm" onClick={this.onNext}>Next</button> : null}
					</div>
				</div>
			</div>
		</React.addons.CSSTransitionGroup>
	}
}

manywho.component.register('mw-tour', Tour);
