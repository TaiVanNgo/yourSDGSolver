const router = require("express").Router();
const userRoutes = require("./api/user");
const transactionRoutes = require("./api/transaction");
const projectRoutes = require("./api/projects");

router.use("/user", userRoutes);
router.use("/transaction", transactionRoutes);
router.use("/projects", projectRoutes);
router.use("/", (req, res) => res.status(404).json("No API route found"));

module.exports = router;
