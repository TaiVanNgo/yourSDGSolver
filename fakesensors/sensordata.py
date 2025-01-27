import pandas as pd
import paho.mqtt.client as mqtt

import json
import time

# MQTT Broker settings
broker = "test.mosquitto.org"  # Replace with your broker address
port = 1883  # Default port for MQTT
topic_base = "plantation/zone1/sensors"

# Data for carbon sequestration measurement for a cashew tree
data = {
    "Day": range(1, 10),
    "Temperature (°C)": [30.2, 31.5, 29.8, 30.0, 32.0, 31.2, 30.5, 29.7, 30.1],
    "Humidity (%)": [65, 68, 72, 70, 63, 67, 69, 74, 71],
    "Soil Moisture (%)": [45.2, 46.0, 47.5, 48.1, 43.8, 44.5, 45.0, 49.0, 46.7],
    "Precipitation (mm)": [2.1, 0.0, 3.5, 1.2, 0.0, 0.0, 1.8, 4.3, 1.1],
    "Soil Carbon Content (g/kg)": [15.6, 15.7, 15.8, 15.9, 16.0, 16.1, 16.2, 16.3, 16.4],
    "Biomass Growth (kg)": [0.003, 0.004, 0.005, 0.006, 0.008, 0.009, 0.010, 0.012, 0.013],
    "Leaf Area Index (LAI)": [1.2, 1.3, 1.35, 1.4, 1.5, 1.55, 1.6, 1.65, 1.7],
    "CO₂ Flux (g/m²/day)": [-12.4, -13.0, -13.2, -13.5, -14.0, -14.2, -14.5, -14.8, -15.0],
    "Methane (CH₄) (ppm)": [1.82, 1.81, 1.79, 1.78, 1.76, 1.74, 1.72, 1.71, 1.70],
    "Nitrous Oxide (N₂O) (ppm)": [0.05, 0.05, 0.06, 0.05, 0.04, 0.04, 0.05, 0.04, 0.04],
    "GPS Coordinates": ["10.775, 106.662"] * 9,
    "Baseline Conditions (kg C)": [8.00, 8.05, 8.10, 8.15, 8.20, 8.25, 8.30, 8.35, 8.40],
    "Root Biomass (kg)": [0.15, 0.16, 0.17, 0.18, 0.20, 0.22, 0.25, 0.27, 0.30]
}

# # Create a DataFrame
# df = pd.DataFrame(data)

# # Export to .csv
# file_path = "../AI/yourSDGsolver/carbon_sequestration_cashew_tree.csv"
# df.to_csv(file_path, index=False)

# file_path
# print(file_path)

# MQTT client setup
client = mqtt.Client()

# Connect to the broker
client.connect(broker, port, 60)

# Function to publish MQTT messages
def publish_mqtt_data(day):
    # Create message for each sensor data
    for sensor in data:
        if sensor == "Day":  # Skip the 'Day' data as it's just the day number
            continue
        
        for i, value in enumerate(data[sensor]):
            topic = f"{topic_base}/{sensor.replace(' ', '_').replace('(', '').replace(')', '')}"
            payload = {
                "value": value,
                "timestamp": f"2025-01-19T10:00:00Z",
                "day": day
            }
            message = json.dumps(payload)
            client.publish(topic, message)
            print(f"Published to topic '{topic}': {message}")
            time.sleep(1)  # Add a small delay between messages to prevent flooding

# Publish data for each day
for day in range(1, 10):
    publish_mqtt_data(day)
    time.sleep(2)  # Delay between days

# Disconnect from the broker after sending all data
client.disconnect()

# MQTT Subscriber function
def on_message(client, userdata, message):
    # Convert the message payload from byte format to string
    payload = message.payload.decode("utf-8")
    
    # Process the received data (for example, print it)
    print(f"Received message on topic '{message.topic}': {payload}")
    
    # Add further processing logic here, e.g., storing data in BigchainDB or a database.

# Set up the subscriber to listen to the same topic
def subscribe_mqtt():
    # Subscribe to the topics you are publishing to
    client.subscribe(f"{topic_base}/#")  # # subscribes to all subtopics
    
    # Define the callback for receiving messages
    client.on_message = on_message
    
    # Keep the connection alive and listen for messages
    client.loop_forever()

# Start the subscriber to process messages
subscribe_mqtt()
