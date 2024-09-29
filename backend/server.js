const express = require("express");
const bodyParser = require("body-parser");
const { saveLocation, getLocations } = require("./src/db/database");
const cors = require("cors");

const app = express();

app.use(cors());

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("API is working!");
});

// Route to track location
app.post("/api/track-location", async (req, res) => {
  console.log("Received location data:", req.body);
  const { latitude, longitude } = req.body;

  if (latitude && longitude) {
    try {
      await saveLocation(latitude, longitude);
      res.json({ message: "Location tracked successfully!" });
    } catch (error) {
      console.error("Error saving location:", error);
      res.status(500).json({ message: "Error saving location", error });
    }
  } else {
    console.error("Invalid location data");
    res.status(400).json({ message: "Invalid location data" });
  }
});

// Get all stored locations (for testing)
app.get("/api/locations", (req, res) => {
  getLocations((locations) => {
    res.json(locations);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
