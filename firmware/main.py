# main.py -- put your code here! 
from riot_auth_sdk import authenticateDevice, RIOT_RPC_URL
import time
import cryptolib 
import machine
import binascii
import urequests
from ubinascii import hexlify

DEVICE_ID = "0x37fd32FE39b56d6b8C2F5eEFF24d7E65809f7A10"
DEVICE_PRIVATE_KEY = "0xc923ef2804331462124a99e7705b90e4d02a141c75871a0e7ff9adbfbe3fb17a"

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

    # Wait for 2 seconds
    time.sleep(2) 
    
    data = {
        "sensorValue": hexlify(encrypted_sensor_value),
        "deviceId": ""+DEVICE_ID
    }
    
    print(data)
    
    # Write encrypted data to DB
    response = urequests.post(RIOT_RPC_URL+"/data", json=data, headers={'Content-Type': 'application/json'}) 
    result = response.json()
    print(result)