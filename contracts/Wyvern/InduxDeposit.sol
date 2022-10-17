// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

import "./auth/Destructible.sol";
import "./auth/Employable.sol";
import "./lib/ReentrancyGuarded.sol";

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
interface IERC20 {
    function transferFrom(
        address from,
        address to,
        uint value
    ) external;
}

contract InduxDeposit is ReentrancyGuarded, Destructible, Employable {
    IERC20 private token;
    address public receiver;

    event Deposited(address from, address to, uint256 amount);

    mapping(address => uint256) private _balances;

    constructor(address _tokenAddress, address _account) {
        token = IERC20(_tokenAddress);
        receiver = _account;
    }

    function setToken(address _tokenAddress) public onlyOwner {
        require(address(token) != _tokenAddress, "InduxDeposit: reset token");
        token = IERC20(_tokenAddress);
    }

    function setReceiver(address _account) public onlyOwner {
        require(receiver != _account, "InduxDeposit: reset receiver");
        receiver = _account;
    }

    function tokenAddress() public view returns(address) {
        return address(token);
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function deposit(uint amount) public payable {
        address sender = _msgSender();
        require(
            _balances[sender] == 0,
            "InduxDeposit: The sender has deposited"
        );

        token.transferFrom(sender, receiver, amount);

        _balances[sender] = amount;

        emit Deposited(sender, receiver, amount);
    }
}
