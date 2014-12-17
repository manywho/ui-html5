manywho.service('outcome', function() {
    return {
        onClick: function(outcome) {
            alert('OUTCOME! ' + outcome.toString());   
        }
    }
});