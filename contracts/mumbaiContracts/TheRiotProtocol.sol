// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title TheRiotProtocol
 * @dev Contract for managing the Riot Protocol and device registration.
 * @author Fabian Ferno and Gabriel Antony Xaviour
 */
contract TheRiotProtocol is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;

    struct Device {
        bytes32 firmwareHash;
        bytes32 deviceDataHash;
        bytes32 deviceGroupIdHash;
        uint deviceId;
        address subscriber;
        bytes32 sessionSalt;
        bool exists;
    }

    uint256 private _deviceCount;
    Counters.Counter private _tokenIdCounter;
    mapping(bytes32 => uint) private groupRegistered;
    mapping(uint => Device) private deviceIdToDevice;

    constructor() ERC721("Riot Protocol", "RP") {}

    /**
     * @dev Modifier to check if the device is minted.
     * @param _deviceId The device token Id to check.
     */
    modifier checkIfDeviceIsMinted(uint _deviceId) {
        require(isDeviceMinted(_deviceId), "Device not minted.");
        _;
    }

    /**
     * @dev Public function to add a new device.
     * @param _firmwareHash The firmware hash of the device.
     * @param _deviceDataHash The device data hash.
     * @param _deviceGroupIdHash The device group ID hash.
     * @param _uri The URI for the token's metadata.
     */
    function addDevice(
        bytes32 _firmwareHash,
        bytes32 _deviceDataHash,
        bytes32 _deviceGroupIdHash,
        string memory _uri
    ) public {
        uint256 _deviceId = _tokenIdCounter.current();
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
            true
        );
        deviceIdToDevice[_deviceId] = newDevice;
        _deviceCount += 1;
        _safeMint(msg.sender, _deviceId);
        _setTokenURI(_deviceId, _uri);
        _tokenIdCounter.increment();
    }

    /**
     * @dev Sets the subscriber address for a device.
     * @param _deviceId The device Token Id.
     * @param _subscriber The new subscriber address.
     */
    function setSubscriberAddress(uint _deviceId, address _subscriber) public {
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
        safeTransferFrom(
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
    function updateFirmware(bytes32 _firmwareHash, uint _deviceId) public {
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
     * @param _deviceId The device Token Id.
     * @return The RIOT key for the device.
     */
    function generateRiotKeyForDevice(
        bytes32 _firmwareHash,
        bytes32 _deviceDataHash,
        bytes32 _deviceGroupIdHash,
        uint _deviceId
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
        hashes[3] = bytes32(_deviceId);
        hashes[4] = bytes32(bytes20(deviceIdToDevice[_deviceId].subscriber));
        hashes[5] = deviceIdToDevice[_deviceId].sessionSalt;

        return getMerkleRoot(hashes);
    }

    /**
     * @dev Generates a RIOT key for the subscriber of a device.
     * @param _deviceId The device Token Id.
     * @return The RIOT key for the subscriber of the device.
     */
    function generateRiotKeyForSubscriber(uint _deviceId)
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
        hashes[3] = bytes32(_deviceId);
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
     * @param _deviceId The device Token Id.
     * @return The Device struct.
     */
    function getDevice(uint _deviceId) public view returns (Device memory) {
        return deviceIdToDevice[_deviceId];
    }

    /**
     * @dev Returns the associated NFT contract address for a given device group ID hash.
     * @param _deviceGroupIdHash The device group ID hash.
     * @return The Device Token Id.
     */
    function getGroupContract(bytes32 _deviceGroupIdHash)
        public
        view
        returns (uint)
    {
        return groupRegistered[_deviceGroupIdHash];
    }

    /**
     * @dev Checks if a device is minted.
     * @param _deviceId The device token Id.
     * @return A boolean indicating if the device is minted.
     */
    function isDeviceMinted(uint _deviceId) public view returns (bool) {
        return deviceIdToDevice[_deviceId].exists;
    }

    // Overrides
    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
