var express = require('express');
var router = express.Router();

var controller = require('../controllers/user.controller')
var validate = require('../validates/user.validate')
var authMiddleware = require('../middlewares/auth.middleware')

router.get('/', authMiddleware.requireAuth,controller.index)

router.get('/cookie', function (req, res, next) {
  res.cookie('user-id', 123456);
  res.send('Hello');
})

router.get('/search', controller.search)


router.get('/create', controller.create);

router.post('/create', validate.postCreate, controller.postCreate)


router.get('/:id', controller.get)

router.get('/:id/delete', controller.delete)

router.get('/:id/update', controller.update)

router.post('/:id/update', controller.postUpdate)

module.exports = router;