const express = require("express");
const router = express.Router();


const Sender = require('../models/Sender');

// Routes
router.post('/submit', async (req, res) => {
  const { name, address, phone } = req.body;

  // // Validate
  if (!name || !address || !phone) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const newSender = new Sender({ name, address, phone });
    await newSender.save();
    res.status(200).send('Sender data saved successfully');
  } catch (err) {
    console.error('Error saving sender data:', err);
    res.status(500).send('Error saving sender data');
  }
});

module.exports = router;
