
import hashlib  
from binascii import hexlify
import requests

# Helper functions start here
def hashify(contents):
    # Send these token ingredients and get the riot key from the main server
    response = requests.post("http://192.168.1.7:5000/hashify", json={
        "contents": contents,
    }, headers={'Content-Type': 'application/json'}) 
    hash = response.json().get("hash") 
    return "0x"+hash
# Helper functions end here 

def getFirmwareHash():
    # Get file contents of main.py
    with open("firmware/main.py", "rb") as file:
        sourceCode = file.read() 
        sourceCode = sourceCode.decode("utf-8").replace(" ", "") 
        sourceCode = sourceCode.replace("\r", "")
    return hashify(sourceCode)    

hash = getFirmwareHash()
print("Hash: ", hash)