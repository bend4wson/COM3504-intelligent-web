//

var express = require('express');
const Users = require("../databases/users");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bird Watching Page' });
});

//This needs implementing if we're doing a dashboard page
router.get('/dashboard', function(req, res, next) {
  res.render('index', { title: 'Bird Watching Page' });
});

module.exports = router;
