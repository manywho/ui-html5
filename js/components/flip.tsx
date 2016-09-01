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

// Stolen From: http://davidwalsh.name/css-flip
(function (manywho) {

    var flip = React.createClass({

        toggleFlip: function () {
            this.setState({ isFlipped: !this.state.isFlipped });
        },

        getInitialState: function() {
            return {
                isFlipped: false,
                animationStyle: 'rotateY'
            }
        },

        render: function () {
            const model = manywho.model.getContainer(this.props.id, this.props.flowKey);
            const children = manywho.model.getChildren(this.props.id, this.props.flowKey);
            const childComponents = manywho.component.getChildComponents(children, this.props.id, this.props.flowKey);

            let className = 'flip-container clearfix';

            if (this.state.isFlipped)
                className += ' ' + this.state.animationStyle;

            return <div className={className}>
                <div className="flipper" onTouchEnd={this.toggleFlip} onClick={this.toggleFlip}>
                    <div className="front">
                        {childComponents[0]}
                    </div>
                    <div className="back">
                        {childComponents[1]}
                    </div> 
                </div>
            </div>
        }

    });

    manywho.component.registerContainer('flip', flip);

}(manywho));
