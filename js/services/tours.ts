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

manywho.tours = (function (manywho) {

	let configs = {};
	let domWatcher = null;

	const onInterval = function (tour, nextTarget) {
		if (nextTarget && document.getElementById(nextTarget)) {
			clearInterval(domWatcher)
			let stepIndex = null;
			tour.steps.find((step, index) => {
				if (step.target === nextTarget) {
					stepIndex = index;
					return step;
				}
			});
			if (stepIndex)
				manywho.tours.move(tour, stepIndex);
		}
	};

	const onDoneInterval = function(tour, target) {
		if (target && !document.getElementById(target)) {
			clearInterval(domWatcher);
			manywho.tours.done(tour);
		}
	}

	const watchForStep = function (tour: ITour) {
		clearInterval(domWatcher);

		const step = tour.steps[tour.currentStep];

		let nextTarget = null;
		if (step.showNext === false && tour.currentStep < tour.steps.length - 1)
			nextTarget = tour.steps[tour.currentStep + 1].target;

		if (step.showNext === false && nextTarget)
			domWatcher = setInterval(() => onInterval(tour, nextTarget), 500);

		if (tour.currentStep == tour.steps.length - 1)
			domWatcher = setInterval(() => onDoneInterval(tour, step.target), 500);
	}

	return {
		current: null,

		addTours(tours) {
			tours.forEach(tour => {
				configs[tour.id] = tour
			});
		},

		start(id: string, containerSelector: string, flowKey: string) {
			const container = document.querySelector(containerSelector);

			if (container) {
				let tourContainer = container.querySelector('.mw-tours');
				if (!tourContainer) {
					tourContainer = document.createElement('div');
					tourContainer.className = 'mw-tours mw-bs';
					container.appendChild(tourContainer);
				}

				if (manywho.utils.isNullOrWhitespace(id))
					id = Object.keys(configs)[0];

				if (!configs[id]) {
					manywho.log.error(`A Tour with the id ${id} could not be found`);
					return;
				}

				if (!configs[id].steps || configs[id].steps.length === 0) {
					manywho.log.error(`The Tour ${id} contains zero Steps`);
					return;
				}

				this.current = JSON.parse(JSON.stringify(configs[id])) as ITour;
				this.current.steps = (this.current.steps || []).map((step, index) => Object.assign({}, manywho.settings.global('tours.defaults', flowKey, {}), { order: index }, step));

				this.current.currentStep = 0;

				watchForStep(this.current);
				ReactDOM.render(React.createElement(manywho.component.getByName('mw-tour'), { tour: this.current, stepIndex: 0 }), tourContainer);
				return this.current;
			}
			else
				manywho.log.error(`A Container matching the selector ${containerSelector} could not be found when attempting to start a Tour`);
		},

		next(tour = this.current) {
			if (!tour)
				return;

			if (tour.currentStep + 1 >= tour.steps.length)
				manywho.tours.done(tour);
			else
				tour.currentStep++;

			watchForStep(tour);
			this.render();
		},

		previous(tour = this.current) {
			if (!tour)
				return;

			tour.currentStep = Math.max(0, tour.currentStep - 1);

			watchForStep(tour);
			this.render();
		},

		move(tour = this.current, index) {
			if (!tour)
				return;

			if (index >= tour.steps.length) {
				manywho.log.warning(`Cannot move Tour ${tour.id} to Step ${index} as it is out of bounds`);
				return;
			}

			tour.currentStep = index;

			watchForStep(tour);
			this.render();
		},

		refresh(tour = this.current) {
			if (!tour)
				return;

			const targets = tour.steps.map(step => step.target);

			if (!document.getElementById(targets[tour.currentStep]))
				for (let i = tour.currentStep; i < targets.length; i++) {
					if (document.getElementById(targets[i])) {
						this.move(tour, i);
						break;
					}
				}
		},

		done(tour = this.current) {
			this.current = null;
			ReactDOM.unmountComponentAtNode(document.querySelector('.mw-tours'));
		},

		render(tour = this.current) {
			if (!tour)
				return;

			ReactDOM.render(React.createElement(manywho.component.getByName('mw-tour'), { tour: tour, stepIndex: tour.currentStep }), document.querySelector('.mw-tours'));
		}
	}

})(manywho);
