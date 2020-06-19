var shortId = require('shortid');
var db = require('../db');

var booksDb = db.get('books');

module.exports.index = function (req, res) {
  res.render('books/index', {
    books: booksDb.value()
  })
}

module.exports.search = function (req, res) {
  var q = req.query.q;
  var mathchedbooks = booksDb.value().filter(function (book) {
    return book.name.toLowerCase().indexOf(q.toLocaleLowerCase()) != -1
  });
  res.render('books/index', {
    books: mathchedbooks,
    q: q
  })
  console.log(req.query);
}

module.exports.create = function (req, res) {
  res.render('books/create')
}

module.exports.get = function (req, res) {
  var id = req.params.id;

  var book = booksDb.find({ id: id }).value();

  res.render('books/view', {
    book: book
  })
}

module.exports.delete = function (req, res) {
  var id = req.params.id;

  booksDb.remove({ id: id }).write();

  res.redirect('/books')
}

module.exports.postCreate = function (req, res) {
  req.body.id = shortId.generate();
  console.log(req.body);
  booksDb.push(req.body).write();

  res.redirect('/books')
}

module.exports.update = function (req, res) {
  var id = req.params.id
  res.render('books/update-title', {
    id: id
  })
}

module.exports.postUpdate = function (req, res) {
  var newTitle = req.body.title;
  console.log(req.body);
  booksDb
    .find({ id: req.body.id })
    .assign({ title: newTitle })
    .write()

  res.redirect('/books');
}