var express = require('express');
var router = express.Router();
var shortId = require('shortid');
var db = require('../db');
//Index

var booksDb = db.get('books');

router.get('/', function (req, res) {
  res.render('books/index', {
    books: booksDb.value()
  })
})

//Search
router.get('/search', function (req, res) {
  var q = req.query.q;
  var mathchedbooks = booksDb.value().filter(function (book) {
    return book.name.toLowerCase().indexOf(q.toLocaleLowerCase()) != -1
  });
  res.render('books/index', {
    books: mathchedbooks,
    q: q
  })
  console.log(req.query);
})

//New Create

router.get('/create', function (req, res) {
  res.render('books/create')

})

//View
router.get('/:id', function (req, res) {
  var id = req.params.id;

  var book = booksDb.find({ id: id }).value();

  res.render('books/view', {
    book: book
  })
})

//Delete

router.get('/:id/delete', function (req, res) {
  var id = req.params.id;

  booksDb.remove({ id: id }).write();

  res.redirect('/books')
})

router.post('/create', function (req, res) {
  req.body.id = shortId.generate();
  console.log(req.body);
  booksDb.push(req.body).write();

  res.redirect('/books')
})

//UPDATE

router.get('/:id/update', function (req, res) {
  var id = req.params.id
  res.render('books/update-title', {
    id: id
  })
})

router.post('/:id/update', function (req, res) {
  var newTitle = req.body.title;
  console.log(req.body);
  booksDb
    .find({ id: req.body.id })
    .assign({ title: newTitle })
    .write()

  res.redirect('/books');
})

module.exports = router;