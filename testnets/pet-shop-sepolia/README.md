# Pet-Shop Adoption (Ethereum Sepolia) [Live site at github pages](https://mchiir.github.io/Web3)

This project marks my first smart contract deployment, tracking pet adoptions on the Sepolia Ethereum testnet.

## Project Overview

A simple decentralized application (DApp) where users can adopt pets. Built with Solidity and deployed using Hardhat.

## Contract Information

- Contract Name: `Adoption.sol`
- Deployed Address: [0x11b94...CA766D5](https://sepolia.etherscan.io/address/0x11b94dc4cE869aC5355999DB2273DA775CA766D5)
- Deployer Address: [0xD8B06...3a6AE2](https://sepolia.etherscan.io/address/0xD8B06d9f3412C14F04cE79d80b5c4BDcF93a6AE2)
- Network: Sepolia Testnet

## Deployment Journey

1. Funded my test wallet via [sepoliafaucet.com](https://sepoliafaucet.com)
2. Set up Hardhat with an Infura endpoint from [MetaMask Dev Docs](https://developer.metamask.io)
3. Followed [this guide](https://www.opcito.com/blogs/a-step-by-step-guide-for-smart-contract-deployment-using-hardhat)
4. Verified contract using [sepolia.etherscan.io](https://sepolia.etherscan.io)

## Quick Start

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

## Resources Used

- Sepolia Faucet

- Sepolia Etherscan

- Infura (MetaMask)

- Opcito Deployment Guide
