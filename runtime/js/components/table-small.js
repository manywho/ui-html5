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

    function centerChevrons() {

        var chevrons = document.querySelectorAll('.table-small-chevron');

        for (var i = 0; i < chevrons.length; i++) {

            var $chevron = $(chevrons[i]);
            var parentHeight = $chevron.parent().height();

            $chevron.css('margin-top', ((parentHeight / 2) - ($chevron.height() / 2)) + 'px');

        }

    }

    var tableSmall = React.createClass({

        onOutcomeClick: function(e, outcome) {

            var objectDataId = e.target.parentElement.getAttribute('data-item');
            this.props.onOutcome(objectDataId, outcome.id);

        },

        onItemClick: function(e) {

            var objectDataId = e.currentTarget.getAttribute('data-item');
            var outcomeId = e.currentTarget.getAttribute('data-outcome');

            this.props.onOutcome(objectDataId, outcomeId);

        },

        componentDidUpdate: centerChevrons,

        componentDidMount: centerChevrons,

        renderRows: function(objectData, outcomes, displayColumns) {

            var outcomeComponent = manywho.component.getByName('outcome');

            return objectData.map(function (item) {

                var classNames = ['list-group-item', 'clearfix'];
                if (this.props.selectedRows.indexOf(item.externalId) != -1) {

                    classNames.push('active');

                }

                var attributes = {
                    className: classNames.join(' '),
                    href: '#',
                    id: item.externalId,
                    'data-item': item.externalId
                };

                var isOutcomeDestructive = outcomes.filter(function (outcome) {

                    return manywho.utils.isEqual(outcome.pageActionBindingType, 'remove', true)
                        || manywho.utils.isEqual(outcome.pageActionBindingType, 'delete', true);

                }).length > 0;

                var chevron = null;

                if (outcomes.length == 1 && !isOutcomeDestructive) {

                    attributes['data-outcome'] = outcomes[0].id;
                    attributes.onClick = this.onItemClick;
                    chevron = React.DOM.span({ className: 'glyphicon glyphicon-chevron-right table-small-chevron' }, null);

                }

                if (outcomes.length != 1) {

                    attributes.onClick = this.props.onRowClicked;

                }

                return React.DOM.a(attributes, [
                    React.DOM.table({ className: 'table table-small-item' },
                        React.DOM.tbody(null,
                             displayColumns.map(function (column) {

                                if (column == 'mw-outcomes') {

                                    if (outcomes.length > 1 || isOutcomeDestructive) {

                                        return React.DOM.tr(null, [
                                            React.DOM.th({ className: 'table-small-column table-small-label' }, 'Actions'),
                                            React.DOM.td({ className: 'table-small-column', 'data-item': item.externalId, 'data-model': model.id }, outcomes.map(function (outcome) {

                                                return React.createElement(outcomeComponent, { id: outcome.id, onClick: this.onOutcomeClick }, null);

                                            }))
                                        ]);

                                    }

                                }
                                else {

                                    var selectedProperty = item.properties.filter(function (property) {

                                        return property.typeElementPropertyId == column.typeElementPropertyId;

                                    })[0];

                                    if (!manywho.utils.isNullOrWhitespace(column.typeElementPropertyToDisplayId)) {

                                        if (selectedProperty.objectData != null) {

                                            selectedProperty = selectedProperty.objectData[0].properties.filter(function (childProperty) {

                                                return childProperty.typeElementPropertyId == column.typeElementPropertyToDisplayId;

                                            })[0];

                                        }

                                    }

                                    if (selectedProperty) {

                                        var element = React.DOM.span(null, selectedProperty.contentValue);

                                        if (this.props.isFiles &&
                                            (manywho.utils.isEqual(selectedProperty.typeElementPropertyId, manywho.settings.global('files.downloadUriPropertyId'), true)
                                            || manywho.utils.isEqual(selectedProperty.developerName, manywho.settings.global('files.downloadUriPropertyName'), true))) {

                                            element = React.DOM.a({ href: selectedProperty.contentValue, className: 'btn btn-info' }, 'Download');

                                        }

                                        return React.DOM.tr(null, [
                                            React.DOM.th({ className: 'table-small-column table-small-label' }, column.label),
                                            React.DOM.td({ className: 'table-small-column' }, element)
                                        ]);

                                    }

                                }

                            }, this)
                        )
                    ),
                    chevron
                ]);

            }, this);

        },

        render: function () {

            manywho.log.info('Rendering Table-Small');

            var items = this.renderRows(this.props.objectData || [], this.props.outcomes, this.props.displayColumns);
            return React.DOM.div({ className: 'list-group' }, items);

        }

    });

    manywho.component.register("table-small", tableSmall);

}(manywho));
