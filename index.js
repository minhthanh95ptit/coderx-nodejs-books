var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');
var tranRoute = require('./routes/transaction.route');
var authRoute = require('./routes/auth.route');

var cookieMiddleware = require('./middlewares/cookie.middleware');
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static('public'));

app.use(cookieMiddleware);

app.get('/', function (req, res) {
  res.render('index');
})

app.use('/books', bookRoute);
app.use('/users', userRoute);
app.use('/transactions', tranRoute);
app.use('/auth', authRoute);

app.listen(3000, function () {
  console.log('Server running at port', port)
})