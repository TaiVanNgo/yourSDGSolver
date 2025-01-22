require("dotenv").config();
const express = require("express");
const csv = require('csvtojson');
const cors = require("cors");
const setupDB = require("./utils/db");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
setupDB();

const driver = require('bigchaindb-driver');
const BIGCHAINDB_URL = process.env.BIGCHAINDB_URL;
const bigchaindb = new driver.Connection(BIGCHAINDB_URL);
const alice = new driver.Ed25519Keypair();
const csvFilePath = 'verra_carbon_data.csv';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Check if the connection is successful
// bigchaindb.getBlock(1)
//     .then(block => {
//         console.log('Successfully connected to BigchainDB:', block);
//     })
//     .catch(err => {
//         console.error('Failed to connect to BigchainDB:', err);
//     });


// Function to post a transaction
// const postTransaction = async (data) => {
//     const assetdata = {
//         'data': data
//     };

//     const metadata = {
//         'timestamp': new Date().toISOString()
//     };

//     const txCreate = driver.Transaction.makeCreateTransaction(
//         assetdata,
//         metadata,
//         [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(alice.publicKey))],
//         alice.publicKey
//     );

//     const txCreateSigned = driver.Transaction.signTransaction(txCreate, alice.privateKey);

//     try {
//         const res = await bigchaindb.postTransactionCommit(txCreateSigned);
//         console.log('Transaction successfully posted. Transaction ID:', res.id);
//         return res.id;
//     } catch (err) {
//         console.error('Error posting transaction:', err);
//         throw err;
//     }
// };

// Read the CSV file and process each row
// csv()
//     .fromFile(csvFilePath)
//     .then((jsonObj) => {
//         jsonObj.forEach(async (data) => {
//             try {
//                 await postTransaction(data);
//             } catch (err) {
//                 console.error('Error processing row:', err);
//             }
//         });
//     })
//     .catch(err => {
//         console.error('Error converting CSV to JSON:', err);
//     });

// // API endpoint to fetch a specific transaction by ID
// app.get('/transaction/:id', async (req, res) => {
//     const transactionId = req.params.id;
//     try {
//         const transaction = await bigchaindb.getTransaction(transactionId);
//         res.json(transaction);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching transaction', error: err.message });
//     }
// });

// // API endpoint to fetch all transactions related to Alice's public key
// app.get('/transactions', async (req, res) => {
//     try {
//         const assets = await bigchaindb.searchAssets(alice.publicKey);
//         const transactions = [];
//         for (const asset of assets) {
//             const txs = await bigchaindb.listTransactions(asset.id);
//             transactions.push(...txs);
//         }
//         if (transactions.length > 0) {
//             res.json(transactions);
//         } else {
//             res.status(404).json({ message: 'No transactions found.' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching transactions', error: err.message });
//     }
// });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
