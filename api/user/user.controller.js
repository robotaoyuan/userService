'use strict';

var User = require('./user.model');
var _ = require("lodash");

var handleError = function(res, err){
    return res.json(500, err);
}

/**
* Get list of users
*/
exports.list = function(req, res) {
    User.find({}, '-salt -hashedPassword -__v', function (err, users) {
        if(err) return handleError(res,err);
        res.json(200, users);
    });
};

/**
* Creates a new user
*/
exports.create = function (req, res, next) {


    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {

        if (err) return handleError(res, err);

        res.json(user._id);
    });
};

/**
* Get a single user
*/
exports.get = function (req, res, next) {

    var userId = req.params.id;

    User.findById(userId, '-salt -hashedPassword -__v', function (err, user) {
        if (err) return handleError(res,err);
        if (!user) return res.send(401);
        res.json(user);
    });
};

/**
* Deletes a user
*/
exports.delete = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if(err) return handleError(res,err);
        return res.status(200).json({});
    });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    User.findById(req.params.id, '-salt -hashedPassword -__v',function (err, user) {

        if (err) {
            return handleError(res, err);
        }

        if(!user) {
            return res.send(404);
        }

        var updated = _.merge(user, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, user);
        });
    });
};
