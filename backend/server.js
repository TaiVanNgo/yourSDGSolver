const express = require("express");
const cors = require("cors");
const uri = "mongodb://your-mongo-db-uri";
// const client = new MongoClient(uri);

const userRoutes = require("./routes/users.js");
const carbonCreditRoutes = require("./routes/carboncredit.js");

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// app.use(
//   "/users",
//   (req, res, next) => {
//     // req.client = client;
//     next();
//   },
//   userRoutes
// );

app.use("/carbon-credit", carbonCreditRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Express Backend!");
});

app.post("/api/carbon-credit", (req, res) => {
  res.send("You access carbon credit end point");
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
