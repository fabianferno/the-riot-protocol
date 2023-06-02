
import urequests   
import json
from riot_auth_lib import RIOT_RPC_URL

def dbWrite(data):
    print(data)

    # Write encrypted data to DB
    payload = json.dumps(data) 
    response = urequests.request("POST", RIOT_RPC_URL+"/data", headers={'Content-Type': 'application/json'}, data=payload) 
    result = response.json()
    return result