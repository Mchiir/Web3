// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "./2ERC20.sol";

contract MyToken is ERC20 {
    constructor(string memory name, string memory symbol, uint8 decimals)
        ERC20(name, symbol, decimals){
            // Minting 100 tokens to msg.sender
            // Similar to how
            // 1 dollar = 100 cents
            // 1 token = 1 * (10 ** decimals) || 10^decimals
            _mint(msg.sender, 100 * 10 ** uint256(decimals));
        }
}