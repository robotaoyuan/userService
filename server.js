'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }


// Setup server
var app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var server = require('http').createServer(app);

require('./routes')(app);

server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});
