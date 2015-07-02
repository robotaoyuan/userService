'use strict';
var router = require('express').Router();
var controller = require('./user.controller.js');
var model = require('./user.model.js');

router.get('/',  controller.list);
router.delete('/:id',  controller.delete);
router.put('/:id', controller.update);
router.get('/:id',  controller.get);
router.post('/', controller.create);

module.exports = router;
