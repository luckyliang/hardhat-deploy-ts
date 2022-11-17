// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlCrossChainUpgradeable.sol";

abstract  contract MyTokenCrossChain  is Initializable, ERC20Upgradeable, AccessControlCrossChainUpgradeable, UUPSUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    modifier onlyOwner() {
        require(owner == _msgSender(), "Not authorized");
        _;
    }

    function initialize(address initialOwner) initializer public {
        __ERC20_init("MyToken", "MTK");
        __AccessControl_init();
        __UUPSUpgradeable_init();
        _grantRole(_crossChainRoleAlias(DEFAULT_ADMIN_ROLE), initialOwner); // initialOwner is on a remote chain
    }

    //onlyCrossChainSender提供的修改器CrossChainEnabled来保护铸造和升级操作。
    //跨链拥有者，可以是另外一条链的合约（或者governor）
     function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function _authorizeUpgrade(address newImplementation) internal onlyRole(UPGRADER_ROLE) override {

    }
}

