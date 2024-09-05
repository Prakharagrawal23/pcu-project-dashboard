const express = require('express');
const router = express.Router();
const Receiver = require('../models/Receiver'); // Create a model for Receiver

// POST route to save receiver data
router.post('/submit', async (req, res) => {
  const { name, address, phone } = req.body;

  // Basic validation
  if (!name || !address || !phone) {
    return res.status(400).send('All fields are required.');
  }

  const newReceiver = new Receiver({ name, address, phone });

  try {
    await newReceiver.save();
    res.status(200).send('Receiver data saved successfully');
  } catch (err) {
    console.error('Error saving receiver data:', err);
    res.status(500).send('Error saving receiver data');
  }
});

module.exports = router;
