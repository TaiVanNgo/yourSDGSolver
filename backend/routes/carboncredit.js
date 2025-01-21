const express = require("express");
const router = express.Router();

const carbonCredit = [
  {
    id: 1,
    name: "carbon1",
  },
  {
    id: 2,
    name: "carbon2",
  },
  {
    id: 3,
    name: "carbon3",
  },
];

router.get("/", (req, res) => res.json(carbonCredit));

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const credit = carbonCredit.find((c) => c.id === parseInt(id)); // Find the carbon credit

  if (!credit) {
    // Return 404 if not found
    return res.status(404).json({ message: "Carbon credit not found" });
  }

  // Return the specific carbon credit
  res.json(credit);
});

router.post("/", (req, res) => {
  const newCarbonCredit = req.body; // Destructure the body
  console.log(newCarbonCredit);
  carbonCredit.push(newCarbonCredit);

  res.send("Data is added!");
});

module.exports = router;
