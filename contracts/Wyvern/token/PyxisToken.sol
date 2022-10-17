// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "../auth/Employable.sol";
import "../auth/Destructible.sol";
import "../registry/ProxyRegistry.sol";

contract PyxisToken is ERC721, Employable, Destructible {

    address public registry;

    using SafeMath for uint32;
    mapping (uint256 => string) public fieldToTokenURI;

    event Split(address indexed from, uint256  indexed tokenId);
    event Mint(address indexed to, uint256 indexed tokenId);

    constructor(address _registry, string memory  _name, string memory _symbol) ERC721(_name, _symbol)  {
        registry = _registry;
        _setBaseURI("https://sevenseas.mypinata.cloud/ipfs/");
    }

    function mintWithURI(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) public onlyEmployerOrOwner returns (uint256) {
        (uint16 wid , uint16 cid , uint16 aid, uint32 x, uint32 y, uint32 dx, uint32 dy) = decodeTokenId(tokenId);
        if (dx > 1 || dy > 1) {
            //merge
            for (uint32 _x = x; _x < x.add(dx); _x++) {
                for (uint32 _y = y; _y < y.add(dy); _y++) {
                    uint256 fieldTokenId = encodeToTokenId(wid, cid, aid, _x,  _y, 1, 1);
                    _burn(fieldTokenId);
                }
            }
        }
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        emit Mint (to, tokenId);
        return tokenId;
    }

    function split(address from, uint256 _tokenId) public onlyEmployerOrOwner {
  
        (uint16 wid , uint16 cid , uint16 aid, uint32 x, uint32 y, uint32 dx, uint32 dy) = decodeTokenId(_tokenId);
        require(dx > 1 || dy > 1, "split: tokenId dx or dy must gt 1");
        for (uint32 _x = x; _x < x.add(dx); _x++) {
            for (uint32 _y = y; _y < y.add(dy); _y++) {
                uint256 fieldTokenId = encodeToTokenId(wid, cid, aid, _x,  _y, 1, 1);
                _mint(from, fieldTokenId); 
                _setTokenURI(fieldTokenId, fieldToTokenURI[fieldTokenId]);
            }
        }
               
        _burn(_tokenId);
        emit Split(from, _tokenId);
    }

    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        ProxyRegistry proxyRegistry = ProxyRegistry(registry);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }
        return super.isApprovedForAll(owner, operator);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view virtual override returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    function encodeToTokenId(
        uint16 wid,
        uint16 cid,
        uint16 aid,
        uint32 x,
        uint32 y,
        uint32 dx,
        uint32 dy
    ) public pure returns (uint256) {
        bytes memory data = abi.encodePacked(
            uint80(0),
            wid,
            cid,
            aid,
            x,
            y,
            dx,
            dy
        );
        return abi.decode(data, (uint256));
    }

    function decodeTokenId(uint256 tokenId)
        public
        pure
        returns (
            uint16 wid,
            uint16 cid,
            uint16 aid,
            uint32 x,
            uint32 y,
            uint32 dx,
            uint32 dy
        )
    {
        wid = uint16(tokenId >> (160));
        cid = uint16(tokenId >> (144));
        aid = uint16(tokenId >> (128));
        x = uint32(tokenId >> (96));
        y = uint32(tokenId >> (64));
        dx = uint32(tokenId >> (32));
        dy = uint32(tokenId);
        return (wid, cid, aid, x, y, dx, dy);
    }

    function setBaseURI(string memory uri) public onlyEmployerOrOwner {
        _setBaseURI(uri);
    }

    function burn(uint256 tokenId) public onlyEmployerOrOwner {
        _burn(tokenId);
    }

    function setTokenURI(uint256 tokenId, string memory tokenURI) public onlyEmployerOrOwner {
         _setTokenURI(tokenId, tokenURI);
    }

    function _setTokenURI(uint256 tokenId, string memory tokenURI) internal override {
        fieldToTokenURI[tokenId] = tokenURI;
        super._setTokenURI(tokenId, tokenURI);
    }
}
