var shortId = require('shortid');
var db = require('../db');

var transactions = db.get('transactions').value();
var books = db.get('books').value();
var users = db.get('users').value();


module.exports.index = function (req, res) {
  var changeTrans = transactions.map(function (trans) {
    var book = books.find(function (book) {
      if (book.id === trans.bookId) {
        return book.id;
      }
    })
    var user = users.find(function (user) {
      if (user.id === trans.userId) {
        return user.id;
      }
    })
    return {
      bookTitle: book.title,
      userName: user.name,
      id: trans.id,
      soluong: trans.soluong
    }
  })


  res.render('transactions/index', {
    transactions: changeTrans, books, users
  })
}

module.exports.create = function (req, res) {
  res.render('transactions/create', {
    books: books,
    users: users,
    isComplete: isComplete
  });
}

module.exports.postCreate = function (req, res) {
  req.body.id = shortId.generate();
  console.log(req.body);

  db.get("transactions")
    .push(req.body)
    .write();

  res.redirect('/transactions');
}

module.exports.delete = function (req, res) {
  console.log(req.params.id);
  db.get("transactions")
    .remove({ id: req.params.id })
    .write();

  res.redirect('/transactions');
}

module.exports.update = function (req, res) {
  console.log(transactions);
  var id = req.params.id;
  res.render('transactions/update', {
    transactions: transactions,
    books,
    users,
    id,

  })
}

module.exports.postUpdate = function (req, res) {
  console.log(req.body);

  db.get('transactions')
    .find({ id: req.body.id })
    .assign({
      bookId: req.body.bookId,
      userId: req.body.userId,
      soluong: req.body.soluong
    })
    .write()

  res.redirect('/transactions');
}