const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  description: { type: String, required: true },
  weight: { type: String, required: true },
  dimensions: { type: String, required: true },
});

module.exports = mongoose.model('Shipment', shipmentSchema);
