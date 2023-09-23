// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {MultiEdition721} from "./MultiEdition721.sol";

contract NftPoolFactory {
    event Created(address erc721Address);

    function create(
        string memory _name,
        string memory _symbol,
        string memory _tokenURI,
        uint256 _maxSupply,
        uint256 _initialPrice
    ) external returns (address contractAddress) {
        contractAddress = address(new MultiEdition721(_name, _symbol, _tokenURI, _maxSupply, _initialPrice));

        emit Created(contractAddress);
    }
}
