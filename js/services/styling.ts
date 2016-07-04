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

declare var manywho;

manywho.styling = (function (manywho) {

    var components = {};
    var containers = {};

    return {

        getClasses: function (parentId: string, id: string, type: string, flowKey: string) : Array<string> {
            const parent = manywho.model.getContainer(parentId, flowKey);
            const model = manywho.model.getItem(id, flowKey);
            let classes = [];

            classes.push("mw-" + type.toLowerCase());
            
            if (parent)  {
                const containerType = parent.containerType.toLowerCase();

                if (containers.hasOwnProperty(containerType))
                    classes = classes.concat(containers[containerType].call(this, model, parent));
            }
            
            if (model) {
                const type = model.componentType || model.containerType;

                if (!manywho.utils.isNullOrWhitespace(type)) {
                    const typeLowerCase = type.toLowerCase();

                    if (components.hasOwnProperty(typeLowerCase)) {
                        if (typeof components[typeLowerCase] === 'string' || components[typeLowerCase] instanceof String)
                            classes.push(components[typeLowerCase]);
                        else if ({}.toString.call(components[typeLowerCase]) == '[object Function]')
                            classes.push(components[typeLowerCase].call(this, model, parent));
                        else if (Array.isArray(components[typeLowerCase]))
                            classes = classes.concat(components[typeLowerCase]);
                    }
                }
            }

            if (model.attributes && !manywho.utils.isNullOrWhitespace(model.attributes.classes))
                classes.push(model.attributes.classes);

            if (manywho.model.isContainer(model))
                classes.push('clearfix');

            return classes;
        },

        registerContainer: function (containerType, classes) {
            containers[containerType.toLowerCase()] = classes;
        },

        registerComponent: function (componentType, classes) {
            components[componentType.toLowerCase()] = classes;
        },

    }

}(manywho));
