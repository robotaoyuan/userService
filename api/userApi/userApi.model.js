'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var crypto = require('crypto');



var UserApiSchema = new Schema({

    masterKey: String,
    dataLimit: {type:Number,default: 999999}

});

UserApiSchema
.pre('save', function(next) {
    if(!(this.masterKey && this.masterKey.length)){
        this.masterKey = crypto.randomBytes(16).toString('base64');
    }
    next();
});


module.exports = mongoose.model('UserApi', UserApiSchema);
