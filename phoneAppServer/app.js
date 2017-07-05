var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var cors          = require('cors');

var index         = require('./routes/index');
var phonesApi     = require('./routes/phones-api');

// database connection
// we need to require the full file including extensions .js
require('./configs/database.js');
var app = express();


/*

    The Cross-Origin Resource Sharing (CORS) mechanism gives web servers 
    cross-domain access controls, which enable secure cross-domain data transfers. 
    Modern browsers use CORS in an API container - such as XMLHttpRequest or Fetch 
    to mitigate risks of cross-origin HTTP requests.

    By default browsers block this kind of communication for security reasons, 
    so we need to configure our server in order to allow them.
*/
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*******************************************************/
//  ROUTES HERE ....
/*******************************************************/
app.use('/', index);
app.use('/api', phonesApi);






/******************************************************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
