//

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bird Watching Page' });
});

// <<<<<<< HEAD

//This needs implementing if we're doing a dashboard page
router.get('/dashboard', function(req, res, next) {
  res.render('index', {title: 'Bird Watching Page'});
});


// =======
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration Page' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
// >>>>>>> origin/Zhonghao
});

module.exports = router;
