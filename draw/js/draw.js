$(document).ready(function() {

    $('.element-button').draggable({
        helper: 'clone'
    });

    $('#graph').droppable({
        accept: '.element-button',
        drop: function (event, ui) {

            manywho.graph.addElement(null, 'Test', event.clientX - $(this).offset().left-50, event.clientY - $(this).offset().top-25, 100, 50);

        }
    });

    manywho.graph.initialize();



});
