const express = require('express');
const router = express.Router();
const Sighting = require('../databases/sightings');

// Example endpoint to create a new sighting
router.post('/create', async (req, res) => {
    try {
        const newSighting = new Sighting(req.body);
        await newSighting.save();
        res.status(201).json({ message: 'Sighting added successfully', data: newSighting });
    } catch (error) {
        res.status(400).json({ message: 'Error adding sighting', error });
    }
});

module.exports = router;