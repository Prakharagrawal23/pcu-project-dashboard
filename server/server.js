const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const shipmentRoutes = require("./routes/shipment");
const senderRoutes = require("./routes/sender");
const receiverRoutes = require("./routes/receiver");
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies in POST requests

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Use the API routes
 app.use("/sender", senderRoutes);
 app.use("/receiver", receiverRoutes);
 // Ensure the /api prefix is correct
 app.use("/shipment", shipmentRoutes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
