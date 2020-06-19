var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send("Hello codersx");
})

app.use('/books', bookRoute);
app.use('/users', userRoute);

app.listen(3000, function () {
  console.log('Server running at port', port)
})