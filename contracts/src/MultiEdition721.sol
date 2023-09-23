// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {ERC721} from "solmate/tokens/ERC721.sol";

contract MultiEdition721 is ERC721 {
    string allTokensTokenURI;
    uint256 immutable maxSupply;
    uint256 immutable initialPrice;

    uint256 public totalSupply;

    constructor(string memory _name, string memory _symbol, string memory _tokenURI, uint256 _maxSupply, uint256 _initialPrice) ERC721(_name, _symbol) {
        allTokensTokenURI = _tokenURI;
        maxSupply = _maxSupply;
        initialPrice = _initialPrice;
    }

    function tokenURI(uint256) public view virtual override returns (string memory) {
        return allTokensTokenURI;
    }

    function tokenPrice() public view returns (uint256) {
        uint256 remaining = maxSupply - totalSupply;

        uint256 slope = 11000;

        return initialPrice + (initialPrice * slope * (maxSupply - remaining)) / 10000;
    }
}
