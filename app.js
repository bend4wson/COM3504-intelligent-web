const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


//Required imports and middleware for passport, including User model
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./databases/users');


const indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//Configuring Passport.js (middleware)
app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


//Configuring the Passport.js strategies, serializers and deserializers
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});



app.use('/', indexRouter);

app.use('/users', usersRouter);

// Registration route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  await newUser.save();
  res.redirect('/login');
});

// Login route
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
}));

// Authentication-protected route
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  // Your dashboard route logic here
});

app.get('/list', (req, res) => {
  res.render("list");
});

app.get('/detail', (req, res) => {
  res.render("detail");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


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
