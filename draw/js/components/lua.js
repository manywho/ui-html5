(function (manywho) {

    manywho.lua = React.createClass({

        hideModal: function (event) {

            manywho.draw.model.setLuaCode('');
            manywho.draw.hideModal(null, 'draw_draw_draw_main');

        },

        render: function () {

            var luaCode = manywho.draw.model.getLuaCode();

            return React.DOM.div({ className: 'modal-container', id: 'build_build_build_modal'}, [
                React.DOM.div({ className: 'modal-backdrop in full-height' }, null),
                React.DOM.div({ className: 'modal show' }, [
                    React.DOM.div({ className: 'modal-dialog full-screen' }, [
                        React.DOM.div({ className: 'modal-content full-screen' }, [
                            React.DOM.div({ className: 'modal-header' }, [
                                React.DOM.h4({ className: 'modal-title' }, 'Lua Code'),
                                React.DOM.span({}, 'Please copy the generated lua code')
                            ]),
                            React.DOM.div({ className: 'modal-body' }, [
                                React.DOM.textarea({ className: 'lua-placeholder' }, luaCode)
                            ]),
                            React.DOM.div({ className: 'modal-footer' }, [
                                React.DOM.button({ className: 'btn btn-default', onClick: this.hideModal }, 'Close')
                            ])
                        ])
                    ])
                ])
            ]);

        }

    });

})(manywho);