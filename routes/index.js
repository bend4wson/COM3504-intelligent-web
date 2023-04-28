//

var express = require('express');
const Sighting = require("../databases/sightings");
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let birds = await Sighting.find({})
  birds = birds.map(bird => ({
    ...bird.toJSON(),
    picture: `data:${bird.picture.contentType};base64,` +  Buffer.from(bird.picture.data).toString('base64')
  }))
  res.render('index', { title: 'Bird Watching Page', birds });
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
