//

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bird Watching Page' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration Page' });
});

router.get('/add_sighting', function(req, res, next) {
  res.render('addSighting', { title: 'Add a new Sighting' });
});

module.exports = router;
