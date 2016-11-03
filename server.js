/*node modules*/
var express = require('express');
var bodyParser = require('body-parser');

/*creating an express app*/
var app = express();

/*use body-parser library for extracting data from URL*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

/*run test app to test mongoDB connection*/
require ("./test/app.js")(app);

/*run the node app*/
require("./assignment/app.js")(app);

var port = process.env.NODEJS_PORT || 3000;

/*start listening on the port*/
app.listen(port);
