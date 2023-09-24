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
    mapping (address => uint256[]) private _tokenIdsByOwner;

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

    function getTokenIdsByOwner(address owner)
        external view
        returns (uint256[] memory tokenIds)
    {
        return _tokenIdsByOwner[owner];
    }

    function transferFrom(
        address from,
        address to,
        uint256 id
    )
        public override
    {
       _removeFromOwnerList(from, id) ;
       _addToOwnerList(to, id) ;
        super.transferFrom(from, to, id);
    }

    function stash(address owner, uint256 tokenId) external onlyHook {
        require(owner != address(0) && _ownerOf[tokenId] == owner, 'cannot stash');
        _ownerOf[tokenId] = address(this);
        unchecked {
            --_balanceOf[owner];
            ++_balanceOf[address(this)];
        }
        _removeFromOwnerList(owner, tokenId);
        _addToOwnerList(address(this), tokenId);
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
            _addToOwnerList(receiver, tokenId);
            _safeMint(receiver, tokenId, receiverData);
        }
    }

    function getPoolKey() external view returns (PoolKey memory key) {
        key = LibUniNft.getPoolKey(HOOK, _fee);
    }

    function tokenURI(uint256) public view override returns (string memory) {
        return _tokenUri;
    }

    function _removeFromOwnerList(address owner, uint256 tokenId) private {
        uint256[] storage tokenIds = _tokenIdsByOwner[owner];
        uint256 n = tokenIds.length;
        for (uint256 i = 0; i < n; ++i) {
            if (tokenIds[i] == tokenId) {
                tokenIds[i] = tokenIds[n - 1];
                tokenIds.pop();
                break;
            }
        }
    }

    function _addToOwnerList(address owner, uint256 tokenId) private {
        uint256[] storage tokenIds = _tokenIdsByOwner[owner];
        uint256 n = tokenIds.length;
        for (uint256 i = 0; i < n; ++i) {
            if (tokenIds[i] == tokenId) {
                return;
            }
        }
        tokenIds.push(tokenId);
    }
}
