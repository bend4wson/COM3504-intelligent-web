//

var express = require('express');
const Sighting = require("../databases/sightings");
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  // res.render('index', { title: 'Bird Watching Page' });
  // console.log("******")
  try {
    const sightings = await Sighting.find();
    res.render('index', { sightings });
  } catch (error) {
    console.error('Error fetching sightings:', error);
    res.status(500).send('Internal Server Error');
  }
});


//This needs implementing if we're doing a dashboard page
router.get('/dashboard', function(req, res, next) {
  res.render('index', {title: 'Bird Watching Page'});
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration Page' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});

module.exports = router;
