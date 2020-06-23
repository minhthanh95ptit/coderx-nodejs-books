var express = require('express');
var router = express.Router();

var shortId = require('shortid');
var db = require('../db');

var usersDb = db.get('users');

module.exports.index = function (req, res) {
  res.render('users/index', {
    users: usersDb.value()
  })
}

module.exports.search = function (req, res) {
  var q = req.query.q;
  var matchedUsers = usersDb.value().filter(function (user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase() != -1)
  });

  res.render('users/index', {
    users: matchedUsers,
    q: q
  })
};
module.exports.create = function (req, res) {
  console.log(req.cookies);
  res.render('users/create');
};
module.exports.postCreate = function (req, res) {
  req.body.id = shortId.generate();

  console.log(req.body);
  usersDb.push(req.body).write();
};

module.exports.get = function (req, res) {
  var id = req.params.id;

  var user = usersDb.find({ id: id }).value();
  res.render('users/view', {
    user: user
  })
}

module.exports.delete = function (req, res) {
  usersDb
    .remove({ id: req.params.id })
    .write()
  res.redirect('/users');
}

module.exports.update = function (req, res) {
  var id = req.params.id
  res.render('users/update-info', {
    id: id
  });
}

module.exports.postUpdate = function (req, res) {
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
}