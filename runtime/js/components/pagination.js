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

    var pagination = React.createClass({

        render: function () {

            manywho.log.info("Rendering Pagination");
            
            var previousAttributes = { className: 'btn btn-default', onClick: this.props.onPrev };
            if (this.props.pageIndex <= 1) {

                previousAttributes.disabled = 'disabled';

            }

            var nextAttributes = { className: 'btn btn-default', onClick: this.props.onNext };
            if (!this.props.hasMoreResults) {

                nextAttributes.disabled = 'disabled';

            }

            return React.DOM.div({ className: this.props.containerClasses }, [
                React.DOM.button(previousAttributes,
                    React.DOM.span({ className: 'glyphicon glyphicon-chevron-left' }, null)
                ),
                React.DOM.span({ className: 'page-counter' }, this.props.pageIndex),
                React.DOM.button(nextAttributes,
                    React.DOM.span({ className: 'glyphicon glyphicon-chevron-right' }, null)
                )
            ])
            
        }

    });

    manywho.component.register("pagination", pagination);

}(manywho));