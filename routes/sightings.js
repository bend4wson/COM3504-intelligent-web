const express = require('express');
const router = express.Router();
const Sighting = require('../databases/sightings');
const Users = require("../databases/users");

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// router.get('/', async (req, res) => {
//     // res.render('index', { title: 'Bird Watching Page' });
//     try {
//         const sightings = await Sighting.find();
//         res.render('index', { sightings });
//     } catch (error) {
//         console.error('Error fetching sightings:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

router.post('/add_sighting', upload.single('picture'), async (req, res) => {
    try {

        const newSightingData = {
            type: req.body.type,
            description: req.body.description,
            location: {
                lat: req.body.lat,
                lng: req.body.lng,
            },
        };

        if (req.file) {
            newSightingData.picture = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
        }

        const newSighting = new Sighting(newSightingData);
        await newSighting.save();
        console.log("Sighting added successfully");
        res.redirect('/');
    } catch (error) {
        console.error("Error adding sighting", error);
        res.status(400).json({ message: 'Error adding sighting', error });
    }
});

router.get('/add_sighting', function(req, res, next) {
    res.render('addSighting', { title: 'Add a new Sighting' });
});

router.get('/detail', (req, res) => {
    res.render("detail", { title: 'Bird Detail Page' });
});

module.exports = router;