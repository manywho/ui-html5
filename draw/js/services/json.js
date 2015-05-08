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

        }

    }

})(manywho);