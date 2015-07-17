'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;
var crypto = require('crypto');


var UserSchema = new Schema({

    name: String,

    email: { type: String, lowercase: true },

    role: {
        type: String,
        default: 'user'
    },

    hashedPassword: String,
    provider: String,
    salt: String,

    userApi: {type: Schema.Types.ObjectId, ref:"UserApi"},

    profileHash: {type:String, default:"Fu3SJoN-tLWV8vMD2_WHnis9bYeM"},

});




/**
* Validations
*/

// Validate empty email
UserSchema
.path('email')
.validate(function(email) {
    return email.length;
}, 'Email cannot be blank');

// Validate empty password
UserSchema
.path('hashedPassword')
.validate(function(hashedPassword) {
    return hashedPassword.length;
}, 'Password cannot be blank');

// Validate email is not taken
UserSchema
.path('email')
.validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
        if(err) throw err;
        if(user) {
            if(self.id === user.id) return respond(true);
            return respond(false);
        }
        respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
* Pre-save hook
*/
UserSchema
.pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.hashedPassword)){

        next(new Error('Invalid password'));
    }

    else
    next();
});


module.exports = mongoose.model('User', UserSchema);
