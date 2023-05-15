const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    birdSightingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BirdSighting',
    },
    userId: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Chat', ChatSchema);
