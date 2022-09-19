//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {

    string private greeting;

    mapping(address => string) private userToGreeting;

    event SetGreeting(address indexed user, string greeting);

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
    }

    function getUserSetGreeting(address user) public view returns (string memory) {
        return userToGreeting[user];
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
        userToGreeting[msg.sender] = _greeting;
        emit SetGreeting(msg.sender, greeting);
    } 
}


