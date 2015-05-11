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

manywho.styling = (function (manywho) {

    var containers = {};
    
    return {
 
        getClasses: function (parentId, id, type, flowKey) {

            var container = manywho.model.getContainer(parentId, flowKey);
            var item = manywho.model.getItem(id, flowKey);
            var classes = [];

            if (container) {
                var containerType = container.containerType.toLowerCase();

                if (containers.hasOwnProperty(containerType)) {
                    classes = classes.concat(containers[containerType].call(this, item, container));
                }                
            }

            classes.push("mw-" + type.toLowerCase());

            if (manywho.model.isContainer(item)) {

                classes.push('clearfix');

            }

            return classes;

        },

        registerContainer: function (containerType, getClasses) {

            containers[containerType] = getClasses;

        }

    }

}(manywho));