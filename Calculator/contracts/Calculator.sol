// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract Calculator {
    string public message;

    constructor() public {
        message = "Hello blockchain";
    }

    function setMessage(string memory _message) public {
        message = _message;
    }
    function add(uint256 a, uint256 b) public pure returns (uint256) {
        return a+b;
    }
    function subtract(uint256 a, uint256 b) public pure returns (uint256) {
        return a-b;
    }
    function multiply(uint256 a, uint256 b) public pure returns (uint256) {
        return a*b;
    }
    function divide(uint256 a, uint256 b) public pure returns (uint256) {
        require(b != 0, "Can not divide by zero");
        return a/b;
    }
}