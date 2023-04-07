const express = require('express');
const router = express.Router();
const Sighting = require('../databases/sightings');
const Users = require("../databases/users");

// const multer = require('multer');
// const upload = multer(); // We will use memory storage for the file upload

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Example endpoint to create a new sighting
// router.post('/create', async (req, res) => {
//     try {
//         const newSighting = new Sighting(req.body);
//         await newSighting.save();
//         res.status(201).json({ message: 'Sighting added successfully', data: newSighting });
//     } catch (error) {
//         res.status(400).json({ message: 'Error adding sighting', error });
//     }
// });

// router.post('/add_sighting', async (req, res) => {
//     try {
//         console.log("****")
//         const newSighting = new Sighting(req.body);
//         await newSighting.save();
//         console.log("Sighting added successfully");
//         res.redirect('/');
//     } catch (error) {
//         console.log("!!!!")
//         console.error("Error adding sighting", error);
//         res.status(400).json({ message: 'Error adding sighting', error });
//     }
// });

router.get('/', async (req, res) => {
    console.log("!!");
    res.render('index', { title: 'Bird Watching Page' });
});

// router.post('/add_sighting', async (req, res) => {
router.post('/add_sighting', upload.single('picture'), async (req, res) => {
    try {
        console.log("1");

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
        console.log("2");
        await newSighting.save();
        console.log("Sighting added successfully");
        res.redirect('/');
    } catch (error) {
        console.error("Error adding sighting", error);
        res.status(400).json({ message: 'Error adding sighting', error });
    }
});

router.get('/add_sighting', function(req, res, next) {
    console.log("**");
    res.render('addSighting', { title: 'Add a new Sighting' });
});

module.exports = router;