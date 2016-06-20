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

    function setPropertyValue(objectData, id, propertyId, value) {

        return objectData.map(function (item) {

            item.properties = item.properties.map(function (prop) {

                if (manywho.utils.isEqual(prop.typeElementPropertyId, propertyId, true)
                    && manywho.utils.isEqual(item.externalId, id, true)) {

                    (Array.isArray(value)) ? prop.objectData = value : prop.contentValue = value;

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

            var columns = [];

            if (self.props.model.isMultiSelect && this.props.objectData) {

                var checkboxAttributes = { type: 'checkbox', onChange: self.props.selectAll, ref: 'selectAll' };

                checkboxAttributes.checked = this.props.selectedRows.length == this.props.totalObjectData ? 'checked' : '';

                columns.push(React.DOM.th({ className: 'checkbox-cell' }, [
                    React.DOM.input(checkboxAttributes)
                ]));

            } else if (manywho.utils.isEqual(self.props.model.attributes.radio, "true", true)) {

                columns.push(React.DOM.th({  }));

            }

            columns = columns.concat(displayColumns.map(function(column) {

                if (column == 'mw-outcomes') {

                    return React.DOM.th({className: 'table-outcome-column', key: 'actions'}, 'Actions');

                }
                else {

                    var headerAttributes = { id: column.developerName, key: 'header-' + column.developerName };

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

            return React.DOM.tr(null, columns);

        },

        onOutcomeClick: function (e, outcome) {

            if (this.props.isDesignTime)
                return;

            var objectDataId = e.currentTarget.parentElement.getAttribute('data-item');
            this.props.onOutcome(objectDataId, outcome.id);

        },

        onCellEditCommitted: function(id, propertyId, value) {

            var objectData = setPropertyValue(this.props.objectData, id, propertyId, value);
            manywho.state.setComponent(this.props.id, { objectData: objectData }, this.props.flowKey, false);

        },

        renderRows: function (flowKey, objectData, outcomes, displayColumns, selectedRows, onRowClicked, outcomeDisplay) {

            var outcomeComponent = manywho.component.getByName('outcome');

            return objectData.map(function (item) {

                var isSelected = selectedRows.filter(function(row) { return manywho.utils.isEqual(item.externalId, row.externalId, true) }).length > 0;

                var classes = [
                    (isSelected) ? 'info' : ''
                ];

                var columns = [];

                if (this.props.model.isMultiSelect) {

                    var checked = isSelected ? 'checked': '';

                    columns.push(React.DOM.td({ className: 'checkbox-cell' }, [
                        React.DOM.input({ id: item.externalId ,type: 'checkbox', checked: checked })
                    ]));

                } else if (manywho.utils.isEqual(this.props.model.attributes.radio, "true", true)) {

                    var checked = isSelected ? 'checked': '';

                    columns.push(React.DOM.td({ className: 'checkbox-cell' }, [
                        React.DOM.input({ id: item.externalId, value: item.externalId, type: 'radio', checked: checked })
                    ]));

                }

                columns = columns.concat(displayColumns.map(function (column) {

                    if (column == 'mw-outcomes') {

                        return React.DOM.td({ className: 'table-outcome-column', 'data-item': item.externalId, key: item.externalId + column }, outcomes.map(function (outcome) {

                            return React.createElement(outcomeComponent, { id: outcome.id, key: outcome.id, onClick: this.onOutcomeClick, flowKey: flowKey, outcomeDisplay: manywho.settings.global('outcomes', this.props.flowKey) || outcomeDisplay.outcomes }, null);

                        }, this));

                    }
                    else {

                        var selectedProperty = item.properties.filter(function (property) {

                            return property.typeElementPropertyId == column.typeElementPropertyId;

                        })[0];

                        if (!manywho.utils.isNullOrWhitespace(column.typeElementPropertyToDisplayId)) {

                            if (selectedProperty != null && selectedProperty.objectData != null) {

                                selectedProperty = selectedProperty.objectData[0].properties.filter(function (childProperty) {

                                    return childProperty.typeElementPropertyId == column.typeElementPropertyToDisplayId;

                                })[0];

                            }

                        }

                        if (selectedProperty) {

                            if (this.props.isFiles &&
                                (manywho.utils.isEqual(selectedProperty.typeElementPropertyId, manywho.settings.global('files.downloadUriPropertyId'), true)
                                || manywho.utils.isEqual(selectedProperty.developerName, manywho.settings.global('files.downloadUriPropertyName'), true))) {

                                var attributes = { href: selectedProperty.contentValue, target: '_blank' };
                                var buttonClasses = ['btn', 'btn-sm'];

                                if (manywho.utils.isNullOrWhitespace(selectedProperty.contentValue)) {

                                    buttonClasses.push('btn-default');
                                    attributes.disabled = 'disabled';

                                } else {

                                    buttonClasses.push('btn-info');

                                }

                                attributes.className = buttonClasses.join(' ');

                                return React.DOM.td(null, React.DOM.a(attributes, 'Download'));

                            }
                            else if (!manywho.utils.isNullOrWhitespace(column.componentType)) {

                                return React.DOM.td({ id: column.typeElementPropertyId, key: column.typeElementPropertyId },
                                    React.createElement(manywho.component.getByName(column.componentType), {
                                        id: item.externalId,
                                        propertyId: column.typeElementPropertyId,
                                        contentValue: selectedProperty.contentValue,
                                        objectData: selectedProperty.objectData,
                                        onCommitted: this.onCellEditCommitted,
                                        flowKey: this.props.flowKey,
                                        isEditable: column.isEditable,
                                        contentType: column.contentType,
                                        contentFormat: column.contentFormat
                                    })
                                );

                            }
                            else if (column.isEditable) {

                                return React.DOM.td({ id: column.typeElementPropertyId, key: column.typeElementPropertyId, className: 'editable' },
                                    React.createElement(manywho.component.getByName('table-input'), {
                                        id: item.externalId,
                                        propertyId: column.typeElementPropertyId,
                                        value: selectedProperty.contentValue,
                                        contentType: column.contentType,
                                        contentFormat: column.contentFormat,
                                        onCommitted: this.onCellEditCommitted
                                    })
                                );

                            }
                            else {

                                return React.DOM.td({ id: column.typeElementPropertyId, key: column.typeElementPropertyId, onClick: column.isEditable && this.onCellClick },
                                    React.DOM.span(null, selectedProperty.contentValue)
                                );

                            }

                        } else {

                            return React.DOM.td({ key: column.typeElementPropertyId }, '');

                        }

                    }

                }, this));

                return React.DOM.tr({ className: classes, id: item.externalId, key: item.externalId, onClick: onRowClicked }, columns);

            }, this);

        },

        getInitialState: function() {

            return {}

        },

        componentDidUpdate: function() {
            var selectAll = ReactDOM.findDOMNode(this.refs.selectAll);
            if (selectAll)
                selectAll.indeterminate = (this.props.selectedRows.length > 0 && this.props.selectedRows.length !== this.props.totalObjectData);
        },

        render: function () {

            manywho.log.info('Rendering Table-Large');

            var isValid = (this.props.model.isValid !== undefined) ? this.props.model.isValid : this.props.isDesignTime && true;

            var tableClassNames = [
                'table',
                (this.props.model.attributes.borderless && manywho.utils.isEqual(this.props.model.attributes.borderless, "true", true)) ? '' : 'table-bordered',
                (this.props.model.attributes.striped && manywho.utils.isEqual(this.props.model.attributes.striped, "true", true)) ? 'table-striped' : '',
                (this.props.isSelectionEnabled) ? 'table-hover' : '',
                (isValid) ? '' : 'table-invalid'
            ].join(' ');

            var rows = [this.renderHeaderRow(this.props.displayColumns)];
            rows = rows.concat(this.renderRows(this.props.flowKey, this.props.objectData || [], this.props.outcomes, this.props.displayColumns, this.props.selectedRows, this.props.onRowClicked, this.props.model.attributes));

            return React.DOM.div({ className: 'table-responsive' },
                React.DOM.table({ className: tableClassNames },
                    React.DOM.tbody(null, rows)
                )
            );
        }

    });

    manywho.component.register("mw-table-large", tableLarge);

}(manywho));
