const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();

app.set('views', './templates');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(session({
  secret: 'my-secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: 'strict'
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.render('index', {
    isValidSession: req.session.isValid,
    username: req.session.username
  });
});

app.get('/session/new', function (req, res) {
  req.session.isValid = true;
  req.session.username = 'Helton';
  req.session.email = 'helton@xxx.com';
  res.redirect('/');
});

app.post('/purchase', function (req, res) {
  if (req.session.isValid && req.body.dvdCode) {
    res.render('index', {
      isValidSession: req.session.isValid,
      username: req.session.username,
      purchaseMessage: 'Pagamento realizaDO.'
    });
  } else {
    res.redirect('/');
  }
});




app.listen(port, () => console.log(`The server is listening at http://localhost:${port}`));

