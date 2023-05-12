const express = require('express');
const router = express.Router();
const Sighting = require('../databases/sightings');
const Users = require("../databases/users");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { fetchChatHistory } = require('../controllers/chatController');
router.get('/chat-history/:sightingId', fetchChatHistory);


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

// router.post('/add_sighting', upload.single('picture'), async (req, res) => {
//     console.log("(!!!!!!!123)")
//     try {
//         console.log("aaaaa")
//         const newSightingData = {
//             type: req.body.type,
//             description: req.body.description,
//             location: {
//                 lat: req.body.lat,
//                 lng: req.body.lng,
//             },
//         };
//         console.log("oooooo")
//         if (req.file) {
//             console.log("!!!!!!")
//             newSightingData.picture = {
//                 data: req.file.buffer,
//                 contentType: req.file.mimetype,
//             };
//         }
//
//         const newSighting = new Sighting(newSightingData);
//         console.log("1")
//         await newSighting.save();
//         console.log("Sighting added successfully");
//         res.redirect('/');
//     } catch (error) {
//         console.error("Error adding sighting:", error.message);
//         console.error(error.stack); // Add this line to log the error stack trace
//         res.status(400).json({ message: 'Error adding sighting', error });
//     }
// });


router.get('/', async (req, res) => {
    console.log("!!");
    res.render('index', { title: 'Bird Watching Page' , sightings});
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
            lat: req.body.userLat,
            lng: req.body.userLng
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

// router.get('/update_sighting', async function(req, res, next) {
//     const sighting = await Sighting.findById(req.query.id);
//     res.render('updateSighting', { title: 'Update Sighting', sighting });
// });
//
// router.post('/update_sighting', upload.single('picture'), async (req, res) => {
//     try {
//         const id = req.body.id;
//         const sighting = {};
//
//         sighting.type = req.body.type;
//         sighting.description = req.body.description;
//         sighting.location = {
//             lat: req.body.location.lat,
//             lng: req.body.location.lng
//         };
//         sighting.lat = req.body.userLat;
//         sighting.lng = req.body.userLng;
//
//         if (req.file) {
//             sighting.picture = {
//                 data: req.file.buffer,
//                 contentType: req.file.mimetype,
//             };
//         }
//
//         await Sighting.findByIdAndUpdate(id, sighting);
//         console.log("Sighting updated successfully");
//         res.status(200).send();
//     } catch (error) {
//         console.error("Error updating sighting", error);
//         res.status(400).json({ message: 'Error updating sighting', error });
//     }
// });

router.get('/detail', async (req, res, next) => {
    // Get the sightingId from the request query
    var sightingId = req.query.id;

    try {
        // Retrieve the sighting details from the database using the sightingId
        const sighting = await Sighting.findById(sightingId);

        if (!sighting) {
            var err = new Error('Sighting not found');
            err.status = 404;
            return next(err);
        }

        // Render the detail page with the sighting object
        res.render("detail", { title: 'Bird Detail Page', sighting: sighting });
    } catch (err) {
        return next(err);
    }
});


module.exports = router;
