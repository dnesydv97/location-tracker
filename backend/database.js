const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/locations.db");

// Initialize the database with a table for storing locations
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, latitude REAL, longitude REAL, timestamp TEXT)"
  );
});

// Function to save a location
const saveLocation = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    const timestamp = new Date().toISOString();
    db.run(
      "INSERT INTO locations (latitude, longitude, timestamp) VALUES (?, ?, ?)",
      [latitude, longitude, timestamp],
      (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      }
    );
  });
};

// Function to retrieve all locations (for testing purposes)
const getLocations = (callback) => {
  db.all("SELECT * FROM locations", (err, rows) => {
    if (err) {
      throw err;
    }
    callback(rows);
  });
};

module.exports = { saveLocation, getLocations };
