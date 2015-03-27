manywho.graph.style = (function() {

    var styles = {};

    return {

        registerBaseStyle: function (graph)  {

            var baseStyle = {};

            baseStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_LABEL;
            baseStyle[mxConstants.STYLE_ROUNDED] = true;
            baseStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
            baseStyle[mxConstants.STYLE_RESIZABLE] = 0;
            baseStyle[mxConstants.STYLE_OVERFLOW] = 'hidden';
            baseStyle[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
            baseStyle[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
            baseStyle[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_MIDDLE;
            baseStyle['portimage'] = 'https://cdn.manywho.com/extensions/glyphicons/outcomeport.png';
            baseStyle[mxConstants.STYLE_FONTFAMILY] = '"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif';
            baseStyle[mxConstants.STYLE_FONTSIZE] = '12';
            baseStyle[mxConstants.STYLE_FONTCOLOR] = '#ffffff';
            baseStyle[mxConstants.STYLE_FILLCOLOR] = '#888888';
            baseStyle[mxConstants.STYLE_STROKECOLOR] = '#999999';
            baseStyle[mxConstants.STYLE_SPACING_LEFT] = 20;
            baseStyle[mxConstants.STYLE_SPACING_RIGHT] = 20;

            styles['base'] = baseStyle;

            graph.getStylesheet().putCellStyle('base', styles['base']);

        },

        registerBaseOutcomeStyle: function (graph) {

            graph.connectionHandler.getConnectImage = function (cell) {

                return new mxImage(cell.style['portimage'], 16, 16);

            };
            // Centers the port icon on the target port
            graph.connectionHandler.targetConnectImage = true;

        },

        registerStartStyle: function (graph) {

            var startStyle = {};

            startStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
            startStyle[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
            startStyle[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_CENTER;
            startStyle[mxConstants.STYLE_FILLCOLOR] = '#52A652';
            startStyle[mxConstants.STYLE_STROKECOLOR] = '#52A652';
            startStyle[mxConstants.STYLE_SPACING_LEFT] = 4;
            startStyle[mxConstants.STYLE_SPACING_RIGHT] = 4;

            styles['start'] = $.extend({}, styles['base'], startStyle);

            graph.getStylesheet().putCellStyle('start', styles['start']);

        },

        registerStepStyle: function (graph) {

            var stepStyle = {};

            stepStyle[mxConstants.STYLE_IMAGE_WIDTH] = '16';
            stepStyle[mxConstants.STYLE_IMAGE_HEIGHT] = '24';
            stepStyle[mxConstants.STYLE_IMAGE] = 'https://cdn.manywho.com/extensions/glyphicons/glyphicons_242_google_maps_white.png';
            stepStyle[mxConstants.STYLE_FILLCOLOR] = '#0099CC';
            stepStyle[mxConstants.STYLE_STROKECOLOR] = '#0099CC';

            styles['step'] = $.extend({}, styles['base'], stepStyle);

            graph.getStylesheet().putCellStyle('step', styles['step']);

        },

        registerPageStyle: function (graph) {

            var pageStyle = {};

            pageStyle[mxConstants.STYLE_IMAGE_WIDTH] = '22';
            pageStyle[mxConstants.STYLE_IMAGE_HEIGHT] = '22';
            pageStyle[mxConstants.STYLE_IMAGE] = 'https://cdn.manywho.com/extensions/glyphicons/glyphicons_156_show_thumbnails_white.png';
            pageStyle[mxConstants.STYLE_FILLCOLOR] = '#33B5E5';
            pageStyle[mxConstants.STYLE_STROKECOLOR] = '#33B5E5';

            styles['input'] = $.extend({}, styles['base'], pageStyle);

            graph.getStylesheet().putCellStyle('input', styles['input']);

        },

        registerDecisionStyle: function (graph) {

            var decisionStyle = {};

            decisionStyle[mxConstants.STYLE_IMAGE_WIDTH] = '26';
            decisionStyle[mxConstants.STYLE_IMAGE_HEIGHT] = '26';
            decisionStyle[mxConstants.STYLE_IMAGE] = 'https://cdn.manywho.com/extensions/glyphicons/glyphicons_198_ok_white.png';
            decisionStyle[mxConstants.STYLE_FILLCOLOR] = '#9933CC';
            decisionStyle[mxConstants.STYLE_STROKECOLOR] = '#9933CC';

            styles['decision'] = $.extend({}, styles['base'], decisionStyle);

            graph.getStylesheet().putCellStyle('decision', styles['decision']);

        },

        getElementStyleByName: function (style) {

            return styles[style];

        },

        initialize : function (graph) {

            this.registerBaseStyle(graph);
            this.registerBaseOutcomeStyle(graph);
            this.registerStartStyle(graph);
            this.registerStepStyle(graph);
            this.registerPageStyle(graph);
            this.registerDecisionStyle(graph);

        }

    };

})(manywho);