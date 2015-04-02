manywho.graph.style = (function() {

    var styles = {};

    return {

        createBaseStyle: function ()  {

            var baseStyle = {};

            baseStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
            baseStyle[mxConstants.STYLE_ROUNDED] = true;
            baseStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            baseStyle[mxConstants.STYLE_RESIZABLE] = 0;
            baseStyle[mxConstants.STYLE_OVERFLOW] = 'hidden';
            baseStyle[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
            baseStyle[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
            baseStyle[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
            baseStyle['portimage'] = 'http://png-1.findicons.com/files/icons/1722/gnome_2_18_icon_theme/16/stock_draw_line_connector_ends_with_arrow.png';
            baseStyle[mxConstants.STYLE_FONTFAMILY] = '"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif';
            baseStyle[mxConstants.STYLE_FONTSIZE] = '12';
            baseStyle[mxConstants.STYLE_FONTCOLOR] = '#ffffff';
            baseStyle[mxConstants.STYLE_FILLCOLOR] = '#888888';
            baseStyle[mxConstants.STYLE_STROKECOLOR] = '#999999';
            baseStyle[mxConstants.STYLE_SPACING_LEFT] = 20;
            baseStyle[mxConstants.STYLE_SPACING_RIGHT] = 20;

            styles['base'] = baseStyle;

            this.registerStyle('base');

        },

        createBaseOutcomeStyle: function () {

            manywho.graph.getGraphObject().graph.connectionHandler.getConnectImage = function (cell) {

                return new mxImage(cell.style['portimage'], 16, 16);

            };
            // Centers the port icon on the target port
            manywho.graph.getGraphObject().graph.connectionHandler.targetConnectImage = true;

            var outcomeStyle = manywho.graph.getGraphObject().graph.getStylesheet().getDefaultEdgeStyle();

            outcomeStyle[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = '#FFFFFF';
            outcomeStyle[mxConstants.STYLE_STROKEWIDTH] = '2';
            outcomeStyle[mxConstants.STYLE_FONTFAMILY] = '"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif';
            outcomeStyle[mxConstants.STYLE_ROUNDED] = true;

        },

        createStartStyle: function () {

            var startStyle = {};

            startStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_DOUBLE_ELLIPSE;
            startStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
            startStyle[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
            startStyle[mxConstants.STYLE_FILLCOLOR] = '#52A652';
            startStyle[mxConstants.STYLE_STROKECOLOR] = '#52A652';
            startStyle[mxConstants.STYLE_SPACING_LEFT] = 4;
            startStyle[mxConstants.STYLE_SPACING_RIGHT] = 4;

            styles['start'] = $.extend({}, styles['base'], startStyle);

            this.registerStyle('start');

        },

        createStepStyle: function () {

            var stepStyle = {};

            stepStyle[mxConstants.STYLE_IMAGE_WIDTH] = '12';
            stepStyle[mxConstants.STYLE_IMAGE_HEIGHT] = '18';
            stepStyle[mxConstants.STYLE_IMAGE] = 'https://cdn.manywho.com/extensions/glyphicons/glyphicons_242_google_maps_white.png';
            stepStyle[mxConstants.STYLE_FILLCOLOR] = '#0099CC';
            stepStyle[mxConstants.STYLE_STROKECOLOR] = '#0099CC';

            styles['step'] = $.extend({}, styles['base'], stepStyle);

            this.registerStyle('step');

        },

        createPageStyle: function () {

            var pageStyle = {};

            pageStyle[mxConstants.STYLE_IMAGE_WIDTH] = '15';
            pageStyle[mxConstants.STYLE_IMAGE_HEIGHT] = '15';
            pageStyle[mxConstants.STYLE_IMAGE] = 'https://cdn.manywho.com/extensions/glyphicons/glyphicons_156_show_thumbnails_white.png';
            pageStyle[mxConstants.STYLE_FILLCOLOR] = '#33B5E5';
            pageStyle[mxConstants.STYLE_STROKECOLOR] = '#33B5E5';

            styles['input'] = $.extend({}, styles['base'], pageStyle);

            this.registerStyle('input');

        },

        createDecisionStyle: function () {

            var decisionStyle = {};

            decisionStyle[mxConstants.STYLE_IMAGE_WIDTH] = '15';
            decisionStyle[mxConstants.STYLE_IMAGE_HEIGHT] = '15';
            decisionStyle[mxConstants.STYLE_IMAGE] = 'https://cdn.manywho.com/extensions/glyphicons/glyphicons_198_ok_white.png';
            decisionStyle[mxConstants.STYLE_FILLCOLOR] = '#9933CC';
            decisionStyle[mxConstants.STYLE_STROKECOLOR] = '#9933CC';

            styles['decision'] = $.extend({}, styles['base'], decisionStyle);

            this.registerStyle('decision');

        },

        registerStyle: function (name) {

            manywho.graph.getGraphObject().graph.getStylesheet().putCellStyle(name, styles[name]);

        },

        getElementStyleByName: function (style) {

            return styles[style];

        },

        initialize : function (graph) {

            this.createBaseStyle();
            this.createBaseOutcomeStyle();
            this.createStartStyle();
            this.createStepStyle();
            this.createPageStyle();
            this.createDecisionStyle();

        }

    };

})(manywho);