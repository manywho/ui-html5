/*!
The MIT License (MIT)

Copyright (c) 2015 Nik Butenko

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react")):"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?exports.ReactHeight=e(require("react")):t.ReactHeight=e(t.React)}(this,function(t){return function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return t[n].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";var n=r(1)["default"];t.exports=n},function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){var r={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n]);return r}Object.defineProperty(e,"__esModule",{value:!0});var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},s=r(2),a=n(s),u=r(3),p=a["default"].createClass({displayName:"ReactHeight",propTypes:{children:a["default"].PropTypes.node.isRequired,onHeightReady:a["default"].PropTypes.func.isRequired,hidden:a["default"].PropTypes.bool,dirty:a["default"].PropTypes.bool},getDefaultProps:function(){return{hidden:!1,dirty:!0}},getInitialState:function(){return{height:0,dirty:this.props.dirty}},componentDidMount:function(){var t=this,e=this.wrapper.clientHeight,r=!1;this.setState({height:e,dirty:r},function(){return t.props.onHeightReady(t.state.height)})},componentWillReceiveProps:function(t){var e=t.children,r=t.dirty;(e!==this.props.children||r)&&this.setState({dirty:!0})},shouldComponentUpdate:u.shouldComponentUpdate,componentDidUpdate:function(){var t=this,e=this.wrapper.clientHeight,r=!1;e===this.state.height?this.setState({dirty:r}):this.setState({height:e,dirty:r},function(){return t.props.onHeightReady(t.state.height)})},setWrapperRef:function(t){this.wrapper=t},render:function(){var t=this.props,e=(t.onHeightReady,t.dirty,t.hidden),r=t.children,n=i(t,["onHeightReady","dirty","hidden","children"]),s=this.state.dirty;return e&&!s?null:e?a["default"].createElement("div",{style:{height:0,overflow:"hidden"}},a["default"].createElement("div",o({ref:this.setWrapperRef},n),r)):a["default"].createElement("div",o({ref:this.setWrapperRef},n),r)}});e["default"]=p},function(e,r){e.exports=t},function(t,e,r){"use strict";var n=r(4),i={shouldComponentUpdate:function(t,e){return n(this,t,e)}};t.exports=i},function(t,e,r){"use strict";function n(t,e,r){return!i(t.props,e)||!i(t.state,r)}var i=r(5);t.exports=n},function(t,e){"use strict";function r(t,e){return t===e?0!==t||1/t===1/e:t!==t&&e!==e}function n(t,e){if(r(t,e))return!0;if("object"!=typeof t||null===t||"object"!=typeof e||null===e)return!1;var n=Object.keys(t),o=Object.keys(e);if(n.length!==o.length)return!1;for(var s=0;s<n.length;s++)if(!i.call(e,n[s])||!r(t[n[s]],e[n[s]]))return!1;return!0}var i=Object.prototype.hasOwnProperty;t.exports=n}])});