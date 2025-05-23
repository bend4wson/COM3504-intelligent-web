const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Required imports and middleware for passport, including User model
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./databases/users');
const db = require('./databases/database');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sightingsRouter = require('./routes/sightings');
const Sighting = require("./databases/sightings");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport.js (middleware)
app.use(session({ secret: 'your-session-secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

//For the bird sighting form
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Configuring the Passport.js strategies, serializers and deserializers
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await Users.findOne({ username });
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
    const user = await Users.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sightings', sightingsRouter);


// Registration route
// app.post('/register', async (req, res) => {
//   const { username, password } = req.body;
//   const newUser = new Users({ username, password });
//   await newUser.save();
//   console.log(`Registered new user with username '${username}`);
//   res.redirect('/login');
// });

// Registration route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if the user with the given username already exists
  const existingUser = await Users.findOne({ username });

  if (existingUser) {
    // Render the registration page with an error message
    res.render('register', {
      title: 'Register',
      errorMessage: 'Username already taken. Please choose another one.'
    });
  } else {
    // Proceed with the registration process
    const newUser = new Users({ username, password });
    await newUser.save();
    console.log(`Registered new user with username '${username}'`);
    res.redirect('/login');
  }
});


// // Add Sighting route
// app.post('/add_sighting', async (req, res) => {
//   try {
//     console.log("****")
//     const newSighting = new Sighting(req.body);
//     await newSighting.save();
//     console.log("Sighting added successfully");
//     res.redirect('/');
//   } catch (error) {
//     console.log("!!!!")
//     console.error("Error adding sighting", error);
//     res.status(400).json({ message: 'Error adding sighting', error });
//   }
// });

// Login route
// app.post('/users/login', passport.authenticate('local', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/users/login',
//   failureFlash: true,
// }));

// Authentication-protected route
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  // Your dashboard route logic here
});



// app.get('/', async (req, res) => {
//   const sortOrder = req.query.sort === 'desc' ? -1 : 1;
//   const sightings = await Sighting.find().sort({ timestamp: sortOrder });
//   res.render('index', { sightings: sightings });
// });



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log(`User not authenticated`);
  res.redirect('/users/login');
}

// Catch 404 and forward to error handler

// app.use(function(req, res, next) {
//   console.log(`404 error: ${req.url}`);
//   next(createError(404));
// });
//
// // Error handler
// app.use(function(err, req, res, next) {
//   console.log(`Error: ${err.message}`);
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


app.use(function(req, res, next) {
  console.log('404 error handler');
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
