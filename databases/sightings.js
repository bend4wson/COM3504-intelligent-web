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
    timestamp: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});
const Sighting = mongoose.model('Sighting', sightingSchema);
module.exports = Sighting;
