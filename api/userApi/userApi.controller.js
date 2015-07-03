'use strict';

var _ = require('lodash');
var UserApi = require('./userApi.model');


exports.get = function(req, res) {
    UserApi.findById(req.params.id, function (err, userApi) {
        if(err) { return handleError(res, err); }
        if(!userApi) { return res.send(404); }
        return res.json(userApi);
    });
};

exports.create = function(req, res) {
    UserApi.create(req.body, function(err, userApi) {
        if(err) { return handleError(res, err); }
        return res.json(201, userApi);
    });
};

exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    UserApi.findById(req.params.id, function (err, userApi) {
        if (err) { return handleError(res, err); }
        if(!userApi) { return res.send(404); }
        var updated = _.merge(userApi, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, userApi);
        });
    });
};

exports.delete = function(req, res) {
    UserApi.findById(req.params.id, function (err, userApi) {
        if(err) { return handleError(res, err); }
        if(!userApi) { return res.send(404); }
        userApi.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err.message);
}
