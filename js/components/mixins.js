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

(function (manywho) {

    manywho.component.mixins.enterKeyHandler = {

        onEnter: function (e) {

            if (e.keyCode == 13 && (e.target.className && e.target.className.indexOf('feed') == -1)) {

                var outcome = manywho.model.getOutcomes(null, this.props.flowKey)
                    .sort(function (a, b) {

                        return a.order - b.order;

                    })
                    .filter(function (outcome) {

                        return manywho.utils.isEqual(outcome.pageActionBindingType, 'save', true);

                    })[0];

                if (outcome) {

                    e.stopPropagation();
                    manywho.engine.move(outcome, this.props.flowKey);

                }

            }

        }

    }

}(manywho));
