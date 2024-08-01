var express = require('express');
var router = express.Router();
var bus = require('../models/Buses');

// Endpoint to find buses by startCity and destination
router.post('/search', (req, res) => {
    bus.find({ startCity: req.body.startCity, destination: req.body.destination }).exec((err, buses) => {
        if (err) {
            res.json({ status: false, message: "Error while searching" });
        } else {
            res.json({ status: true, buses });
        }
    });
});

// Endpoint to find a specific bus by ID
router.post('/findById', (req, res) => {
    bus.findOne({ _id: req.body.bId }, (err, bus) => {
        if (err) {
            res.json({ status: false, message: "Error while searching with ID" });
        } else if (!bus) {
            res.json({ status: false, message: "Bus not found" });
        } else {
            res.json({ status: true, bus });
        }
    });
});

router.post('/add', (req, res) => {
    let newBus = new bus(req.body);
    newBus.save((err, bus) => {
        if (err) {
            res.json({ status: false, message: "Error while saving bus" });
        } else {
            res.status(201).json({ status: true, bus });
        }
    });
});

module.exports = router;
