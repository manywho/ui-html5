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

declare var manywho: any;

manywho.tours = (function (manywho) {

    let configs = {};

	const onRefresh = function(targets, tour, iteration) {
		if (iteration < 30) {
			for (let i = 0; i < targets.length; i++) {
				if (document.getElementById(targets[i])) {
					tour.currentStep = i;
					manywho.tours.render(tour);
					return;
				}
			}
			setTimeout(onRefresh, 200, targets, tour, iteration + 1);
		}		
	};

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
                        placement: 'left'
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
                    }					
                ]
            }
        },

        start(id: string, watchDOM: boolean, containerSelector: string) {
            const container = document.querySelector(containerSelector);
            
            if (container) {
                let tourContainer = container.querySelector('.mw-tours');
                if (!tourContainer) {
                    tourContainer = document.createElement('div');
                    tourContainer.className = 'mw-tours mw-bs';
                    container.appendChild(tourContainer);
                }

                if (!configs[id]) {
                    manywho.log.error(`A Tour with the id ${id} could not be found`);
                    return;
                }

                this.current = JSON.parse(JSON.stringify(configs[id]));
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

            this.render();
        },

        previous(tour = this.current) {
			if (!tour)
				return;

			tour.currentStep = Math.max(0, tour.currentStep - 1);
            this.render();
        },

		refresh(tour = this.current) {
			if (!tour)
				return;

			const targets = tour.steps.map(step => step.target);
			onRefresh(targets, tour, 0);
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
