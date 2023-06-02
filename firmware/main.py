# main.py -- put your code here! 
from riot_auth_lib import authenticateDevice, getCipherFromKey, encryptData, RIOT_RPC_URL
import time 
import machine  
from ubinascii import hexlify
from db import dbWrite

DEVICE_ID = "0x0cfecb5D359E6C59ABd1d2Aa794F52C15055f451" 
riot_key_hex = authenticateDevice(DEVICE_ID) 
cipher = getCipherFromKey(riot_key_hex)  # Use the cipher to encrypt and decrypt data

# IOT LOGIC
ldr = machine.ADC(0)
while(True): 
    # Read value from the sensor
    sensorData = ldr.read() 
    encrypted_sensor_value = encryptData(cipher, sensorData) 
    
    data = {
        "sensorValue": hexlify(encrypted_sensor_value),
        "deviceId": "" + DEVICE_ID
    } 
    print(data)
    
    # Write encrypted data to DB    
    dbWrite(data)
    
    # Wait for 2 seconds
    time.sleep(2) 