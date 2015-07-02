'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');


// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }
