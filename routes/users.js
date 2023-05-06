// Will contain specific functionality for the users route, such as handling user registration,
// login, and other user-related actions.

var express = require('express');
const Users = require("../databases/users");
const Sighting = require("../databases/sightings");
var router = express.Router();

router.get('/register', async (req, res) => {
    // console.log("1 *******");
    res.render('register', {
        title: 'Register',
        errorMessage: null
    });
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const newUser = new Users({ username, password });
    await newUser.save();
    console.log("SUBMITTED");
    res.redirect('/login');
});

//Need to update this and create a login page
router.get('/login', async (req, res) => {
    // res.render('register', { title: 'Registration Page' });
    res.render('index', { title: 'Bird Watching Page' });
});

router.post('/login', async (req, res) => {
    // res.render('register', { title: 'Registration Page' });
    const user = await Users.findOne({ username: req.body.username })
    if (!user || !user.validatePassword(req.body.password)) {
        res.render('login', { title: 'login', message: 'Invalid username or password' });
        return;
    }
    let sightings = await Sighting.find();
    res.render('index', { title: 'Bird Watching Page', user: user, sightings: sightings });
});


module.exports = router;
