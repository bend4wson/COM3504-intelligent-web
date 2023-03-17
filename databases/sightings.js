var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27107/mydb";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database Created!")
    db.close();
});


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("sightings", function(err, res) { if (err) throw err;
        console.log("Sighting collection created!"); db.close();
    });
});