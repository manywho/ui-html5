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

(function (manywho) {

    var pagination = React.createClass({

        render: function () {
            manywho.log.info("Rendering Pagination");

            return (<div className="mw-pagination">
                <button className="btn btn-default" onClick={this.props.onFirstPage} disabled={this.props.pageIndex <= 1 || this.props.isDesignTime}><span className="glyphicon glyphicon-backward" /></button>
                <button className="btn btn-default" onClick={this.props.onPrev} disabled={this.props.pageIndex <= 1 || this.props.isDesignTime}><span className="glyphicon glyphicon-chevron-left"/></button>
                <span className="page-counter">{this.props.pageIndex}</span>
                <button className="btn btn-default" onClick={this.props.onNext} disabled={!this.props.hasMoreResults || this.props.isDesignTime}><span className="glyphicon glyphicon-chevron-right"/></button>
            </div>);            
        }

    });

    manywho.component.register("mw-pagination", pagination);

}(manywho));