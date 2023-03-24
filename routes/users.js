// Will contain specific functionality for the users route, such as handling user registration,
// login, and other user-related actions.

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('resource response will go here');
});

module.exports = router;