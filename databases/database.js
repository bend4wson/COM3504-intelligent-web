const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/bird_sightings';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongoose connected to MongoDB');
    })
    .catch((error) => {
        console.error('Mongoose connection error:', error);
    });

module.exports = mongoose;