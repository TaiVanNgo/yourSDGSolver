const express = require("express");
const router = express.Router();
const Transaction = require("../../models/transaction");

const driver = require("bigchaindb-driver");
const csv = require("csvtojson");
const BIGCHAINDB_URL = process.env.BIGCHAINDB_URL;
const bigchaindb = new driver.Connection(BIGCHAINDB_URL);
const alice = new driver.Ed25519Keypair();
const csvFilePath = "./../../verra_carbon_data.csv";

// const setupBigchainDB = async () => {
//     bigchaindb.getBlock(1)
//         .then(block => {
//             console.log('Successfully connected to BigchainDB:', block);
//         })
//         .catch(err => {
//             console.error('Failed to connect to BigchainDB:', err);
//         });
// }

// Function to post a transaction
const postTransaction = async (data) => {
  const assetdata = {
    data: data,
  };

  const metadata = {
    timestamp: new Date().toISOString(),
  };

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

router.get("/add-sensordata", async (req, res) => {
  // Read the CSV file and process each row
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      jsonObj.forEach(async (data) => {
        try {
          await postTransaction(data);
        } catch (err) {
          console.error("Error processing row:", err);
        }
      });
    })
    .catch((err) => {
      console.error("Error converting CSV to JSON:", err);
    });
});

router.get("/:id", async (req, res) => {
  const transactionId = req.params.id;
  try {
    const transaction = await bigchaindb.getTransaction(transactionId);
    res.json(transaction);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching transaction", error: err.message });
  }
});

router.get("/ids", async (req, res) => {
  try {
    const ids = await Transaction.find();
    console.log(ids);
    res.json(ids);
  } catch (err) {
    err.log();
    res
      .status(500)
      .json({ message: "Error fetching transaction ids", error: err.message });
  }
});

// module.exports = setupBigchainDB;
module.exports = router;
