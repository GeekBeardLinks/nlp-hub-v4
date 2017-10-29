var n = require('../core/core.js');

var query = 'quiero cancelar mi taxi';


// First match: most cost-effective solution
n.firstMatch(query, function(response) {
    console.log(`The first detected intent was ${response.intent.name} according to ${response.engine}`);
});

/*
// Best match: most reliable solution
n.bestMatch(query, function(response){
    console.log(`The best detected intent was ${response.intent.name} according to ${response.engine}`);    
});


// Average match: most conservative solution
n.average(query, function(response){
    console.log(response);
});

// Regression match: most sophisticated solution
n.regressionMatch(query, function(response){
    console.log(response);
});
*/