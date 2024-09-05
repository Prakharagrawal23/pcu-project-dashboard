const express = require('express');
const router = express.Router();
const Shipment = require('../models/Shipment'); // Create a model for Shipment

// POST route to save shipment data
router.post('/submit', async (req, res) => {
  const { description, weight, dimensions } = req.body;

  // Basic validation
  if (!description || !weight || !dimensions) {
    return res.status(400).send('All fields are required.');
  }
  const existingShipment = await Shipment.findOne({ description, weight, dimensions });
  if (existingShipment) {
    return res.status(400).send('Duplicate shipment entry detected.');
  }

  const newShipment = new Shipment({ description, weight, dimensions });

  try {
    await newShipment.save();
    res.status(200).send('Shipment data saved successfully');
  } catch (err) {
    console.error('Error saving shipment data:', err);
    res.status(500).send('Error saving shipment data');
  }
});

module.exports = router;
