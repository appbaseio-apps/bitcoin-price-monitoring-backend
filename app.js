// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// START THE SERVER
// =============================================================================
var server = app.listen(process.env.PORT || 5001,'0.0.0.0', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
});
