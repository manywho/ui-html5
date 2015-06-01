manywho.draw.json = (function () {

    return {

        buildPageComponents: function (components) {

            return components.map(function (component) {

                return {
                    "id": null,
                    "isEditable": false,
                    "valueElementValueBindingReferenceId": null,
                    "valueElementDataBindingReferenceId": null,
                    "objectDataRequest": null,
                    "fileDataRequest": null,
                    "imageUri": null,
                    "pageContainerId": null,
                    "pageContainerDeveloperName": "Corvisa.Lua.Code",
                    "developerName": component.name,
                    "componentType": component.type,
                    "content": component.content,
                    "label": component.name,
                    "columns": null,
                    "size": 0,
                    "maxSize": 0,
                    "height": 0,
                    "width": 0,
                    "isRequired": false,
                    "isMultiSelect": false,
                    "isSearchable": false,
                    "hintValue": "",
                    "helpInfo": "",
                    "order": component.order,
                    "attributes": component.attributes,
                    "tags": null
                }

            });

        },

        buildPageMetadata: function (name, components, pageId) {

            return {
                "label": name,
                "pageContainers": [{
                    "id": null,
                    "containerType": "Corvisa.Lua.Code",
                    "developerName": "Corvisa.Lua.Code",
                    "label": "",
                    "pageContainers": null,
                    "order": 0,
                    "attributes": null,
                    "tags": null
                }],
                "pageComponents": this.buildPageComponents(components),
                "pageConditions": null,
                "stopConditionsOnFirstTrue": false,
                "attributes": null,
                "tags": null,
                "updateByName": false,
                "id": pageId || null,
                "elementType": "PAGE_LAYOUT",
                "developerName": name,
                "developerSummary": ""
            }

        },

        buildValueMetadata: function (name, type, defaultContent, defaultObjectData, typeElementId) {

            return {
                "isFixed": true,
                "access": "PRIVATE",
                "contentType": "Content" + type.charAt(0).toUpperCase() + type.slice(1),
                "defaultContentValue": defaultContent || null,
                "defaultObjectData": defaultObjectData || null,
                "initializationOperations": null,
                "typeElementId": typeElementId || null,
                "updateByName": false,
                "id": null,
                "elementType": "VARIABLE",
                "developerName": name,
                "developerSummary": null
            }

        },

        buildDecisionMetadata: function (name, x, y, outcomes, id) {

            return {

                "developerName": name,
                "developerSummary": "",
                "elementType": "decision",
                "groupElementId": null,
                "id": id || null,
                "outcomes": outcomes || null,
                "pageElementId": null,
                "x": x,
                "y": y

            };

        },

        buildDecisionOutcomes: function (item, newValue, outcome1, outcome2) {

            return [
                {
                    "id": outcome1 || null,
                    "developerName": "decide",
                    "developerSummary": null,
                    "label": "decide",
                    "nextMapElementId": item.mapElement1,
                    "pageActionType": null,
                    "isBulkAction": false,
                    "pageActionBindingType": "SAVE",
                    "pageObjectBindingId": null,
                    "order": 0,
                    "comparison": {
                        "comparisonType": "AND",
                        "rules": [
                            {
                                "leftValueElementToReferenceId": {
                                    "id": item.gather,
                                    "typeElementPropertyId": null,
                                    "command": null
                                },
                                "criteriaType": item.comparison,
                                "rightValueElementToReferenceId": {
                                    "id": newValue,
                                    "typeElementPropertyId": null,
                                    "command": null
                                }
                            }
                        ],
                        "comparisons": null,
                        "order": 0
                    },
                    "flowOut": null
                },
                {
                    "id": outcome2 || null,
                    "developerName": "decide",
                    "developerSummary": null,
                    "label": "decide",
                    "nextMapElementId": item.mapElement2,
                    "pageActionType": null,
                    "isBulkAction": false,
                    "pageActionBindingType": "SAVE",
                    "pageObjectBindingId": null,
                    "order": 1,
                    "comparison": null,
                    "flowOut": null
                }
            ];

        }

    }

})(manywho);