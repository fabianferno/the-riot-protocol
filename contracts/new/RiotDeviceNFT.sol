// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RiotDeviceNFT is ERC721, ERC721URIStorage {
    address public immutable i_riotContract;

    constructor(
        string memory name,
        string memory symbol,
        address riotContract
    ) ERC721(name, symbol) {
        i_riotContract = riotContract;
    }

    modifier onlyRiotContract() {
        require(msg.sender == i_riotContract, "Unauthorized.");
        _;
    }

    function safeMint(
        uint256 tokenId,
        address to,
        string memory uri
    ) public onlyRiotContract {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override onlyRiotContract {
        _safeTransfer(from, to, tokenId, data);
    }

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
}
