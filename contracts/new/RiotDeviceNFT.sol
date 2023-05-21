// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title RiotDeviceNFT
 * @dev ERC721 token contract for Riot devices.
 * @author Fabian Ferno and Gabriel Antony Xaviour
 */
contract RiotDeviceNFT is ERC721, ERC721URIStorage {
    address public immutable i_riotContract;

    /**
     * @dev Initializes the RiotDeviceNFT contract.
     * @param name The name of the token.
     * @param symbol The symbol of the token.
     */
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        i_riotContract = msg.sender;
    }

    /**
     * @dev Modifier to check if the caller is the Riot contract.
     */
    modifier onlyRiotContract() {
        require(msg.sender == i_riotContract, "Unauthorized.");
        _;
    }

    /**
     * @dev Safely mints a new token and assigns it to the specified address.
     * @param tokenId The token ID to be minted.
     * @param to The address to which the token will be minted and assigned.
     * @param uri The URI for the token's metadata.
     */
    function safeMint(
        uint256 tokenId,
        address to,
        string memory uri
    ) public onlyRiotContract {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /**
     * @dev Safely transfers a token from one address to another.
     * @param from The address from which the token is being transferred.
     * @param to The address to which the token is being transferred.
     * @param tokenId The ID of the token being transferred.
     * @param data Additional data with no specified format.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override onlyRiotContract {
        _safeTransfer(from, to, tokenId, data);
    }

    /**
     * @dev Internal function to burn a token.
     * @param tokenId The ID of the token to be burned.
     */
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    /**
     * @dev Retrieves the URI for a given token ID.
     * @param tokenId The ID of the token.
     * @return The URI for the token's metadata.
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
