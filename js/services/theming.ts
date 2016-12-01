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

manywho.theming = (function (manywho) {

    const themes = ['cerulean', 'cosmo', 'cyborg', 'darkly', 'flatly', 'journal', 'lumen', 'paper', 'readable', 'sandstone', 'simplex', 'slate', 'spacelab', 'superhero', 'united', 'yeti', 'sf1'];

    function loadTheme(url) {
        const link = document.getElementById('theme');
        const img = document.createElement('img');

        link.setAttribute('href', url);

        img.onerror = () => { manywho.log.info('Finished loading theme: ' + url) };
        img.src = url;
    }

    return {
        apply(name) {
            if (themes !== null && name && themes.indexOf(name) !== -1) {
                manywho.log.info("Switching theme to: " + name);
                loadTheme(manywho.cdnUrl + manywho.settings.theme('url') + '/mw-' + name + '.css');
            }
            else
                manywho.log.error(name + ' theme cannot be found');            
        },

        custom(url) {
            manywho.log.info('Switching to custom theme: ' + url);
            loadTheme(url);
        }
    }

})(manywho);
