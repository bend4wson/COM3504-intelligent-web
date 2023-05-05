//

var express = require('express');
const Sighting = require("../databases/sightings");
var router = express.Router();

/* GET users listing. */
// router.get('/', async (req, res) => {
//   // res.render('index', { title: 'Bird Watching Page' });
//   // console.log("******")
//   try {
//     const sightings = await Sighting.find();
//     res.render('index', { sightings });
//   } catch (error) {
//     console.error('Error fetching sightings:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   const sightings = await Sighting.find();
//   res.render('index', { title: 'Bird Watching Page' , sightings});
// });

router.get('/', async (req, res) => {
  try {
    const sort = req.query.sort;
    const sortArgs = {};
    if (sort === "1") {
      sortArgs.timestamp = -1;
    }

    let sightings = await Sighting.find().sort(sortArgs);
    if (sort === "2") {
      sightings = sightings.sort((a, b) =>
        Math.sqrt(Math.pow(b.lat - b.location.lat, 2) + Math.pow(b.lng - b.location.lng, 2)) -
        Math.sqrt(Math.pow(a.lat - a.location.lat, 2) + Math.pow(a.lng - a.location.lng, 2))
      )
    }

    res.render('index', { title: 'Bird Watching Page', sightings });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data from the database');
  }
});


//This needs implementing if we're doing a dashboard page
router.get('/dashboard', function(req, res, next) {
  res.render('index', {title: 'Bird Watching Page'});
});


router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register',
    errorMessage: null
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});

module.exports = router;
