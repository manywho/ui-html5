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

    var recordings = React.createClass({

        render: function () {

            manywho.log.info('Rendering Recordings: ' + this.props.id);

            var recordings = manywho.recording.getAll();
            var entries = null;

            if (recordings != null &&
                recordings.length > 0) {

                entries = [];

                for (var i = 0; i < recordings.length; i++) {

                    entries.push(React.DOM.div(null, recordings[i].name));

                }

            }

            return React.DOM.div({ className: 'form-group' }, entries);

        }

    });

    manywho.component.register('recordings', recordings);

})(manywho);
