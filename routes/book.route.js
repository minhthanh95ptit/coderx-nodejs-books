var express = require('express');
var router = express.Router();

var controller = require('../controllers/book.controller');


router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.get);

router.get('/:id/delete', controller.delete);

router.post('/create', controller.postCreate);

router.get('/:id/update', controller.update);

router.post('/:id/update', controller.postUpdate);

module.exports = router;