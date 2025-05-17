// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Adoption {
    address[20] public adopters;

    // Adopt a pet
    function adopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId < 20, "Invalid pet ID");
        require(adopters[petId] == address(0), "Pet already adopted");

        adopters[petId] = msg.sender;
        return petId;
    }

    // Unadopt a pet
    function unadopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId < 20, "Invalid pet ID");
        require(adopters[petId] == msg.sender, "You are not the adopter");

        adopters[petId] = address(0);
        return petId;
    }

    // Get all adopters
    function getAdopters() public view returns (address[20] memory) {
        return adopters;
    }
}