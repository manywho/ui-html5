(function (manywho) {

    manywho.component.mixins.enterKeyHandler = {

        onEnter: function (e) {

            if (e.keyCode == 13 && (e.target.className && e.target.className.indexOf('feed') == -1)) {

                var outcome = manywho.model.getOutcomes(null, this.props.flowKey)
                    .sort(function (a, b) {

                        return a.order - b.order;

                    })
                    .filter(function (outcome) {

                        return manywho.utils.isEqual(outcome.pageActionBindingType, 'save', true);

                    })[0];

                if (outcome) {

                    e.stopPropagation();
                    manywho.engine.move(outcome, this.props.flowKey);

                }

            }

        }

    };

    manywho.component.mixins.collapse =  {

        getInitialState: function () {

            return {
                isVisible: true,
                icon: 'toggle-icon glyphicon glyphicon-menu-down'
            };

        },

        toggleVisibility: function (event) {

            event.preventDefault();

            if (manywho.settings.global('collapsable', this.props.flowKey)) {

                if (this.state.isVisible) {

                    this.setState({
                        isVisible: false,
                        icon: 'toggle-icon glyphicon glyphicon-menu-right'
                    });

                } else {

                    this.setState({
                        isVisible: true,
                        icon: 'toggle-icon glyphicon glyphicon-menu-down'
                    });

                }


            }

        },

        getContainerHeaderClasses: function () {

            return manywho.settings.global('collapsable', this.props.flowKey) ? 'container-label clickable-section' : 'container-label';

        }

    }

}(manywho));
