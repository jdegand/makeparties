const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const indexRouter = require('./routes/index');
const eventsRouter = require('./routes/events');
//const rsvpsRouter = require('./routes/rsvps');

const mongoDb = "MONGO CONNECTION STRING W/ USERNAME PASSWORD DATABASE GOES HERE";

mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true }); 

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

//const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const { engine } = require('express-handlebars');
//const Handlebars = require('handlebars'); 
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

//app.engine('handlebars', engine({ extname: '.handlebars', defaultLayout: "main", handlebars: allowInsecurePrototypeAccess(Handlebars)}));
//app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/events', eventsRouter);
//app.use('/events/:id/rsvps', rsvpsRouter);

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
