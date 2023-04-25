// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;


contract Riot { 
    address[] public devices;

    struct Device {
        // JSON string that includes groupId; metadata; firmware; deviceId; subAddress; 
        bytes32 firmwareHash;
        bytes32 deviceDataHash; 
        bytes32 deviceGroupIdHash; 
        address deviceId;
        address subscriber;
        bytes32 sessionSalt; 
    } 

    mapping (address => Device) public deviceIdToDevice; 

    constructor() {
         
	} 

    function mintDevice(bytes32 _firmwareHash, bytes32 _deviceDataHash, bytes32 _deviceGroupIdHash, address _deviceId) public returns (Device memory){ 
        bytes32 sessionSalt = keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender));
        Device memory newDevice = Device(_firmwareHash, _deviceDataHash, _deviceGroupIdHash, _deviceId, msg.sender, sessionSalt);
        deviceIdToDevice[_deviceId] = newDevice;  
        devices.push(_deviceId);
        return newDevice;  
    }

    function setSubscriberAddress (address _deviceId, address _subscriber) public returns (Device memory) {  
        // Update the mappings
        deviceIdToDevice[_deviceId].subscriber = _subscriber; 

        // Update the session salt
        bytes32 newSessionSalt = keccak256(abi.encodePacked(block.timestamp, block.difficulty, _subscriber));
        deviceIdToDevice[_deviceId].sessionSalt = newSessionSalt;

        return deviceIdToDevice[_deviceId];
    }

    function checkIfDeviceIsMinted(address _deviceId) public view {
        bool found = false;
        for (uint i = 0; i < devices.length; i++) {
            if (devices[i] == _deviceId) {
                found = true;
                break;
            }
        }
        require(found, "Address not found in array");
    }
    

   function merkleRoot(bytes32[] memory hashes) private pure returns (bytes32) {
        uint len = hashes.length;
        require(len > 0, "Merkle root cannot be computed with an empty array");
        if (len == 1) {
            return hashes[0];
        } else {
            if (len % 2 == 1) {
                bytes32[] memory extendedHashes = new bytes32[](len + 1);
                for (uint i = 0; i < len; i++) {
                    extendedHashes[i] = hashes[i];
                }
                extendedHashes[len] = hashes[len - 1];
                len++;
                hashes = extendedHashes;
            }
            bytes32[] memory newHashes = new bytes32[](len / 2);
            for (uint i = 0; i < len / 2; i++) {
                newHashes[i] = keccak256(abi.encodePacked(hashes[2*i], hashes[2*i+1]));
            }
            return merkleRoot(newHashes);
        }
    }

    function generateRiotKeyForDevice (bytes32 _firmwareHash, bytes32 _deviceDataHash, bytes32 _deviceGroupIdHash, address _deviceId) public view returns (bytes32) {
        // Check if the recieved data is in the valid devices
        checkIfDeviceIsMinted(_deviceId);
        require(deviceIdToDevice[_deviceId].firmwareHash == _firmwareHash, "Invalid FirmwareHash");
        require(deviceIdToDevice[_deviceId].deviceDataHash == _deviceDataHash, "Invalid FirmwareHash");
        require(deviceIdToDevice[_deviceId].deviceGroupIdHash == _deviceGroupIdHash, "Invalid FirmwareHash");

        bytes32[] memory hashes = new bytes32[](6);
        hashes[0] = deviceIdToDevice[_deviceId].firmwareHash;
        hashes[1] = deviceIdToDevice[_deviceId].deviceDataHash;
        hashes[2] = deviceIdToDevice[_deviceId].deviceGroupIdHash;
        hashes[3] = bytes32(bytes20(_deviceId));
        hashes[4] = bytes32(bytes20(deviceIdToDevice[_deviceId].subscriber));
        hashes[5] = deviceIdToDevice[_deviceId].sessionSalt;
        return merkleRoot(hashes); 
    }

    function generateRiotKeyForSubscriber (address _deviceId, address _subscriber) public view returns (bytes32) {
        // Check if the recieved data is in the valid devices
        checkIfDeviceIsMinted(_deviceId);
        require(deviceIdToDevice[_deviceId].subscriber == _subscriber, "Unauthorized User");

        bytes32[] memory hashes = new bytes32[](6);
        hashes[0] = deviceIdToDevice[_deviceId].firmwareHash;
        hashes[1] = deviceIdToDevice[_deviceId].deviceDataHash;
        hashes[2] = deviceIdToDevice[_deviceId].deviceGroupIdHash;
        hashes[3] = bytes32(bytes20(_deviceId));
        hashes[4] = bytes32(bytes20(_subscriber));
        hashes[5] = deviceIdToDevice[_deviceId].sessionSalt;
        return merkleRoot(hashes);  
    }  
}
