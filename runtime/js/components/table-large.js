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

    function getPropertyValue(objectData, id, propertyId) {

        return objectData.filter(function (item) {

            return manywho.utils.isEqual(item.externalId, id, true);

        })
        [0].properties.filter(function (item) {

            return manywho.utils.isEqual(item.typeElementPropertyId, propertyId, true);

        })
        [0].contentValue;

    }

    function setPropertyValue(objectData, id, propertyId, value) {

        return objectData.map(function (item) {

            item.properties = item.properties.map(function (prop) {

                if (manywho.utils.isEqual(prop.typeElementPropertyId, propertyId, true)
                    && manywho.utils.isEqual(item.externalId, id, true)) {

                    prop.contentValue = value;

                }

                return prop;

            });

            return item;

        });

    }

    function isTableEditable(columns) {

        return columns.filter(function(column) {

            return column.isEditable;

        }).length > 0;

    }

    var tableLarge = React.createClass({

        renderHeaderRow: function(displayColumns) {

            var self = this;

            return React.DOM.tr(null, displayColumns.map(function(column) {

                if (column == 'mw-outcomes') {

                    return React.DOM.th({className: 'table-outcome-column'}, 'Actions');

                }
                else {

                    var headerAttributes = { id: column.developerName };

                    if (self.props.onHeaderClick) {

                        headerAttributes['onClick'] = self.props.onHeaderClick;

                    }

                    var headerChildren = [ column.label ];

                    if (!manywho.utils.isNullOrWhitespace(self.props.lastSortedBy) && self.props.lastSortedBy == column.developerName) {

                        var iconClasses = 'table-header-icon glyphicon ';
                        iconClasses += self.props.sortByOrder == 'ASC' ? 'glyphicon-menu-down' : 'glyphicon-menu-up';

                        headerChildren.push(React.DOM.span({ className: iconClasses }))

                    }

                    return React.DOM.th(headerAttributes, headerChildren);

                }

            }));

        },

        onOutcomeClick: function (e, outcome) {

            var objectDataId = e.target.parentElement.getAttribute('data-item');
            this.props.onOutcome(objectDataId, outcome.id);

        },

        onCellClick: function(e) {

            e.preventDefault();
            e.stopPropagation();

            if (this.state.currentCellEdit) {

                var id = this.state.currentCellEdit.split('|')[1];
                var propertyId = this.state.currentCellEdit.split('|')[0];

                var value = this.state.currentCellEditValue;
                if (value) {

                    value = value.trim();

                }

                var objectData = setPropertyValue(this.props.objectData, id, propertyId, value);
                manywho.state.setComponent(this.props.id, { objectData: objectData }, this.props.flowKey, false);

            }

            this.setState({
                currentCellEdit: e.currentTarget.id + '|' + e.currentTarget.parentElement.id,
                currentCellEditValue: getPropertyValue(this.props.objectData, e.currentTarget.parentElement.id, e.currentTarget.id)
            });

        },

        onCellChanged: function(e) {

            this.setState({ currentCellEditValue: e.currentTarget.value })

        },

        onCellKeyUp: function(e) {

            if (e.keyCode == 13) {

                e.preventDefault();
                e.stopPropagation();

                if (this.state.currentCellEdit) {

                    var id = this.state.currentCellEdit.split('|')[1];
                    var propertyId = this.state.currentCellEdit.split('|')[0];

                    var value = this.state.currentCellEditValue;
                    if (value) {

                        value = value.trim();

                    }

                    var objectData = setPropertyValue(this.props.objectData, id, propertyId, value);
                    manywho.state.setComponent(this.props.id, { objectData: objectData }, this.props.flowKey, false);

                    this.setState({
                        currentCellEdit: null,
                        currentCellEditValue: null
                    });

                }

            }

        },

        renderRows: function (flowKey, objectData, outcomes, displayColumns, selectedRows, onRowClicked) {

            var outcomeComponent = manywho.component.getByName('outcome');

            return objectData.map(function (item) {

                var classes = [
                    (selectedRows.indexOf(item.externalId) != -1) ? 'info' : ''
                ];

                var onClick = !isTableEditable(displayColumns) && onRowClicked;

                return React.DOM.tr({ className: classes, id: item.externalId, onClick: onClick }, displayColumns.map(function (column) {

                    if (column == 'mw-outcomes') {

                        return React.DOM.td({ className: 'table-outcome-column', 'data-item': item.externalId }, outcomes.map(function (outcome) {

                            return React.createElement(outcomeComponent, { id: outcome.id, onClick: this.onOutcomeClick, flowKey: flowKey }, null);

                        }, this));

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

                            if (this.props.isFiles &&
                                (manywho.utils.isEqual(selectedProperty.typeElementPropertyId, manywho.settings.global('files.downloadUriPropertyId'), true)
                                || manywho.utils.isEqual(selectedProperty.developerName, manywho.settings.global('files.downloadUriPropertyName'), true))) {

                                return React.DOM.td(null, React.DOM.a({ href: selectedProperty.contentValue, className: 'btn btn-info btn-sm' }, 'Download'));

                            }
                            else if (manywho.utils.isEqual(this.state.currentCellEdit, column.typeElementPropertyId + '|' + item.externalId, true)) {

                                return React.DOM.td({ id: column.typeElementPropertyId },
                                    React.DOM.input({ className: 'form-control input-sm', onChange: this.onCellChanged, onKeyUp: this.onCellKeyUp, ref: 'cellEditor', value: this.state.currentCellEditValue })
                                );

                            }
                            else {

                                return React.DOM.td({ id: column.typeElementPropertyId, onClick: column.isEditable && this.onCellClick },
                                    React.DOM.span(null, selectedProperty.contentValue)
                                );

                            }

                        }

                    }

                }, this));

            }, this);

        },

        getInitialState: function() {

            return {}

        },

        componentDidUpdate: function() {

            if (this.refs.cellEditor) {

                this.refs.cellEditor.getDOMNode().focus();

            }

        },

        render: function () {

            manywho.log.info('Rendering Table-Large');

            var tableClassNames = [
                'table table-bordered',
                (this.props.isSelectionEnabled) ? 'table-hover' : '',
                (this.props.model.isValid) ? '' : 'table-invalid'
            ].join(' ');

            var rows = [this.renderHeaderRow(this.props.displayColumns)];
            rows = rows.concat(this.renderRows(this.props.flowKey, this.props.objectData || [], this.props.outcomes, this.props.displayColumns, this.props.selectedRows, this.props.onRowClicked));

            return React.DOM.div({ className: 'table-responsive' },
                React.DOM.table({ className: tableClassNames },
                    React.DOM.tbody(null, rows)
                )
            );
        }

    });

    manywho.component.register("table-large", tableLarge);

}(manywho));
