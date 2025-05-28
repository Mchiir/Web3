// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CertificateNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    address public reportCardManager;

    modifier onlyManager() {
        require(msg.sender == reportCardManager, "Only ReportCardManager can call this");
        _;
    }

    constructor() ERC721("ReportCardCertificate", "RCC") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function setManager(address manager) external onlyOwner {
        reportCardManager = manager;
    }

    function issueCertificate(address student, string memory tokenURI) external onlyManager {
        uint256 tokenId = tokenCounter;
        _safeMint(student, tokenId);
        _setTokenURI(tokenId, tokenURI);
        tokenCounter++;
    }

    // Soulbound behavior using _update hook
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721)
        returns (address)
    {
        address from = super._update(to, tokenId, auth);
        require(from == address(0), "Soulbound: Non-transferable");
        return from;
    }
}