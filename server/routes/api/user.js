const express = require("express");
const router = express.Router();
const User = require("../../models/user");

router.post("/login", async (req, res) => {
  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  try {
    const user = await User.findOne({ walletAddress });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract the role
    const { role } = user;

    return res.status(200).json({
      message: "Login successful",
      role,
    });
  } catch {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
