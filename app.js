var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const moment = require("moment");
const escapeh = require("escape-html");



const sessions = require('express-session');
const MongoStore = require('connect-mongo')

const uri = "mongodb+srv://Ibrahim:ib130860011@cmrtcforum.dj6tu.mongodb.net/cmrtcforum2?retryWrites=true&w=majority";


mongoose.connect(/*'mongodb://localhost:27017/cmrtcforumnew'*/uri,
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
  }
).then(()=> {
    console.log("connected successfuly")})






var indexRouter = require('./routes/index');
var  userp = require('./routes/userProfile');
var AnswerRouter = require('./routes/newAnswer');
var commentRouter = require('./routes/newComment');
var questionRouter = require('./routes/newQuestion');
var allquestionRouter = require('./routes/allquestions');
var questiondetailRouter = require("./routes/questiondetail");
var voteRouter = require('./routes/newVote');
var signUpRouter = require("./routes/signup")
var loginRouter = require("./routes/login")
var tagRouter = require("./routes/tag")
var downloadRouter = require("./routes/upload")
var modifyRouter = require("./routes/modifyquestion")

var app = express();
app.locals.moment = moment;
app.locals.escapeh = escapeh;

const oneDay = 20000000000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  store: MongoStore.create({
    mongoUrl: uri/*'mongodb://localhost:27017/cmrtcforumnew'*/
  }),
  saveUninitialized: true,
  cookie: {
    maxAge: oneDay
  },
  resave: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userp);
app.use('/newVote', voteRouter);
app.use('/newQuestion', questionRouter);
app.use('/allquestions', allquestionRouter);
app.use('/questiondetail', questiondetailRouter);
app.use('/newAnswer', AnswerRouter);
app.use('/newComment', commentRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter)
app.use('/upload', downloadRouter)
app.use('/tags', tagRouter)
app.use('/modify', modifyRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err: {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;