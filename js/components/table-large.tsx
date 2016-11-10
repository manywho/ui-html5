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
        return columns.filter(column => column.isEditable).length > 0;
    }

    const tableLarge = React.createClass({

        renderHeaderRow: function(displayColumns) {

            let columns = [];

            if (this.props.model.isMultiSelect && this.props.objectData) {

                const checkboxProps = { 
                    type: 'checkbox',
                    onChange: this.props.selectAll,
                    ref: 'selectAll',
                    checked: this.props.selectedRows.length == this.props.totalObjectData
                };

                columns.push(<th className="checkbox-cell"><input {...checkboxProps} /></th>);

            }
            else if (manywho.utils.isEqual(this.props.model.attributes.radio, "true", true))
                columns.push(<th></th>);

            columns = columns.concat(displayColumns.map(column => {

                if (column == 'mw-outcomes')
                    return <th className="table-outcome-column" key="actions">Actions</th>
                else {
                    const headerProps = {
                        id: column.developerName,
                        key: 'header-' + column.developerName,
                        onClick: (this.props.onHeaderClick) ? this.props.onHeaderClick : null
                    };

                    const headerChildren = [ column.label ];

                    if (!manywho.utils.isNullOrWhitespace(this.props.lastSortedBy) && this.props.lastSortedBy == column.developerName) {

                        let iconClassName = 'table-header-icon glyphicon ';
                        iconClassName += this.props.sortByOrder == 'ASC' ? 'glyphicon-menu-down' : 'glyphicon-menu-up';

                        headerChildren.push(<span className={iconClassName}></span>);
                    }

                    return <th {...headerProps}>{headerChildren}</th>
                }
            }));

            return <tr>{columns}</tr>
        },

        onOutcomeClick: function(e, outcome) {
            const objectDataId = e.currentTarget.parentElement.getAttribute('data-item');
            this.props.onOutcome(objectDataId, outcome.id);
        },

        onCellEditCommitted: function(id, propertyId, value) {
            var objectData = setPropertyValue(this.props.objectData, id, propertyId, value);
            manywho.state.setComponent(this.props.id, { objectData: objectData }, this.props.flowKey, false);
        },

        renderRows: function (flowKey, objectData, outcomes, displayColumns, selectedRows, onRowClicked, outcomeDisplay) {
            const outcomeComponent = manywho.component.getByName('outcome');

            return objectData.map(item => {
                const isSelected = selectedRows.filter(function(row) { return manywho.utils.isEqual(item.externalId, row.externalId, true) }).length > 0;

                const className = (isSelected) ? 'info' : null;

                let columns = [];

                if (this.props.model.isMultiSelect)
                    columns.push(<td className="checkbox-cell">
                        <input id={item.externalId} type="checkbox" checked={isSelected}></input>
                    </td>)
                else if (manywho.utils.isEqual(this.props.model.attributes.radio, "true", true))
                    columns.push(<td className="checkbox-cell">
                        <input id={item.externalId} type="radio" checked={isSelected}></input>
                    </td>)

                columns = columns.concat(displayColumns.map(column => {

                    if (column == 'mw-outcomes')
                        return <td className="table-outcome-column" key={item.externalId + column} dataItem={item.externalId}>
                            {outcomes.map(outcome => React.createElement(outcomeComponent, { id: outcome.id, key: outcome.id, onClick: this.onOutcomeClick, flowKey: flowKey, display: outcomeDisplay.outcomes }, null))}
                        </td>
                    else {
                        var selectedProperty = item.properties.find(property => property.typeElementPropertyId == column.typeElementPropertyId);

                        if (!manywho.utils.isNullOrWhitespace(column.typeElementPropertyToDisplayId)) {

                            if (selectedProperty != null && selectedProperty.objectData != null)
                                selectedProperty = selectedProperty.objectData[0].properties.find(childProperty => childProperty.typeElementPropertyId == column.typeElementPropertyToDisplayId);
                        }

                        if (selectedProperty) {

                            if (this.props.isFiles &&
                                (manywho.utils.isEqual(selectedProperty.typeElementPropertyId, manywho.settings.global('files.downloadUriPropertyId'), true)
                                || manywho.utils.isEqual(selectedProperty.developerName, manywho.settings.global('files.downloadUriPropertyName'), true))) {

                                const props: any = { href: selectedProperty.contentValue, target: '_blank' };
                                const buttonClasses = ['btn', 'btn-sm'];

                                if (manywho.utils.isNullOrWhitespace(selectedProperty.contentValue)) {
                                    buttonClasses.push('btn-default');
                                    props.disabled = 'disabled';
                                } 
                                else
                                    buttonClasses.push('btn-info');

                                props.className = buttonClasses.join(' ');

                                return <td><a {...props}>Download</a></td>
                            }
                            else if (!manywho.utils.isNullOrWhitespace(column.componentType))
                                return <td id={column.typeElementPropertyId} key={column.typeElementPropertyId}>
                                    {
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
                                    }
                                </td>
                            else if (column.isEditable)
                                return <td id={column.typeElementPropertyId} key={column.typeElementPropertyId}>
                                    {
                                        React.createElement(manywho.component.getByName('table-input'), {
                                            id: item.externalId,
                                            propertyId: column.typeElementPropertyId,
                                            value: selectedProperty.contentValue,
                                            contentType: column.contentType,
                                            contentFormat: column.contentFormat,
                                            onCommitted: this.onCellEditCommitted
                                        })
                                    }
                                </td>
                            else {
                                let contentValue = manywho.formatting.format(selectedProperty);
                                
                                return <td id={column.typeElementPropertyId} key={column.typeElementPropertyId} onClick={column.isEditable && this.onCellClick}>
                                    <span>{contentValue}</span>
                                </td>
                            }
                        }
                        else
                            return <td key={column.typeElementPropertyId}></td>
                    }

                }));

                return <tr className={className} id={item.externalId} key={item.externalId} onClick={onRowClicked}>{columns}</tr>
            });
        },

        getInitialState: function() {
            return {}
        },

        componentDidUpdate: function() {
            const selectAll: HTMLInputElement = ReactDOM.findDOMNode(this.refs.selectAll) as HTMLInputElement;
            if (selectAll)
                selectAll.indeterminate = (this.props.selectedRows.length > 0 && this.props.selectedRows.length !== this.props.totalObjectData);
        },

        render: function () {
            manywho.log.info('Rendering Table-Large');

            const isValid = (this.props.model.isValid !== undefined) ? this.props.model.isValid : this.props.isDesignTime && true;

            const tableClassName = [
                'table',
                (this.props.model.attributes.borderless && manywho.utils.isEqual(this.props.model.attributes.borderless, "true", true)) ? '' : 'table-bordered',
                (this.props.model.attributes.striped && manywho.utils.isEqual(this.props.model.attributes.striped, "true", true)) ? 'table-striped' : '',
                (this.props.isSelectionEnabled) ? 'table-hover' : '',
                (isValid) ? '' : 'table-invalid'
            ].join(' ');

            let rows = [this.renderHeaderRow(this.props.displayColumns)];
            rows = rows.concat(this.renderRows(this.props.flowKey, this.props.objectData || [], this.props.outcomes, this.props.displayColumns, this.props.selectedRows, this.props.onRowClicked, this.props.model.attributes));

            return <div className="table-responsive">
                <table className={tableClassName}>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        }

    });

    manywho.component.register("mw-table-large", tableLarge);

}(manywho));
