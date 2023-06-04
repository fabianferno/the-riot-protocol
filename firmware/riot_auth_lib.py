import machine
from binascii import hexlify, unhexlify
import uos   
import urequests  
import cryptolib 
import json

# RIOT_RPC_URL = "http://192.168.1.2:5000"
RIOT_RPC_URL = "https://riot-rpc-server.adaptable.app"


# Helper functions start here
def hashify(contents):
    # Send these token ingredients and get the riot key from the main server
    payload = json.dumps({
        "contents": contents
    })
    response = urequests.request("POST",RIOT_RPC_URL+"/hashify", headers={'Content-Type': 'application/json'}, data=payload) 
    hash = "0x"+ response.json().get("hash")  
    return hash
# Helper functions end here 

def getCipherFromKey(riot_key_hex):
    # Convert the hex key string to bytes
    riot_key_bytes = unhexlify(riot_key_hex[2:])
    riotKey = hexlify(riot_key_bytes)  
    # Create Ciphers
    cipher = cryptolib.aes(riotKey, 1) # 1 for (ECB) 
    return cipher

def encryptData(cipher, sensorData):
    # Convert the sensor value to padded bytes
    sensor_value_bytes = bytes(str(sensorData), 'utf-8') 
    # Pad the sensor value to a multiple of 16 bytes (AES block size)
    sensor_value_bytes_padded = sensor_value_bytes + b'\0' * (16 - (len(sensor_value_bytes) % 16)) 
    # Encrypt the padded sensor value
    encrypted_sensor_value = cipher.encrypt(sensor_value_bytes_padded) 
    return encrypted_sensor_value

def decryptData(cipher, encrypted_sensor_value):
    # Decrypt the encrypted sensor value
    decrypted_sensor_value = cipher.decrypt(encrypted_sensor_value) 
    # Remove the padding from the decrypted sensor value
    decrypted_sensor_value = decrypted_sensor_value.rstrip(b'\0') 
    # Convert the decrypted sensor value to string
    decrypted_sensor_value = decrypted_sensor_value.decode('utf-8') 
    return decrypted_sensor_value


def getFirmwareHash():
    # Get file contents sof main.py 
    with open("main.py", "r") as file:
        sourceCode = file.read()
        sourceCode = sourceCode.replace(" ", "")
        sourceCode = sourceCode.replace("\r", "")
    return hashify(sourceCode)    


def getDeviceDataHash(): 
    # Get the firmware version
    sys_name = uos.uname().sysname # 'esp8266'
    fw_release = uos.uname().release # 2.2.0-dev(9422289)
    fw_version = uos.uname().version # v1.19.1 on 2022-06-18
    machine_name = uos.uname().machine # ESP module (1M) with ESP8266  
    chip_id = hexlify(machine.unique_id()).decode('utf-8') # 42c1dd00
    device_data = sys_name.encode() + fw_release.encode() + fw_version.encode() + machine_name.encode() + chip_id
    # print("Device data: ", device_data)
    # Get hash of concatenated string of device data
    return hashify(device_data)

def getDeviceGroupIdHash():
    return hashify("dg_1".encode())

def authenticateDevice(deviceId):
    print("Authenticating device...") 
    firmwareHash = getFirmwareHash() 
    deviceDataHash = getDeviceDataHash() 
    deviceGroupIdHash = getDeviceGroupIdHash()  
    payload={
        "firmwareHash": firmwareHash,
        "deviceDataHash" : deviceDataHash, 
        "deviceGroupIdHash": deviceGroupIdHash, 
        "deviceId": deviceId,
        "chainId": "1442",
    }, 
    print("Sending token ingredients: ", payload)
    # Send these token ingredients and get the riot key from the main server
    response = urequests.request("POST", RIOT_RPC_URL+"/generate-riot-key-for-device", headers={'Content-Type': 'application/json'}, json=payload) 
    key = response.json().get("key") 
    print("Recieved Riot Key: ", key)
    if(key == None):
        raise Exception("Invalid Riot Key")
    return key 