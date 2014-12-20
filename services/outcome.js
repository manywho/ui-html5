manywho.service('outcomeCallback', function() {
    return {
        onClick: function(outcome) {
            alert('OUTCOME! ' + outcome.toString());   
        }
    }
});