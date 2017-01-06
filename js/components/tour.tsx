/*!
Copyright 2015 ManyWho, Inc.
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
	}

	onInterval() {
		if (document.getElementById(this.props.tour.steps[this.props.tour.currentStep].target)) {
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

	componentWillReceiveProps(nextProps) {
		if (this.props.stepIndex !== nextProps.stepIndex) {
			clearInterval(this.domWatcher);
			this.setState({ foundTarget: false, style: this.state.style });
			this.domWatcher = setInterval(() => { this.onInterval() }, 500);
		}
	}
	
	componentDidMount() {
		this.domWatcher = setInterval(() => { this.onInterval() }, 1000);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.foundTarget === false && this.state.foundTarget) {
			const step = this.props.tour.steps[this.props.tour.currentStep];
			const stepRect = (this.refs['step'] as HTMLElement).getBoundingClientRect();

			const target = document.getElementById(step.target);
			const targetRect = target.getBoundingClientRect();

			let style = null;

			switch (step.placement.toUpperCase()) {
				case 'LEFT':
					style = {
						left: targetRect.left - stepRect.width - 16,
						top: (targetRect.top + (targetRect.height / 2)) - (stepRect.height / 2)
					}
					break;

				case 'BOTTOM':
					style = {
						left: targetRect.left + (step.center ? targetRect.width / 2 : 0),
						top: targetRect.bottom + 16
					}
					break;

				case 'TOP':
					style = {
						left: targetRect.left + (step.center ? targetRect.width / 2 : 0),
						top: targetRect.top - stepRect.height - 16
					}
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

		const step = this.props.tour.steps[this.props.tour.currentStep];
		const className = "mw-tour-step popover " + step.placement;          

		let arrowStyle = null;
		if (!manywho.utils.isNullOrUndefined(step.offset))
			switch (step.placement.toUpperCase()) {
				case 'LEFT':
				case 'RIGHT':
					arrowStyle= { top: step.offset + 'px' }
					break;
				
				case 'TOP':
				case 'BOTTOM':
					arrowStyle= { left: step.offset + 'px' }
					break;
			}

		return <React.addons.CSSTransitionGroup transitionName="mw-tour-step"
												transitionAppear={true}
												transitionAppearTimeout={300}
												transitionEnter={false}
												transitionLeave={true}
												transitionLeaveTimeout={300}>			
			<div className={className} ref="step" style={this.state.style} key={this.props.stepIndex}>
				<div className="arrow" style={arrowStyle} />
				{manywho.utils.isNullOrWhitespace(step.title) ? null :  <div className="popover-title">{step.title}</div>}
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
