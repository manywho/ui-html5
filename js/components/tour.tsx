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

declare var manywho: any;
declare var Tether: any;

manywho.tours = (function (manywho) {

    let configs = {};

    class Tour extends React.Component<any, any> {

        domWatcher: number;
        tether: any;

        constructor(props) {
            super(props);
            this.state = {
                isVisible: false,
                style: null
            }
        }

        onInterval() {
            if (!this.state.isVisible && document.getElementById(this.props.tour.steps[this.props.tour.currentStep].target)) {
                this.setState({ isVisible: true });
                // setTimeout(() => {
                //     this.tether = new Tether({
                //         element: this.refs['step'],
                //         target: document.getElementById(this.props.tour.steps[this.props.tour.currentStep].target),
                //         attachment: 'top right',
                //         targetAttachment: 'top left'
                //     });
                //     this.forceUpdate();
                // }, 10);
            }
        }

        componentWillReceiveProps(nextProps) {
            if (this.props.stepIndex !== nextProps.stepIndex)
                this.setState({ isVisible: false });
        }

        componentDidMount() {
            if (this.props.watchDOM)
                this.domWatcher = setInterval(() => { this.onInterval() }, 1000);
        }

        componentDidUpdate(prevProps, prevState) {
            if (prevState.isVisible === false && this.state.isVisible) {
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
                }

                this.setState({ style });
            }
        }

        componentWillUnMount() {
            if (this.props.watchDOM)
                clearInterval(this.domWatcher);
        }

        render() {
            if (!this.state.isVisible)
                return null;

            const step = this.props.tour.steps[this.props.tour.currentStep];
            const className = "mw-tour-step popover " + step.placement;          

            return <div className={className} ref="step" style={this.state.style}>
                <div className="arrow" />
                {manywho.utils.isNullOrWhitespace(step.title) ? null :  <div className="popover-title">{step.title}</div>}
                <div className="popover-content">
                    <p>{step.content}</p>
                </div>
            </div>
        }
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
                        placement: 'left'
                    },
                    {
                        target: '33f9d00a-c705-44d6-8122-fb33634d1319',
                        content: 'content',
                        placement: 'bottom',
                        center: false
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

                ReactDOM.render(<Tour tour={this.current} watchDOM={watchDOM} stepIndex={0} />, tourContainer);
                return this.current;
            }
            else
                manywho.log.error(`A Container matching the selector ${containerSelector} could not be found when attempting to start a Tour`);
        },

        next(tour) {
            if (manywho.utils.isNullOrUndefined(tour))
                tour = this.current;

            if (tour.currentStep + 1 >= tour.steps.length)
                manywho.tours.done(tour);
            else
                tour.currentStep++;

            this.render();
        },

        previous(tour) {
            if (manywho.utils.isNullOrUndefined(tour))
                tour = this.current;

            if (tour.currentStep > 0)
                tour.currentStep = 0;

            this.render();
        },

        done(tour) {
            this.current = null;
            ReactDOM.unmountComponentAtNode(document.querySelector('.mw-tours'));
        },

        render(tour) {
            if (manywho.utils.isNullOrUndefined(tour))
                tour = this.current;

            ReactDOM.render(<Tour tour={this.current} stepIndex={this.current.step} />, document.querySelector('.mw-tours'));
        }
    }

})(manywho);
