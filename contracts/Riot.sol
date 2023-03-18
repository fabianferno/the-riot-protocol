// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;
 
contract Riot { 
    struct Device {
        // JSON string that includes groupId; metadata; firmware; deviceId; subAddress; 
        bytes32 groupId;
        bytes32 metadata;
        bytes32 firmwareHash;
        uint deviceId;
        address subscriber;
        bytes32 sessionSalt;
        // data = {
        //     groupId: Hash(1),
        //     metadata: Hash("Maker: Intel; Model: 1234; Serial: 1234"),
        //     firmwareHash: Hash("#include ...."),
        //     deviceId: Hash(0x22342)
        // }
    }

    Device[] internal devices; 

	mapping (address => Device) public subscriberToDevice;
    mapping (uint => address) public deviceIdToSubscriber; 
    mapping (uint => Device) public deviceIdToDevice;

    functon mintTokenIngredients(bytes32 groupId, bytes32 metadata, bytes32 firmwareHash, uint deviceId) public {
        // Create a new device
        Device memory device = Device(groupId, metadata, firmwareHash, deviceId);

        // Add the device to the devices array
        devices.push(device);

        // Add the device to the mappings 
        deviceIdToDevice[deviceId] = device;
    }

    function setSubscriberAddress (uint deviceId, address subscriber) public {
        // Get the device from the deviceId
        Device memory device = deviceIdToDevice[deviceId];

        // Set the subscriber address
        device.subscriber = subscriber;

        // Update the mappings
        deviceIdToDevice[deviceId] = device;
        deviceIdToSubscriber[deviceId] = subscriber;
    }

    function generateSessionSalt (bytes32 groupId, bytes32 metadata, bytes32 firmwareHash, uint deviceId, address subscriber) public returns (bytes32) {
        // Check if the recieved data is in the valid devices
        require(deviceIdToDevice[deviceId].groupId == groupId, "Invalid group ID");
        require(deviceIdToDevice[deviceId].metadata == metadata, "Invalid metadata");
        require(deviceIdToDevice[deviceId].firmwareHash == firmwareHash, "Invalid firmware hash");
        
        // Generate a random session salt using an oracle
        bytes32 sessionSalt = generateRandomSessionSalt();

        // Get the device from the deviceId
        Device memory device = deviceIdToDevice[deviceId]; 

        // Set the session salt
        device.sessionSalt = sessionSalt;

        // Generate a merkle hash using all the device ingredients
        bytes32 riotToken = generateMerkleHash(groupId, metadata, firmwareHash, deviceId, subscriber, sessionSalt); 

        // Update the mappings
        deviceIdToDevice[deviceId] = device; 

        // Return the merkle hash
        return riotToken;
    }
 



	// event DeviceDataUpdated(address indexed owner, string newData);

    // /**
    //  * @notice Update device data.
    //  * @param _data device data.
    //  */
    // function updateDeviceData(string memory _data) public {
    //     addressToDevice[msg.sender].data = _data;

    //     emit DeviceDataUpdated(msg.sender, _data);
    // }

    // function generateRiotKey(uint256 tokenId, uint256 groupId, bytes32 manufacturerMetadata, bytes32 firmwareSignature, bytes32 deviceId, address deviceSubscriber) public view returns (bytes32) {
    //     require(_exists(tokenId), "ERC721: token does not exist");

    //     // Verify that the token ingredients match the token data
    //     require(tokenId == tokenIdToTokenData[tokenId].tokenId, "Invalid token ID");
    //     require(groupId == tokenIdToTokenData[tokenId].groupId, "Invalid group ID");
    //     require(manufacturerMetadata == tokenIdToTokenData[tokenId].manufacturerMetadata, "Invalid manufacturer metadata");
    //     require(firmwareSignature == tokenIdToTokenData[tokenId].firmwareSignature, "Invalid firmware signature");
    //     require(deviceId == tokenIdToTokenData[tokenId].deviceId, "Invalid device ID");
    //     require(deviceSubscriber == tokenIdToTokenData[tokenId].deviceSubscriber, "Invalid device subscriber address");

    //     // Generate session salt hash using an oracle
    //     bytes32 sessionSaltHash = generateSessionSaltHash();

    //     // Compute the individual hashes of all the token ingredients
    //     bytes32 groupIdHash = keccak256(abi.encode(groupId));
    //     bytes32 manufacturerMetadataHash = keccak256(abi.encode(manufacturerMetadata));
    //     bytes32 firmwareSignatureHash = keccak256(abi.encode(firmwareSignature));
    //     bytes32 deviceIdHash = keccak256(abi.encode(deviceId));
    //     bytes32 deviceSubscriberHash = keccak256(abi.encode(deviceSubscriber));

    //     // Create a Merkle hash using the session salt hash and the individual hashes of all the token ingredients
    //     bytes32[] memory merkleHashElements = new bytes32[](6);
    //     merkleHashElements[0] = sessionSaltHash;
    //     merkleHashElements[1] = tokenIdHash;
    //     merkleHashElements[2] = groupIdHash;
    //     merkleHashElements[3] = manufacturerMetadataHash;
    //     merkleHashElements[4] = firmwareSignatureHash;
    //     merkleHashElements[5] = deviceIdHash;
    //     bytes32 merkleHash = merkleize(merkleHashElements);

    //     return merkleHash;
    // }


	constructor() {
	 
	}

	 
}
