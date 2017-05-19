var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var cors = require('cors')


var admin = require('./routes/admin');



var app = express();

const env = app.get('env');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.options('*', cors())


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json()); // 解析json
app.use(bodyParser.urlencoded({ extended: false })); // 解析表单
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const config = require(path.join(__dirname,'config','config.json'))[env]
const { session: sessionConfig } = config;

app.use(session(sessionConfig))


app.use('/api', admin);


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