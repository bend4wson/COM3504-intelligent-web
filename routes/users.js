// Will contain specific functionality for the users route, such as handling user registration,
// login, and other user-related actions.

var express = require('express');
const Users = require("../databases/users");
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


module.exports = router;