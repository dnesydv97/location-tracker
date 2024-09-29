const mongoose = require("mongoose");
const Location = require("./model");
const mongoURI = "mongodb://localhost:27017/locationTracker";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function saveLocation(latitude, longitude) {
  const newLocation = new Location({ latitude, longitude });
  await newLocation.save();
}

module.exports = {
  saveLocation,
};
