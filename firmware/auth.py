import hashlib
import os
import time 
import machine
from binascii import hexlify
import uos   

def hashify(contents):
    return hexlify(hashlib.sha256(contents).digest())

def getFirmwareHash():
    # Get file contents of main.py
    with open("main.py", "rb") as file:
        sourceCode = file.read()   
    return hashify(sourceCode)    


def getDeviceDataHash(): 
    # Get the firmware version
    sys_name = uos.uname().sysname # 'esp8266'
    fw_release = uos.uname().release # 2.2.0-dev(9422289)
    fw_version = uos.uname().version # v1.19.1 on 2022-06-18
    machine_name = uos.uname().machine # ESP module (1M) with ESP8266  
    chip_id = hexlify(machine.unique_id()).decode('utf-8') # 5c:cf:7f:00:00:00
    
    # Get hash of concatenated string of device data
    return hashify(sys_name.encode() + fw_release.encode() + fw_version.encode() + machine_name.encode() + chip_id.encode())


def getSubscriberHash():
    return hashify("0x64574dDbe98813b23364704e0B00E2e71fC5aD17".encode())

def authenticateDevice():
    firmwareHash = getFirmwareHash()
    print("Firmware hash: ", firmwareHash)  
    deviceDataHash = getDeviceDataHash()
    print("Device data hash: ", deviceDataHash)
    subscriberHash = getSubscriberHash()
    print("Subscriber hash: ", subscriberHash)
    
def blinkLed():    
    led = machine.Pin(16, machine.Pin.OUT)
    while(True):  
        led.value(1) 
        time.sleep(1) 
        led.value(0)