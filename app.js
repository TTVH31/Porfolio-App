var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// const db = require('./db/db');
// var mysql = require('mysql');
// require('dotenv').config()

// const conn = mysql.createConnection({
//   connectionLimit: 30,
//   host : process.env.DB_HOST,
//   user : process.env.DB_USER,
//   password : process.env.DB_PASS,
//   database : process.env.DB_NAME
// });

const { table } = require('console');

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(cors({ origin: '*' }));
app.use(cors());

//GET method
// app.get('/:id', (req, res) => {
//   const {id} = req.params;
//   res.json({ something: id});
// });

app.get('/ping', (req, res) => {
  res.send('pong');
})

app.get('/stock', async (req, res) => {
  try {
    let results = await db.all();
    res.json(results);
  } catch(e) {
      console.error(e);
      res.sendStatus(500);
  }
});

// POST method
app.post('/watchlist/create', (req, res, next) => {
  //req.body
  const watchlist = req.body.listname;
  console.log(watchlist);
  if(watchlist){
    conn.query("INSERT INTO watchlist ( watchlistName, watchlistUser) VALUE (?,?);", [ watchlist, "Thanh"],
      (err, results) => {
        if (err){
          console.error(err);
        }
        return res.json({
          status: 'success',
        });       
      }
      )
  }
  return res.json({message: "Fail to add watchlist"});
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handles any requests that don't match the ones above
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
