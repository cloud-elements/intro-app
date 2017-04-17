"use strict";

const bodyParser = require('body-parser');
// const http = require("http");
// const https = require("https");
const express = require("express");
// const url = require("url");
// const util = require('util');
const cors = require('cors');
const request = require('request');


var app = express();

//insert these values - best practice is to keep secrets hidden in a config file and not expose to the client side
var envURL = 'https://staging.cloud-elements.com/elements/api-v2';
var ngrok = "secure-local-port"; //also add callback redirect URI in the SFDC app
var authHeader = 'User CloudElementsUserToken, Organization CloudElementsOrgToken';
var sfdcKey = "";
var sfdcSecret = "";
var sfdcToken = "";
var authHeaderSFDC;

var contact = {};


app.use(cors());
// app.use('/',function(req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     // Request headers you wish to allow
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     // Set to true if you need the website to include cookies in the requests sent
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     // Pass to next layer of middleware
//     next();
// });

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });


app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.sendFile('index.html', {root : './public'});
});

app.get('/getSFDCKeys', (req, res) => {
  res.send({"key" : sfdcKey, "secret" : sfdcSecret, "callback" : ngrok + '/callback'});
});

//after the Salesforce Oauth flow, Salesforce redirects to the callback back.  Retrieve the code in the URL to create the credentialed instance.
app.get('/callback', (req, res) => {

    const code = req.query.code;
    console.log(code);

    var request_body = {
              "element": {
                "key": "sfdc"
              },
              "providerData": {
                "code": code
              },
              "configuration": {
                "oauth.callback.url": ngrok + '/callback',
                "oauth.api.key": sfdcKey,
                "oauth.api.secret": sfdcSecret,
                "event.objects": "Contact",
                "event.poller.refresh_interval": "1",
                "event.notification.enabled": "true",
                "event.vendor.type": "polling",
                "event.notification.callback.url": ngrok + "/sfdcEvent"
              },
              "tags": [
                "OptionalTag"
              ],
              "name": "Credentialed Instance of SFDC"
          };

    var options = {
        uri: envURL + '/instances',
        json: request_body,
        method: 'POST',
        headers: {
           'Authorization': authHeader
          }
      };

   request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        // Print out the response body
        console.log(body);
        sfdcToken=response.body.token;
        console.log("token", sfdcToken);
        authHeaderSFDC  = authHeader + ' Element ' + sfdcToken;
        console.log("authHeader", authHeaderSFDC);
    }
  });

    res.redirect('/');
});

//this is the route that will receive the webhooks from Cloud Elements when something has changed in Salesforce
//when the webhook is received, the object is retreived by ID from Salesforce
app.post('/sfdcEvent', (req, res) => {
    var id = req.body.message.events[0].objectId;
    console.log(id);

        var options = {
        uri: envURL + '/hubs/crm/commonContact/' + id,
        method: 'GET',
        headers: {
           'Authorization': authHeaderSFDC
          }
      };

   request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        // Print out the response body
        console.log(response.body);
        contact = response.body;
    }
    else{
      console.log(error);
      console.log(response.body);
    }
  });

   req.on('error', (e) => {
      console.error(e);
   });
 });

//this route retrieves the contact for which a webhook was sent by Cloud Elements
app.get('/contactEvent', (req, res) => {
  res.send(contact);
});

//this route creates a contact - it is currently using the transformation commonContact which has 3 fields: firstname, lastname, and email
app.post('/createContact', (req, res) => {
    console.log("authHeaderSFDC", authHeaderSFDC);

    var options = {
        uri: envURL + '/hubs/crm/commonContact',
        json: req.body,
        method: 'POST',
        headers: {
           'Authorization': authHeaderSFDC
          }
      };

   request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        console.log(response.body);
    }
    else{
      console.log(error);
      console.log(response.body);
    }
  });

   req.on('error', (e) => {
      console.error(e);
   });
 });



app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000!');
});
