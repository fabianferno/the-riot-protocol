# main.py -- put your code here! 
from auth import authenticateDevice 

riotKey = authenticateDevice()

# Get sensor data and encrypt using riotKey
# Create a Fernet object using the key
 

# Encrypt a message
message = "SENSOR VALUE: 10101911" 

# Write encrypted data to DB

