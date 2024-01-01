var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session')
const noCache=require('nocache')


var app = express();

// db connection
require('dotenv').config();
const connetDB = require('./config/db')
connetDB();
app.use(noCache());
// caching middleware 
// app.use((req, res, next) => {
//   res.header('Cache-Control', 'no-store, no-cache, must-revalidate');
//   res.header('Pragma', 'no-cache');
//   res.header('Expires', '0');
//   next();
// });
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(session({
    secret: 'secrekeey',
    resave: false,
    maxAge: 1000 * 60 * 60,
    saveUninitialized: true
  }))
 app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
