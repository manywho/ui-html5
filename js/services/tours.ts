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

	const onInterval = function(tour, nextTarget, previousTarget) {
		if (nextTarget && document.getElementById(nextTarget)) {
			clearInterval(domWatcher)
			manywho.tours.next(tour);
		}
		else if (previousTarget && document.getElementById(previousTarget)) {
			clearInterval(domWatcher);
			manywho.tours.back(tour);
		}
	};

	const watchForStep = function(tour: ITour) {
		const step = tour.steps[tour.currentStep];

		let nextTarget = null;
		if (step.showNext === false && tour.currentStep < tour.steps.length - 1)
			nextTarget = tour.steps[tour.currentStep + 1].target;

		let previousTarget = null;
		if (step.showBack === false && tour.currentStep > 0)
			previousTarget = tour.steps[tour.currentStep - 1].target;
		
		if ((step.showNext === false && step.showBack === false) && (nextTarget || previousTarget))
			domWatcher = setInterval(() => onInterval(tour, nextTarget, previousTarget), 1000);
	}

    return {    
        current: null,

        loadConfigs() {
            configs['test'] = {
                id: 'test',
                steps: [
                    {
                        target: '95b5a2e3-f802-43e1-81a3-391e4f32f82b',
                        title: 'title',
                        content: 'content',
                        placement: 'left',
						showNext: false,
						showBack: false
                    },
                    {
                        target: '33f9d00a-c705-44d6-8122-fb33634d1319',
                        content: 'content',
                        placement: 'bottom',
                        center: false,
						showNext: true
                    },
					{
                        target: '50e73534-7833-4427-9d15-2af1a88eb893',
                        content: 'content',
                        placement: 'top',
                        center: false,
						showBack: true,
						offset: '16'
					},
					{
                        target: 'step',
                        content: 'put a step on the canvas',
                        placement: 'right',
						showNext: false,
						showBack: false
					},
					{
						target: '223a4f66-2027-486e-a2b8-4b731ceef6fe',
						content: 'enter a name here',
                        placement: 'left',
						showNext: true,
						showBack: false
					},
					{
						target: 'f0d230ea-65e1-451a-a32a-73270df19045',
						content: 'content goes here',
                        placement: 'left',
						showNext: true,
						showBack: true
					},
					{
						target: '47f697b5-12ee-4aa6-8b82-90ba4a16f4c4',
						content: 'hit this button',
                        placement: 'top',
						showNext: false,
						showBack: true,
						align: 'right'
					}			
                ]
            }
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

		refresh(tour = this.current) {
			if (!tour)
				return;

			const targets = tour.steps.map(step => step.target);
			
			if (!document.getElementById(targets[tour.currentStep]))
				for (let i = 0; i < targets.length; i++) {
					if (document.getElementById(targets[i])) {
						tour.currentStep = i;
						clearInterval(domWatcher);
						break;
					}
				}
				
			watchForStep(tour);
			this.render(tour);
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
