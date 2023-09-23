// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {ERC721} from 'solmate/tokens/ERC721.sol';

contract MultiEdition721 is ERC721 {
  string allTokensTokenURI;
  uint256 immutable maxSupply;

  constructor(string memory _name, string memory _symbol, string memory _tokenURI, uint256 _maxSupply) ERC721(_name, _symbol) {
    allTokensTokenURI = _tokenURI;
    maxSupply = _maxSupply;
  }

  function tokenURI(uint256) public view virtual override returns (string memory) {
    return allTokensTokenURI;
  } 
}