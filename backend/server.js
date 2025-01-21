const express = require("express");
const cors = require("cors");
const uri = "mongodb://your-mongo-db-uri";
const client = new MongoClient(uri);

const userRoutes = require("./routes/users.js");

// Initialize the app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

app.use(
  "/users",
  (req, res, next) => {
    req.client = client;
    next();
  },
  userRoutes
);

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Express Backend!");
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
