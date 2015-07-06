'use strict';

var User = require('./user.model');
var _ = require("lodash");
var UserApi = require("../userApi/userApi.model");


var handleError = function(res, err){
    return res.json(500, {error:err});
}

/**
* Get list of users
*/
exports.list = function(req, res) {

    var filter = {};
    if(req.query && req.query.email){
        filter.email = req.query.email;
    }

    User.find(filter, '-__v', function (err, users) {
        if(err) return handleError(res,"failed listing users "+err.message);
        res.json(200, users);
    });
};

/**
* Creates a new user
*/
exports.create = function (req, res, next) {


    var newApi = new UserApi({});
    newApi.save(function(err, api){

        if(err) return handleError(res, "failed creating api for user " +err.message);


        var newUser = new User(req.body);
        newUser.provider = 'local';
        newUser.role = 'user';
        newUser.userApi = api._id;

        newUser.save(function(err, user) {

            if (err) return handleError(res, "failed creating users: "+err.message);

            res.json({_id: user._id});

        });


    })




};

/**
* Get a single user
*/
exports.get = function (req, res, next) {

    var userId = req.params.id;


    User
    .findById(userId, '-salt -hashedPassword -__v')
    .populate('userApi')
    .exec(function (err, user) {
        if (err) return handleError(res,"failed getting specific users " +err.message);
        if (!user) return res.send(401);
        res.json(user);
    });
};

/**
* Deletes a user
*/
exports.delete = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if(err) return handleError(res,"failed deleting users "+err.message);
        return res.status(200).json({});
    });
};

// Updates an existing user in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    User.findById(req.params.id, '-salt -hashedPassword -__v',function (err, user) {

        if (err) {
            return handleError(res, "failed looking for users "+err.message);
        }

        if(!user) {
            return res.send(404);
        }

        var updated = _.merge(user, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, "failed updating users "+err.message); }
            return res.json(200, user);
        });
    });
};
