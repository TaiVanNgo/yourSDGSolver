const express = require("express");
const router = express.Router();
const Transaction = require("../../models/transaction");

const driver = require("bigchaindb-driver");
const csv = require("csvtojson");
const BIGCHAINDB_URL = process.env.BIGCHAINDB_URL;
const bigchaindb = new driver.Connection(BIGCHAINDB_URL);
const alice = new driver.Ed25519Keypair();
const csvFilePath = "verra_carbon_data.csv";
let curr_ids = [];

// Function to post a transaction
const postTransaction = async (data) => {
  const assetdata = { data };
  const metadata = { timestamp: new Date().toISOString() };

  const txCreate = driver.Transaction.makeCreateTransaction(
    assetdata,
    metadata,
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(alice.publicKey)
      ),
    ],
    alice.publicKey
  );

  const txCreateSigned = driver.Transaction.signTransaction(
    txCreate,
    alice.privateKey
  );

  try {
    const res = await bigchaindb.postTransactionCommit(txCreateSigned);
    console.log("Transaction successfully posted. Transaction ID:", res.id);
    return res.id;
  } catch (err) {
    console.error("Error posting transaction:", err);
    throw err;
  }
};

// Endpoint to add sensor data from a CSV file
router.get("/add-sensordata", async (req, res) => {
  try {
    const jsonObj = await csv().fromFile(csvFilePath); // Convert CSV to JSON

    // Use Promise.all to handle asynchronous operations for all rows
    const ids = await Promise.all(
      jsonObj.map(async (data) => {
        try {
          return await postTransaction(data); // Post transaction and return ID
        } catch (err) {
          console.error("Error processing row:", err);
          return null; // Return null for failed transactions
        }
      })
    );

    // Filter out null values and update `curr_ids`
    curr_ids = ids.filter((id) => id !== null);
    res.status(200).json({ message: "Transactions processed", ids: curr_ids });
  } catch (err) {
    console.error("Error processing sensor data:", err);
    res.status(500).json({ message: "Error processing sensor data", error: err.message });
  }
});

// Endpoint to view all transaction IDs
router.get("/view", async (req, res) => {
  try {
    res.json(curr_ids);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching transaction IDs", error: err.message });
  }
});

// Endpoint to view a transaction by ID
router.get("/view/id/:id", async (req, res) => {
  const transactionId = req.params.id;
  console.log("Fetching transaction ID:", transactionId);
  try {
    const transaction = await bigchaindb.getTransaction(transactionId);
    res.json(transaction);
  } catch (err) {
    console.error("Error fetching transaction:", err);
    res
      .status(500)
      .json({ message: "Error fetching transaction", error: err.message });
  }
});

module.exports = router;
