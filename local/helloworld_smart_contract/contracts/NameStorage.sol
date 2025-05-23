// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract NameStorage {
 string public name;

    function setName(string memory _name) public {
        name = _name;
    }

    function getName() public view returns (string memory) {
        return name;
    }
    
}