const BigchainDB = require('bigchaindb-driver');
const fs = require('fs');
const csv = require('csv-parser');

// Connect to BigchainDB
const bdbRootUrl = 'https://test.ipdb.io';  // Use the appropriate BigchainDB testnet URL
const conn = new BigchainDB.Connection(bdbRootUrl);

// Generate keypair for user (consider persisting keys for reuse)
const user = new BigchainDB.Ed25519Keypair();

console.log(`Public Key: ${user.publicKey}`);
console.log(`Private Key: ${user.privateKey}`);

// Read the CSV file and process each row
const csvFilePath = 'data.csv';  // Replace with your CSV file path
fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
        try {
            const assetData = {
                data: {
                    Family_ID: row['Family_ID'],
                    record: {
                        Day: row['Day'],
                        Temperature: row['Temperature'],
                        Humidity: row['Humidity'],
                        Soil_Moisture: row['Soil_Moisture'],
                        Precipitation: row['Precipitation'],
                        Soil_Carbon_Content: row['Soil_Carbon_Content'],
                        Biomass_Growth: row['Biomass_Growth'],
                        Leaf_Area_Index: row['Leaf_Area_Index'],
                        CO2_Flux: row['CO2_Flux'],
                        Methane: row['Methane'],
                        Nitrous_Oxide: row['Nitrous_Oxide'],
                        GPS_Coordinates: row['GPS_Coordinates'],
                        Baseline_Conditions: row['Baseline_Conditions'],
                        Root_Biomass: row['Root_Biomass'],
                    }
                }
            };

            // Metadata (optional)
            const metadata = { timestamp: row['Day'] };

            // Prepare the transaction
            const txCreate = BigchainDB.Transaction.makeCreateTransaction(
                assetData,
                metadata,
                [BigchainDB.Transaction.makeOutput(
                    BigchainDB.Transaction.makeEd25519Condition(user.publicKey)
                )],
                user.publicKey
            );

            // Sign the transaction
            const signedTx = BigchainDB.Transaction.signTransaction(txCreate, user.privateKey);

            // Send the transaction
            const sentTx = await conn.postTransactionCommit(signedTx);
            console.log(`Transaction ID: ${sentTx.id} added to BigchainDB.`);
        } catch (err) {
            console.error(`Error processing row: ${JSON.stringify(row)}, Error: ${err.message}`);
        }
    })
    .on('end', () => {
        console.log('CSV processing completed.');
    })
    .on('error', (err) => {
        console.error(`Error reading CSV file: ${err.message}`);
    });
