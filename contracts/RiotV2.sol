// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

contract RiotV2 {
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

    mapping(address => Device) public deviceIdToDevice;

    constructor() {}

    function mintDevice(
        bytes32 _firmwareHash,
        bytes32 _deviceDataHash,
        bytes32 _deviceGroupIdHash,
        address _deviceId
    ) public returns (Device memory) {
        bytes32 sessionSalt = keccak256(
            abi.encodePacked(block.timestamp, block.difficulty, msg.sender)
        );
        Device memory newDevice = Device(
            _firmwareHash,
            _deviceDataHash,
            _deviceGroupIdHash,
            _deviceId,
            msg.sender,
            sessionSalt
        );
        deviceIdToDevice[_deviceId] = newDevice;
        devices.push(_deviceId);
        return newDevice;
    }

    function setSubscriberAddress(address _deviceId, address _subscriber)
        public
        returns (Device memory)
    {
        // Update the mappings
        deviceIdToDevice[_deviceId].subscriber = _subscriber;

        // Update the session salt
        bytes32 newSessionSalt = keccak256(
            abi.encodePacked(block.timestamp, block.difficulty, _subscriber)
        );
        deviceIdToDevice[_deviceId].sessionSalt = newSessionSalt;

        return deviceIdToDevice[_deviceId];
    }

    function checkIfDeviceIsMinted(address _deviceId)
        public
        view
        returns (bool)
    {
        return deviceIdToDevice[_deviceId].deviceId == _deviceId;
    }

    function computeMerkleRoot(bytes32[] memory hashes)
        public
        pure
        returns (bytes32)
    {
        require(hashes.length > 0, "Empty array of hashes");

        uint256 numLeaves = hashes.length;
        uint256 treeDepth = ceilLog2(numLeaves);
        uint256 numNodes = 2**treeDepth - 1;

        bytes32[] memory nodes = new bytes32[](numNodes);

        // Store the leaf nodes in the tree
        for (uint256 i = 0; i < numLeaves; i++) {
            nodes[numNodes - numLeaves + i + 1] = hashes[i];
        }

        // Compute the intermediate nodes in the tree
        for (uint256 i = numNodes - numLeaves; i > 0; i--) {
            nodes[i] = sha256(abi.encodePacked(nodes[2 * i], nodes[2 * i + 1]));
        }

        // The root node is the top-level node in the tree
        return nodes[1];
    }

    function ceilLog2(uint256 x) private pure returns (uint256) {
        uint256 result = 0;
        uint256 y = x;

        while (y > 0) {
            result++;
            y = y >> 1;
        }

        if (x == (2**(result - 1))) {
            return result - 1;
        } else {
            return result;
        }
    }

    function generateRiotKeyForDevice(
        bytes32 _firmwareHash,
        bytes32 _deviceDataHash,
        bytes32 _deviceGroupIdHash,
        address _deviceId
    ) public view returns (bytes32) {
        // Check if the recieved data is in the valid devices
        checkIfDeviceIsMinted(_deviceId);
        require(
            deviceIdToDevice[_deviceId].firmwareHash == _firmwareHash,
            "Invalid FirmwareHash"
        );
        require(
            deviceIdToDevice[_deviceId].deviceDataHash == _deviceDataHash,
            "Invalid FirmwareHash"
        );
        require(
            deviceIdToDevice[_deviceId].deviceGroupIdHash == _deviceGroupIdHash,
            "Invalid FirmwareHash"
        );

        bytes32[] memory hashes = new bytes32[](6);
        hashes[0] = deviceIdToDevice[_deviceId].firmwareHash;
        hashes[1] = deviceIdToDevice[_deviceId].deviceDataHash;
        hashes[2] = deviceIdToDevice[_deviceId].deviceGroupIdHash;
        hashes[3] = bytes32(bytes20(_deviceId));
        hashes[4] = bytes32(bytes20(deviceIdToDevice[_deviceId].subscriber));
        hashes[5] = deviceIdToDevice[_deviceId].sessionSalt;
        return computeMerkleRoot(hashes);
    }

    function generateRiotKeyForSubscriber(
        address _deviceId,
        address _subscriber
    ) public view returns (bytes32) {
        // Check if the recieved data is in the valid devices
        checkIfDeviceIsMinted(_deviceId);
        require(
            deviceIdToDevice[_deviceId].subscriber == _subscriber,
            "Unauthorized User"
        );

        bytes32[] memory hashes = new bytes32[](6);
        hashes[0] = deviceIdToDevice[_deviceId].firmwareHash;
        hashes[1] = deviceIdToDevice[_deviceId].deviceDataHash;
        hashes[2] = deviceIdToDevice[_deviceId].deviceGroupIdHash;
        hashes[3] = bytes32(bytes20(_deviceId));
        hashes[4] = bytes32(bytes20(_subscriber));
        hashes[5] = deviceIdToDevice[_deviceId].sessionSalt;
        return computeMerkleRoot(hashes);
    }
}
