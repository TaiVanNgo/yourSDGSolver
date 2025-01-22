const router = require('express').Router();
const userRoutes = require('./api/user');
const transactionRoutes = require('./api/transaction');

router.use("/api/user", userRoutes);
router.use("/api/transaction", transactionRoutes);
router.use("/api", (req, res) => res.status(404).json('No API route found'));

module.exports = router;