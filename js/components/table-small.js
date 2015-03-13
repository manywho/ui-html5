(function (manywho) {

    var tableSmall = React.createClass({

        onOutcomeClick: function(e, outcome) {
            
            var objectDataId = e.target.parentElement.getAttribute('data-item');
            this.props.onOutcome(objectDataId, outcome.id);

        },

        onItemClick: function(e) {

            var objectDataId = e.currentTarget.getAttribute('data-item');
            var outcomeId = e.currentTarget.getAttribute('data-outcome');

            this.props.onOutcome(objectDataId, outcomeId);

        },

        componentDidUpdate: function() {

            var chevrons = document.querySelectorAll('.table-small-chevron');

            for (var i = 0; i < chevrons.length; i++) {
            
                var $chevron = $(chevrons[i]);
                var parentHeight = $chevron.parent().height();
                                
                $chevron.css('margin-top', ((parentHeight / 2) - ($chevron.height() / 2)) + 'px');

            }
            
        },

        renderRows: function(objectData, outcomes, displayColumns) {

            var outcomeComponent = manywho.component.getByName('outcome');

            return objectData.map(function (item) {

                var attributes = {
                    className: 'list-group-item clearfix',
                    href: '#',
                    'data-item': item.externalId
                }

                var isOutcomeDestructive = outcomes.filter(function (outcome) {

                    return manywho.utils.isEqual(outcome.pageActionBindingType, 'remove', true)
                        || manywho.utils.isEqual(outcome.pageActionBindingType, 'delete', true);

                }).length > 0;

                if (outcomes.length == 1 && !isOutcomeDestructive) {

                    attributes['data-outcome'] = outcomes[0].id;
                    attributes.onClick = this.onItemClick;

                }

                return React.DOM.a(attributes, [
                    React.DOM.table({ className: 'table table-small-item' }, displayColumns.map(function (column) {

                        if (column == 'mw-outcomes' && (outcomes.length > 1 || isOutcomeDestructive)) {

                            return React.DOM.tr(null, [
                                React.DOM.th({ className: 'table-small-column table-small-label' }, 'Actions'),
                                React.DOM.td({ className: 'table-small-column', 'data-item': item.externalId, 'data-model': model.id }, outcomes.map(function (outcome) {

                                    return React.createElement(outcomeComponent, { id: outcome.id, onClick: this.onOutcomeClick }, null);

                                }))
                            ]);

                        }
                        else {

                            var selectedProperty = item.properties.filter(function (property) {

                                return property.typeElementPropertyId == column.typeElementPropertyId

                            })[0];

                            if (selectedProperty) {

                                var element = React.DOM.span(null, selectedProperty.contentValue);

                                if (this.props.isFiles &&
                                    (manywho.utils.isEqual(selectedProperty.typeElementPropertyId, manywho.settings.global('files.downloadUriPropertyId'), true)
                                    || manywho.utils.isEqual(selectedProperty.developerName, manywho.settings.global('files.downloadUriPropertyName'), true))) {

                                    element = React.DOM.a({ href: selectedProperty.contentValue, className: 'btn btn-info' }, 'Download');

                                }

                                return React.DOM.tr(null, [
                                    React.DOM.th({ className: 'table-small-column table-small-label' }, column.label),
                                    React.DOM.td({ className: 'table-small-column' }, element)
                                ]);

                            }

                        }

                    }, this)),
                    React.DOM.span({ className: 'glyphicon glyphicon-chevron-right table-small-chevron' }, null)
                ]);

            }, this);

        },

        render: function () {

            log.info('Rendering Table-Small');
            
            var items = this.renderRows(this.props.model.objectData || [], this.props.outcomes, this.props.displayColumns);
            return React.DOM.div({ className: 'list-group' }, items);

        }

    });

    manywho.component.register("table-small", tableSmall);

}(manywho));