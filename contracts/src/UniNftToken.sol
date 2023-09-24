// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/console2.sol";
import 'solmate/tokens/ERC721.sol';
import {IPoolManager} from 'v4-core/interfaces/IPoolManager.sol';
import {PoolKey} from 'v4-core/types/PoolKey.sol';
import "./LibUniNft.sol";
import "./UniNftHook.sol";

contract UniNftToken is ERC721 {
    string private _tokenUri;
    IPoolManager public immutable MGR; 
    UniNftHook public immutable HOOK; 
    uint24 private immutable _fee;
    uint256 private _lastTokenId;
    uint256[] private _stashedTokenIds;

    constructor(
        IPoolManager mgr,
        UniNftHook hook,
        uint24 fee,
        string memory name,
        string memory symbol,
        string memory tokenUri
    ) ERC721(name, symbol) {
        MGR = mgr;
        HOOK = hook;
        _tokenUri = tokenUri;
        _fee = fee;
    }

    modifier onlyHook() {
        require(msg.sender == address(HOOK), 'not hook');
        _;
    }

    function stash(address owner, uint256 tokenId) external onlyHook {
        require(owner != address(0) && _ownerOf[tokenId] == owner, 'cannot stash');
        _ownerOf[tokenId] = address(this);
        unchecked {
            --_balanceOf[owner];
            ++_balanceOf[address(this)];
        }
        delete getApproved[tokenId];
        _stashedTokenIds.push(tokenId);
        emit Transfer(owner, address(this), tokenId);
    }
   
    function claimOrMint(address receiver, bytes calldata receiverData)
        external onlyHook
        returns (uint256 tokenId)
    {
        // Claim from stash.
        if (_stashedTokenIds.length != 0) {
            tokenId = _stashedTokenIds[_stashedTokenIds.length - 1];
            _stashedTokenIds.pop();
            this.safeTransferFrom(address(this), receiver, tokenId, receiverData);
        } else {
            // Mint new token.
            tokenId = ++_lastTokenId;
            _safeMint(receiver, tokenId, receiverData);
        }
    }

    function getPoolKey() external view returns (PoolKey memory key) {
        key = LibUniNft.getPoolKey(HOOK, _fee);
    }

    function tokenURI(uint256) public view override returns (string memory) {
        return _tokenUri;
    }
}
