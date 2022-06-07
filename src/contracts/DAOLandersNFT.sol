// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;
import "@openzeppelin/contracts@4.3.2/token/ERC1155/ERC1155.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract rIOTNFT is ERC1155, VRFConsumerBase, ConfirmedOwner(msg.sender) {
  // God of Cricket IDs
  uint256 public constant GOCL1 = 0;
  uint256 public constant GOCL2 = 1;
  uint256 public constant GOCL3 = 2;
  uint256 public constant GOCL4 = 3;
  uint256 public constant GOCL5 = 4;

  // God of Gambling IDs
  uint256 public constant GOGL1 = 5;
  uint256 public constant GOGL2 = 6;
  uint256 public constant GOGL3 = 7;
  uint256 public constant GOGL4 = 8;
  uint256 public constant GOGL5 = 9;

  // God of Snake IDs
  uint256 public constant GOSL1 = 10;
  uint256 public constant GOSL2 = 11;
  uint256 public constant GOSL3 = 12;
  uint256 public constant GOSL4 = 13;
  uint256 public constant GOSL5 = 14;

  // God of Wealth IDs
  uint256 public constant GOWL1 = 15;
  uint256 public constant GOWL2 = 16;
  uint256 public constant GOWL3 = 17;
  uint256 public constant GOWL4 = 18;
  uint256 public constant GOWL5 = 19;

  // MAX suppply
  mapping(uint256 => uint256) MAX_SUPPLY;

  mapping(uint256 => uint256) NFT_COUNT;

  bytes32 internal keyHash;
  uint256 internal fee;

  event GodRequested(bytes32 indexed requestId, bytes32 indexed keyHash);
  event GodRevealed(
    bytes32 indexed requestId,
    uint256 indexed randomness,
    uint256 indexed tokenIdTracker
  );
  mapping(bytes32 => uint256) public buyers;
  mapping(uint256 => uint256) public holders;
  mapping(uint256 => uint256) public owners;
  uint256 private constant REQUEST_IN_PROGRESS = 99999;

  /**
   *
   * Chainlink VRF Coordinator address: 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255
   * LINK token address:                0x326C977E6efc84E512bB9C30f76E30c160eD06FB
   * Key Hash: 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4
   * Fee: 0.001 * 10 ** 18; // 0.001 LINK
   */

  constructor(
    address _vrfCoordinator,
    address _link,
    bytes32 _keyHash,
    uint256 _fee
  )
    ERC1155(
      "https://gateway.pinata.cloud/ipfs/QmUTUxF4dmbfaVp6jiQWUQHMEEfz5kXfgJWLkvMSJGCpZh/{id}.json"
    )
    VRFConsumerBase(_vrfCoordinator, _link)
  {
    keyHash = _keyHash;
    fee = _fee;
    MAX_SUPPLY[0] = 200;
    MAX_SUPPLY[1] = 100;
    MAX_SUPPLY[2] = 70;
    MAX_SUPPLY[3] = 25;
    MAX_SUPPLY[4] = 5;
  }

  /*
   *Interface functions
   */
  function nftOwnershipCheck(uint256 _tokenId) public view returns (uint256) {
    return owners[_tokenId];
  }

  function nftSwapOwnership(uint256 tokenId1, uint256 tokenId2) public {
    uint256 tempDAO = owners[tokenId1];
    owners[tokenId1] = owners[tokenId2];
    owners[tokenId2] = tempDAO;
  }

  /*
   * Request God
   */
  function requestGod(uint256 _daoID) public returns (bytes32 requestId) {
    require(
      LINK.balanceOf(address(this)) > fee,
      "Not enough LINK to initialte function call"
    );
    require(holders[_daoID] == 0, "God NFT already requested");
    bytes32 _requestId = requestRandomness(keyHash, fee);
    buyers[_requestId] = _daoID;
    holders[_daoID] = REQUEST_IN_PROGRESS;
    emit GodRequested(_requestId, keyHash);
    return _requestId;
  }

  /**
   * Reveals the God metadata by minting the NFT
   */
  function revealGod(uint256 _daoID) public {
    require(holders[_daoID] != 0, "God not requested");
    require(holders[_daoID] != REQUEST_IN_PROGRESS, "Request under processing");
    uint256 tokenId = holders[_daoID];
    _mint(msg.sender, tokenId, 1, "");
    holders[_daoID] = 0;
  }

  function fulfillRandomness(bytes32 requestId, uint256 randomness)
    internal
    override
  {
    uint256 tokenIdTracker = (randomness % 20) - 1;
    for (uint256 i = tokenIdTracker; i != 2 * tokenIdTracker; i++) {
      if (MAX_SUPPLY[i % 5] > i % 20) break;
    }
    holders[buyers[requestId]] = tokenIdTracker;
    owners[tokenIdTracker] = buyers[requestId];
    emit GodRevealed(requestId, randomness, tokenIdTracker);
  }

  function setFee(uint256 _fee) public onlyOwner {
    fee = _fee;
  }

  function getFee() public view returns (uint256) {
    return fee;
  }

  function getChainlinkTokenAddress() public view returns (address) {
    return address(LINK);
  }

  function getKeyHash() public view returns (bytes32) {
    return keyHash;
  }

  function setKeyHash(bytes32 _keyHash) public onlyOwner {
    keyHash = _keyHash;
  }

  function withdrawLINK(address to, uint256 value) public onlyOwner {
    require(LINK.transfer(to, value), "Not enough LINK");
  }
}
