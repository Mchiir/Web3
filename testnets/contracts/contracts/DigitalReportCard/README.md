# Security Best Practices

This project uses several security features and patterns to ensure integrity, privacy, and control over the issuance and verification of digital certificates (non-transferable NFTs):

| Feature                | Description                                                                                     |
|------------------------|-------------------------------------------------------------------------------------------------|
| **onlyOwner modifier**  | Restricts sensitive functions (e.g., issuing or verifying records) to authorized admins such as school officials. |
| **Read-access checks**  | Ensures that students can only view their own records, protecting privacy and preventing unauthorized access. |
| **Immutable data**      | Certificate data, once stored, cannot be altered—only verified—preserving the authenticity and integrity of records. |
| **Events**              | Emits logs on contract state changes to enable off-chain verification, auditing, and monitoring. |
| **Ownership transfer**  | Supports transferring admin privileges to new authorized staff, facilitating smooth role handoffs. |
| **SafeMath usage**      | Protects against integer overflow/underflow (necessary for Solidity versions < 0.8.0; built-in checks for 0.8+). |

---

## Using ERC721 Non-transferable NFTs (Soulbound Tokens)

- This project implements **soulbound NFTs**, meaning NFTs that **cannot be transferred** once minted.
- These NFTs represent verified digital certificates or report cards that are permanently linked to a student's wallet address.
- This approach enhances trust and accountability by ensuring certificates are uniquely tied to rightful owners.

---

## Tools and Resources

- Metadata and files are stored on **IPFS** using [nft.storage](https://app.nft.storage/), providing decentralized and immutable storage for NFT assets and metadata.