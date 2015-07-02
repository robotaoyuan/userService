'use strict';
var router = require('express').Router();
var controller = require('./userApi.controller.js');
var model = require('./userApi.model.js');

router.delete('/:id',  controller.delete);
router.put('/:id', controller.update);
router.get('/:id',  controller.get);
router.post('/', controller.create);

module.exports = router;
