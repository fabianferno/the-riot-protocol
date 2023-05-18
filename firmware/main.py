# main.py -- put your code here! 
from riot_auth_sdk import authenticateDevice  
import time
import cryptolib 
import machine
import binascii


led = machine.Pin(16, machine.Pin.OUT) 

riot_key_hex  = authenticateDevice("0x248218dfcc0992e32a8b9589f9f8e81eb285c6326cce84347ca3bfd6a3c03a50", "0x0cfecb5D359E6C59ABd1d2Aa794F52C15055f451") 
riot_key_bytes = binascii.unhexlify(riot_key_hex[2:])
riotKey = binascii.hexlify(riot_key_bytes) 
 
print("Recieved Riot Key: ",riotKey)
 
# Create a AES object
cipher1 = cryptolib.aes(riotKey,1)
cipher2 = cryptolib.aes(riotKey,1)


ldr = machine.ADC(0)

 
while(True): 
    sensorData = ldr.read()
    
    # Convert the sensor value to bytes
    sensor_value_bytes = bytes(str(sensorData), 'utf-8')

    # Pad the sensor value to a multiple of 16 bytes (AES block size)
    sensor_value_bytes_padded = sensor_value_bytes + b'\0' * (16 - (len(sensor_value_bytes) % 16))

    
    # Encrypt the padded sensor value
    encrypted_sensor_value = cipher1.encrypt(sensor_value_bytes_padded)
    decrypted_sensor_value = cipher2.decrypt(encrypted_sensor_value)

    
    print("Sensor data: ", sensorData)
    print("Encrypted value: ", encrypted_sensor_value)
    print("Decrypted value: ", decrypted_sensor_value)
    
    
    led.value(1)
    # Wait for 2 seconds
    time.sleep(2)
    led.value(0)
    led.value(1)
    exit()
    # Write encrypted data to DB

