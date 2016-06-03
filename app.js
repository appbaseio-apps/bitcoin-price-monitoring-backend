// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var Appbase = require('appbase-js')
var config = require('./config')
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// ROUTES FOR OUR API
// =============================================================================

app.post('/alert', function(req, res) {

  var appbaseRef = new Appbase({
    url: 'https://scalr.api.appbase.io',
    appname: config.appname,
    username: config.username,
    password: config.password
  });

  var requestObject = {
    type: config.type,
    body: {
      "query": {
        "range": {
          "last": {
            "gte": parseFloat(req.body.gteParam),
            "lte": parseFloat(req.body.lteParam)
          }
        }
      }
    }
  }

  var mailBodyContent = "You had set the price alert for Bitcoin price alert. Your condition has been matched and Price has reached to {{{last}}}";
  var sendgridRequestBody = 'to=' + req.body.email + '&amp;subject=Your Bitcoin price Alert&amp;text=' + mailBodyContent + '&amp;from=yash@appbase.io'

  var webhookObject = {
    'method': 'POST',
    'url': 'https://api.sendgrid.com/api/mail.send.json',
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + config.sendgridKey
    },
    "count": 1,
    'string_body': sendgridRequestBody
  }

  appbaseRef.searchStreamToURL(requestObject, webhookObject).on('data', function(response) {
    console.log("Webhook has been configured : ", response);
  }).on('error', function(error) {
    console.log("searchStreamToURL() failed with: ", error)
  });
});


// START THE SERVER
// =============================================================================
var server = app.listen(process.env.PORT || 5001, '0.0.0.0', function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
