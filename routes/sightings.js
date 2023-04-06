const express = require('express');
const router = express.Router();
const Sighting = require('../databases/sightings');
const Users = require("../databases/users");

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

router.post('/add_sighting', async (req, res) => {
    try {
        const newSighting = new Sighting({
            type: req.body.type,
            description: req.body.description,
            location: {
                lat: req.body.location.lat,
                lng: req.body.location.lng,
            },
            picture: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            },
        });
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

module.exports = router;