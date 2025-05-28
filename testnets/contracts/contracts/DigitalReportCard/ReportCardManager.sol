// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface ICertificateNFT {
    function issueCertificate(address student, string memory tokenURI) external;
}

contract ReportCardManager {
    address public owner;
    ICertificateNFT public certificateNFT;

    struct ReportCard {
        string studentName;
        string studentId;
        string course;
        string grade;
        bool verified;
        string tokenURI; // keeps track of the NFT metadata
    }

    mapping(address => ReportCard[]) private studentReports;

    event ReportCardIssued(address indexed student, uint256 reportId);
    event ReportCardVerified(address indexed student, uint256 reportId);
    event OwnershipTransferred(address oldOwner, address newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(address _certificateNFT) {
        owner = msg.sender;
        certificateNFT = ICertificateNFT(_certificateNFT);
    }

    function issueReportCard(
        address student,
        string memory name,
        string memory studentId,
        string memory course,
        string memory grade,
        string memory tokenURI
    ) public onlyOwner {
        studentReports[student].push(ReportCard(name, studentId, course, grade, false, tokenURI));
        certificateNFT.issueCertificate(student, tokenURI);
        emit ReportCardIssued(student, studentReports[student].length - 1);
    }

    function verifyReportCard(address student, uint256 index) public onlyOwner {
        require(index < studentReports[student].length, "Invalid index");
        studentReports[student][index].verified = true;
        emit ReportCardVerified(student, index);
    }

    function getReportCard(address student, uint256 index) public view returns (ReportCard memory) {
        require(msg.sender == student || msg.sender == owner, "Access denied");
        require(index < studentReports[student].length, "Invalid index");
        return studentReports[student][index];
    }

    function transferOwnership(address newOwner) public onlyOwner {
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}