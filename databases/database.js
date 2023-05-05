const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/bird_sightings';

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Mongoose connected to MongoDB');
    })
    .catch((error) => {
        console.error('Mongoose connection error:', error);
    });

module.exports = mongoose;