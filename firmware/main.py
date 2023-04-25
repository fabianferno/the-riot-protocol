# main.py -- put your code here! 
from auth import authenticateDevice 
import random
import time
import cryptolib
import os
import machine


led = machine.Pin(16, machine.Pin.OUT)


riotKey = authenticateDevice().encode()
# Initialization Vector
key =  os.urandom(16) 
iv = os.urandom(16)
 
# Create a AES object
cipher = cryptolib.aes(key,2,iv)

 
while(True): 
    sensorData = random.getrandbits(7) % 100
    
    # Convert the sensor value to bytes
    sensor_value_bytes = bytes(str(sensorData), 'utf-8')

    # Pad the sensor value to a multiple of 16 bytes (AES block size)
    sensor_value_bytes_padded = sensor_value_bytes + b'\0' * (16 - (len(sensor_value_bytes) % 16))

    
    # Encrypt the padded sensor value
    encrypted_sensor_value = cipher.encrypt(sensor_value_bytes_padded)

    
    print("Sensor data: ", sensorData)
    print("Encrypted value: ", encrypted_sensor_value)
    
    led.value(1)
    # Wait for 2 seconds
    time.sleep(2)
    led.value(0)
    
    # Write encrypted data to DB

