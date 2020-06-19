var express = require('express');
var router = express.Router();
var shortId = require('shortid');
var db = require('../db');

var usersDb = db.get('users');

router.get('/', function (req, res) {
  res.render('users/index', {
    users: usersDb.value()
  })
})

router.get('/search', function (req, res) {
  var q = req.query.q;
  var matchedUsers = usersDb.value().filter(function (user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase() != -1)
  });

  res.render('users/index', {
    users: matchedUsers,
    q: q
  })
})


router.get('/create', function (req, res) {
  res.render('users/create');
})

router.post('/create', function (req, res) {
  req.body.id = shortId.generate();

  console.log(req.body);
  usersDb.push(req.body).write();
})


router.get('/:id', function (req, res) {
  var id = req.params.id;

  var user = usersDb.find({ id: id }).value();
  res.render('users/view', {
    user: user
  })
})

router.get('/:id/delete', function (req, res) {
  usersDb
    .remove({ id: req.params.id })
    .write()
  res.redirect('/users');
})

router.get('/:id/update', function (req, res) {
  var id = req.params.id
  res.render('users/update-info', {
    id: id
  });
})

router.post('/:id/update', function (req, res) {
  console.log(req.body.name);
  console.log(req.body.address);
  console.log(req.body.phone);

  usersDb
    .find({ id: req.body.id })
    .assign({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone
    })
    .write()

  res.redirect('/users');
})

module.exports = router;