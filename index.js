var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var shortId = require('shortid');

var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db = low(adapter);

db.defaults({ books: [] })
  .write();

var booksDb = db.get('books');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send("Hello codersx");
})


app.get('/books', function (req, res) {
  res.render('index', {
    books: booksDb.value()
  })
})

app.get('/books/search', function (req, res) {
  var q = req.query.q;
  var mathchedbooks = booksDb.value().filter(function (book) {
    return book.name.toLowerCase().indexOf(q.toLocaleLowerCase()) != -1
  });
  res.render('index', {
    books: mathchedbooks,
    q: q
  })
  console.log(req.query);
})

app.get('/books/create', function (req, res) {
  res.render('books/create')

})

app.get('/books/:id', function (req, res) {
  var id = req.params.id;

  var book = booksDb.find({ id: id }).value();

  res.render('books/view', {
    book: book
  })
})

app.get('/books/:id/delete', function (req, res) {
  var id = req.params.id;

  var book = booksDb.remove({ id: id }).write();

  res.redirect('/books')
})

app.post('/books/create', function (req, res) {
  req.body.id = shortId.generate();
  console.log(req.body);
  booksDb.push(req.body).write();

  res.redirect('/books')
})

app.listen(3000, function () {
  console.log('Server running at port', port)
})