(function (manywho) {

    manywho.component.mixins.enterKeyHandler = {

        onEnter: function (e) {

            if (e.keyCode == 13) {

                var outcome = manywho.model.getOutcomes(null, this.props.flowKey)
                    .sort(function (a, b) {

                        return a.order - b.order;

                    })
                    .filter(function (outcome) {

                        return manywho.utils.isEqual(outcome.pageActionBindingType, 'save', true);

                    })[0];

                if (outcome) {

                    manywho.engine.move(outcome, this.props.flowKey);

                }

            }

        }

    }

}(manywho));
