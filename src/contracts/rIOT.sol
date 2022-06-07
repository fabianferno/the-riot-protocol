// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

contract Riot {
  uint256 constant NULL = 0;

  address private _owner;
  uint256 public entityId = 0;

  struct Device {
    uint256 deviceId;
    bytes firmwareHash;
    bytes manufacturerHash;
    bytes32 riotHash;
    bool owned;
  }

  mapping(address => Device[]) ownersToDevices;
  Device[] devices;

  constructor() {
    _owner = msg.sender;
  }

  function createDevice(
    uint256 deviceId,
    string calldata manufacturerHash,
    string calldata firmwareHash
  ) public payable {
    require(msg.value >= 0.01 ether, "INSUFFICIENT_FUNDS");
    bytes32 _riotHash = keccak256(
      abi.encodePacked(deviceId, manufacturerHash, firmwareHash)
    );
    Device memory _device = Device(
      deviceId,
      bytes(manufacturerHash),
      bytes(firmwareHash),
      _riotHash,
      true
    );
    ownersToDevices[msg.sender][entityId] = _device;
    devices[entityId] = _device;
    entityId += 1;
  }

  function updateFirmware(uint256 _entityId, string calldata _firmwareHash)
    public
    validate(_entityId)
  {
    Device storage _device = ownersToDevices[msg.sender][_entityId];
    _device.firmwareHash = bytes(_firmwareHash);
    _device.riotHash = hashingHashes(
      _device.deviceId,
      _device.manufacturerHash,
      _device.firmwareHash
    );
  }

  function updateManufacturerId(
    uint256 _entityId,
    string calldata _manufacturerHash
  ) public validate(_entityId) {
    Device storage _device = ownersToDevices[msg.sender][_entityId];
    _device.manufacturerHash = bytes(_manufacturerHash);
    _device.riotHash = hashingHashes(
      _device.deviceId,
      _device.manufacturerHash,
      _device.firmwareHash
    );
  }

  function deleteDevice(uint256 _entityId) public validate(_entityId) {
    Device storage _device = ownersToDevices[msg.sender][_entityId];
    _device.owned = false;
    devices[_entityId].owned = false;
  }

  modifier validate(uint256 _entityId) {
    require(_entityId < entityId, "DEVICE_UNAVAILABLE");
    require(ownersToDevices[msg.sender][_entityId].owned, "NO_ACESS");
    Device memory _device = ownersToDevices[msg.sender][entityId];
    require(
      keccak256(
        abi.encodePacked(
          _device.deviceId,
          _device.manufacturerHash,
          _device.firmwareHash
        )
      ) == _device.riotHash,
      "MALICIOUS"
    );
    _;
  }

  function withdraw() public {
    require(msg.sender == _owner, "YOU_ARE_NOT_THE_OWNER");
    (bool callSuccess, ) = payable(msg.sender).call{
      value: address(this).balance
    }("");
    require(callSuccess, "TRANSACTION_FAILED");
  }

  function hashingHashes(
    uint256 _deviceId,
    bytes memory _manufacturerHash,
    bytes memory _firmwareHash
  ) internal pure returns (bytes32) {
    return
      keccak256(abi.encodePacked(_deviceId, _manufacturerHash, _firmwareHash));
  }
}
