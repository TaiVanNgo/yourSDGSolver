from bigchaindb_driver import BigchainDB
from bigchaindb_driver.crypto import generate_keypair
import pandas as pd

# Connect to BigchainDB
# Use the appropriate BigchainDB testnet URL
bdb_root_url = 'https://test.ipdb.io'
bdb = BigchainDB(bdb_root_url)

# Load the .csv file
csv_file = 'data.csv'  # Replace with your CSV file path
try:
    data = pd.read_csv(csv_file)
except Exception as e:
    print(f"Error reading CSV file: {e}")
    exit()

# Generate keypair for user (consider persisting keys for reuse)
user = generate_keypair()
print(f"Public Key: {user.public_key}")
print(f"Private Key: {user.private_key}")

# Iterate over rows and add to BigchainDB
for index, row in data.iterrows():
    try:
        asset_data = {
            'data': {
                'Family_ID': row['Family_ID'],
                'record': {
                    'Day': row['Day'],
                    'Temperature': row['Temperature'],
                    'Humidity': row['Humidity'],
                    'Soil_Moisture': row['Soil_Moisture'],
                    'Precipitation': row['Precipitation'],
                    'Soil_Carbon_Content': row['Soil_Carbon_Content'],
                    'Biomass_Growth': row['Biomass_Growth'],
                    'Leaf_Area_Index': row['Leaf_Area_Index'],
                    'CO2_Flux': row['CO2_Flux'],
                    'Methane': row['Methane'],
                    'Nitrous_Oxide': row['Nitrous_Oxide'],
                    'GPS_Coordinates': row['GPS_Coordinates'],
                    'Baseline_Conditions': row['Baseline_Conditions'],
                    'Root_Biomass': row['Root_Biomass'],
                }
            }
        }

        # Metadata (optional) by day
        metadata = {'timestamp': row['Day']}

        # Prepare the transaction
        prepared_tx = bdb.transactions.prepare(
            operation='CREATE',
            signers=user.public_key,
            asset=asset_data,
            metadata=metadata,
        )

        # Sign the transaction
        fulfilled_tx = bdb.transactions.fulfill(
            prepared_tx, private_keys=user.private_key)

        # Send the transaction
        sent_tx = bdb.transactions.send_commit(fulfilled_tx)

        print(f"Transaction ID: {sent_tx['id']} added to BigchainDB.")

    except Exception as e:
        print(f"Error processing row {index}: {e}")
