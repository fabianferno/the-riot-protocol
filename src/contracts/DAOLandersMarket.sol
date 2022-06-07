// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

contract rIOTMarket {
  mapping(uint256 => List) listings;

  struct List {
    uint256 nftTokenId;
    uint256 daoID;
    bool status;
  }
  uint256 listings_count;

  constructor() {
    listings_count = 0;
  }

  /*
   *Interface functions
   */

  function checkListingExpiry(uint256 listingId) public view returns (bool) {
    return listings[listingId].status;
  }

  function expireListing(uint256 listingId) public {
    listings[listingId].status = false;
  }

  function getNftId(uint256 listingId) public view returns (uint256) {
    return listings[listingId].nftTokenId;
  }

  function getDAOID(uint256 listingId) public view returns (uint256) {
    return listings[listingId].daoID;
  }

  function createListing(uint256 tokenId, uint256 daoID) public {
    List storage list = listings[listings_count];
    list.nftTokenId = tokenId;
    list.daoID = daoID;
    list.status = true;
    listings_count++;
  }
}
