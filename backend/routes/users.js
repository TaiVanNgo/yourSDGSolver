// const express = require("express");
// const router = express.Router();

// router.post("/getUserRole", async (req, res) => {
//   const { address } = req.body;

//   try {
//     const client = req.client;
//     await client.connect();
//     const db = client.db("your-database");
//     const collection = db.collection("users");

//     const user = await collection.findOne({ walletAddress: address });

//     if (user) {
//       res.json({ role: user.role });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching user role:", error);
//     res.status(500).json({ message: "Server error" });
//   } finally {
//     await client.close();
//   }
// });

// module.exports = router;
