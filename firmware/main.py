# main.py -- put your code here! 
from riot_auth_sdk import authenticateDevice, RIOT_RPC_URL
import time
import cryptolib 
import machine
import binascii
import urequests
from ubinascii import hexlify

DEVICE_ID = "0x0cfecb5D359E6C59ABd1d2Aa794F52C15055f451"
DEVICE_PRIVATE_KEY = "0x248218dfcc0992e32a8b9589f9f8e81eb285c6326cce84347ca3bfd6a3c03a50"

riot_key_hex  = authenticateDevice(DEVICE_PRIVATE_KEY, DEVICE_ID) 
# Convert the hex key string to bytes
riot_key_bytes = binascii.unhexlify(riot_key_hex[2:])
riotKey = binascii.hexlify(riot_key_bytes) 
print("Recieved Riot Key: ", riotKey)
# Create Ciphers
cipher = cryptolib.aes(riotKey, 1) # 1 for (ECB) 

# IOT LOGIC
# Initialize Sensor
ldr = machine.ADC(0)
while(True): 
    # Read value from the sensor
    sensorData = ldr.read()
    
    # Convert the sensor value to padded bytes
    sensor_value_bytes = bytes(str(sensorData), 'utf-8') 
    # Pad the sensor value to a multiple of 16 bytes (AES block size)
    sensor_value_bytes_padded = sensor_value_bytes + b'\0' * (16 - (len(sensor_value_bytes) % 16))

    # Encrypt the padded sensor value
    encrypted_sensor_value = cipher.encrypt(sensor_value_bytes_padded) 
     
  
    print("Encrypted value: ", hexlify(encrypted_sensor_value)) 
    
    # Wait for 2 seconds
    time.sleep(2) 
    
    # Write encrypted data to DB
    response = urequests.post(RIOT_RPC_URL+"/data", json={
        "sensorValue": encrypted_sensor_value,
        "deviceId": DEVICE_ID
    }, headers={'Content-Type': 'application/json'}) 
    data =  response.json() 
