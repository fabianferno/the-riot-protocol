
import machine
from binascii import hexlify
import uos   
import urequests  


RIOT_RPC_URL = "http://192.168.1.7:5000"


# Helper functions start here
def hashify(contents):
    # Send these token ingredients and get the riot key from the main server
    response = urequests.post(RIOT_RPC_URL+"/hashify", json={
        "contents": contents,
    }, headers={'Content-Type': 'application/json'}) 
    hash = "0x"+ response.json().get("hash") 
    return hash
# Helper functions end here 


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

def authenticateDevice(devicePrivateKey, deviceId):
    firmwareHash = getFirmwareHash()
    print("Firmware hash: ", firmwareHash)  
    deviceDataHash = getDeviceDataHash()
    print("Device data hash: ", deviceDataHash) 
    deviceGroupIdHash = getDeviceGroupIdHash()
    print("Device group id hash: ", deviceGroupIdHash)
    print("Device id: ", deviceId) 
    
    # Send these token ingredients and get the riot key from the main server
    response = urequests.post(RIOT_RPC_URL+"/generate-riot-key", json={
        "firmwareHash": firmwareHash,
        "deviceDataHash" : deviceDataHash, 
        "deviceGroupIdHash": deviceGroupIdHash, 
        "deviceId": deviceId
    }, headers={'Content-Type': 'application/json'}) 
    key = response.json().get("key") 
    return key 