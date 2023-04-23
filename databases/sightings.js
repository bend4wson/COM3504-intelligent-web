const mongoose = require('mongoose');
const sightingSchema = new mongoose.Schema({
    type: String,
    description: String,
    location: {
        lat: Number,
        lng: Number,
    },
    lat: Number,
    lng: Number,
    picture: {
        data: Buffer,
        contentType: String,
    },
});
const Sighting = mongoose.model('Sighting', sightingSchema);
module.exports = Sighting;