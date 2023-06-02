// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./IRiotDeviceNFT.sol";
import "./RiotDeviceNFT.sol";

/**
 * @title TheRiotProtocol
 * @dev Contract for managing the Riot Protocol and device registration.
 * @author Fabian Ferno and Gabriel Antony Xaviour
 */
contract TheRiotProtocol {
    struct Device {
        // JSON string that includes groupId; metadata; firmware; deviceId; subAddress;
        bytes32 firmwareHash;
        bytes32 deviceDataHash;
        bytes32 deviceGroupIdHash;
        address deviceId;
        address subscriber;
        bytes32 sessionSalt;
        address nftContract;
        bool exists;
    }

    uint256 private _deviceCount;

    mapping(bytes32 => address) private groupRegistered;
    mapping(address => Device) private deviceIdToDevice;

    /**
     * @dev Modifier to check if the device is minted.
     * @param _deviceId The device address to check.
     */
    modifier checkIfDeviceIsMinted(address _deviceId) {
        require(isDeviceMinted(_deviceId), "Device not minted.");
        _;
    }

    /**
     * @dev Internal function to add a new device.
     * @param _firmwareHash The firmware hash of the device.
     * @param _deviceDataHash The device data hash.
     * @param _deviceGroupIdHash The device group ID hash.
     * @param _deviceId The device address.
     * @param nftContract The address of the associated NFT contract.
     * @param _uri The metadata URI of the new Device
     */
    function _addDevice(
        bytes32 _firmwareHash,
        bytes32 _deviceDataHash,
        bytes32 _deviceGroupIdHash,
        address _deviceId,
        address nftContract,
        string memory _uri
    ) internal {
        require(!isDeviceMinted(_deviceId), "Device already minted.");
        bytes32 sessionSalt = keccak256(
            abi.encodePacked(block.timestamp, block.difficulty, msg.sender)
        );
        Device memory newDevice = Device(
            _firmwareHash,
            _deviceDataHash,
            _deviceGroupIdHash,
            _deviceId,
            msg.sender,
            sessionSalt,
            nftContract,
            true
        );
        deviceIdToDevice[_deviceId] = newDevice;
        _deviceCount += 1;
        IRiotDeviceNFT(nftContract).safeMint(
            uint256(uint160(_deviceId)),
            msg.sender,
            _uri
        );
    }

    /**
     * @dev Registers a new group and adds a device.
     * @param _name The name of the Riot Group NFT contract.
     * @param _symbol The symbol of the Riot Group NFT contract.
     * @param _firmwareHash The firmware hash of the device.
     * @param _deviceDataHash The device data hash.
     * @param _deviceGroupIdHash The device group ID hash.
     * @param _deviceId The device address.
     * @param _uri The metadata URI of the new Device
     */
    function registerGroup(
        string memory _name,
        string memory _symbol,
        bytes32 _firmwareHash,
        bytes32 _deviceDataHash,
        bytes32 _deviceGroupIdHash,
        address _deviceId,
        string memory _uri
    ) public {
        require(
            !isGroupRegistered(_deviceGroupIdHash),
            "Group already registered."
        );
        RiotDeviceNFT nftContract = (new RiotDeviceNFT)(_name, _symbol);
        groupRegistered[_deviceGroupIdHash] = address(nftContract);

        _addDevice(
            _firmwareHash,
            _deviceDataHash,
            _deviceGroupIdHash,
            _deviceId,
            address(nftContract),
            _uri
        );
    }

    /**
     * @dev Mints a new device and associates it with a group.
     * @param _firmwareHash The firmware hash of the device.
     * @param _deviceDataHash The device data hash.
     * @param _deviceGroupIdHash The device group ID hash.
     * @param _deviceId The device address.
     * @param _uri The metadata URI of the new Device
     */
    function mintDevice(
        bytes32 _firmwareHash,
        bytes32 _deviceDataHash,
        bytes32 _deviceGroupIdHash,
        address _deviceId,
        string memory _uri
    ) public {
        require(isGroupRegistered(_deviceGroupIdHash), "Group not registered.");
        _addDevice(
            _firmwareHash,
            _deviceDataHash,
            _deviceGroupIdHash,
            _deviceId,
            getGroupContract(_deviceGroupIdHash),
            _uri
        );
    }

    /**
     * @dev Sets the subscriber address for a device.
     * @param _deviceId The device address.
     * @param _subscriber The new subscriber address.
     */
    function setSubscriberAddress(address _deviceId, address _subscriber)
        public
    {
        require(
            msg.sender == deviceIdToDevice[_deviceId].subscriber,
            "Unauthorized User"
        );
        // Update the mappings
        deviceIdToDevice[_deviceId].subscriber = _subscriber;

        // Update the session salt
        bytes32 newSessionSalt = keccak256(
            abi.encodePacked(block.timestamp, block.difficulty, _subscriber)
        );
        deviceIdToDevice[_deviceId].sessionSalt = newSessionSalt;
        IRiotDeviceNFT(deviceIdToDevice[_deviceId].nftContract)
            .safeTransferFrom(
                msg.sender,
                _subscriber,
                uint256(uint160(_deviceId)),
                ""
            );
    }

    /**
     * @dev Updates the firmware hash for the device.
     * @param _firmwareHash The new firmware hash.
     * @param _deviceId The device address.
     */
    function updateFirmware(bytes32 _firmwareHash, address _deviceId) public {
        require(
            msg.sender == deviceIdToDevice[_deviceId].subscriber,
            "Unauthorized User"
        );
        deviceIdToDevice[_deviceId].firmwareHash = _firmwareHash;
    }

    /**
     * @dev Calculates the merkle root from an array of hashes.
     * @param hashes The array of hashes.
     * @return rootHash The merkle root hash.
     */
    function getMerkleRoot(bytes32[] memory hashes)
        public
        pure
        returns (bytes32)
    {
        require(hashes.length == 6, "Input array must have 6 elements");

        bytes32 rootHash = keccak256(
            abi.encodePacked(
                keccak256(abi.encodePacked(hashes[0], hashes[1])),
                keccak256(abi.encodePacked(hashes[2], hashes[3])),
                keccak256(abi.encodePacked(hashes[4], hashes[5]))
            )
        );

        return rootHash;
    }

    /**
     * @dev Generates a RIOT key for a device.
     * @param _firmwareHash The firmware hash of the device.
     * @param _deviceDataHash The device data hash.
     * @param _deviceGroupIdHash The device group ID hash.
     * @param _deviceId The device address.
     * @return The RIOT key for the device.
     */
    function generateRiotKeyForDevice(
        bytes32 _firmwareHash,
        bytes32 _deviceDataHash,
        bytes32 _deviceGroupIdHash,
        address _deviceId
    ) public view checkIfDeviceIsMinted(_deviceId) returns (bytes32) {
        // Check if the received data is in the valid devices
        require(
            deviceIdToDevice[_deviceId].firmwareHash == _firmwareHash,
            "Invalid FirmwareHash"
        );
        require(
            deviceIdToDevice[_deviceId].deviceDataHash == _deviceDataHash,
            "Invalid DeviceDataHash"
        );
        require(
            deviceIdToDevice[_deviceId].deviceGroupIdHash == _deviceGroupIdHash,
            "Invalid DeviceGroupIdHash"
        );

        bytes32[] memory hashes = new bytes32[](6);
        hashes[0] = deviceIdToDevice[_deviceId].firmwareHash;
        hashes[1] = deviceIdToDevice[_deviceId].deviceDataHash;
        hashes[2] = deviceIdToDevice[_deviceId].deviceGroupIdHash;
        hashes[3] = bytes32(bytes20(_deviceId));
        hashes[4] = bytes32(bytes20(deviceIdToDevice[_deviceId].subscriber));
        hashes[5] = deviceIdToDevice[_deviceId].sessionSalt;

        return getMerkleRoot(hashes);
    }

    /**
     * @dev Generates a RIOT key for the subscriber of a device.
     * @param _deviceId The device address.
     * @return The RIOT key for the subscriber of the device.
     */
    function generateRiotKeyForSubscriber(address _deviceId)
        public
        view
        checkIfDeviceIsMinted(_deviceId)
        returns (bytes32)
    {
        // Check if the received data is in the valid devices
        require(
            deviceIdToDevice[_deviceId].subscriber == msg.sender,
            "Unauthorized User"
        );

        bytes32[] memory hashes = new bytes32[](6);
        hashes[0] = deviceIdToDevice[_deviceId].firmwareHash;
        hashes[1] = deviceIdToDevice[_deviceId].deviceDataHash;
        hashes[2] = deviceIdToDevice[_deviceId].deviceGroupIdHash;
        hashes[3] = bytes32(bytes20(_deviceId));
        hashes[4] = bytes32(bytes20(msg.sender));
        hashes[5] = deviceIdToDevice[_deviceId].sessionSalt;
        return getMerkleRoot(hashes);
    }

    /**
     * @dev Returns the count of registered devices.
     * @return The number of registered devices.
     */
    function getDevicesCount() public view returns (uint256) {
        return _deviceCount;
    }

    /**
     * @dev Returns the Device struct for a given device address.
     * @param _deviceId The device address.
     * @return The Device struct.
     */
    function getDevice(address _deviceId) public view returns (Device memory) {
        return deviceIdToDevice[_deviceId];
    }

    /**
     * @dev Returns the associated NFT contract address for a given device group ID hash.
     * @param _deviceGroupIdHash The device group ID hash.
     * @return The NFT contract address.
     */
    function getGroupContract(bytes32 _deviceGroupIdHash)
        public
        view
        returns (address)
    {
        return groupRegistered[_deviceGroupIdHash];
    }

    /**
     * @dev Checks if a device is minted.
     * @param _deviceId The device address.
     * @return A boolean indicating if the device is minted.
     */
    function isDeviceMinted(address _deviceId) public view returns (bool) {
        return deviceIdToDevice[_deviceId].exists;
    }

    /**
     * @dev Checks if a device group is registered.
     * @param _deviceGroupIdHash The device group ID hash.
     * @return A boolean indicating if the group is registered.
     */
    function isGroupRegistered(bytes32 _deviceGroupIdHash)
        public
        view
        returns (bool)
    {
        return groupRegistered[_deviceGroupIdHash] != address(0);
    }
}
