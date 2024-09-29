const express = require("express");
const bodyParser = require("body-parser");
const { saveLocation } = require("./database");
const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Route to track location
app.post("/api/track-location", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (latitude && longitude) {
    try {
      // Save location to the database
      await saveLocation(latitude, longitude);
      res.json({ message: "Location tracked successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving location", error });
    }
  } else {
    res.status(400).json({ message: "Invalid location data" });
  }
});

// Get all stored locations (for testing)
app.get("/api/locations", (req, res) => {
  const db = require("./database");
  db.getLocations((locations) => {
    res.json(locations);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
