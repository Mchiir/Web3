require('dotenv').config(); // Load environment variables from .env file
const HDWalletProvider = require('@truffle/hdwallet-provider'); // Import HDWalletProvider for managing accounts

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost
      port: 8545,            // Ganache or local blockchain port
      network_id: "*",       // Match any network id
    },
    ganache_cli: {
      host: "127.0.0.1",     // Localhost
      port: 8545,            // Ganache or local blockchain port
      network_id: "*",       // Match any network id
    },
    ganache_ui: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Ganache or local blockchain port
      network_id: "*",       // Match any network id
    },
    sepolia: {
      provider: () => new HDWalletProvider(
        [process.env.PRIVATE_KEY], // Use your private key from .env
        process.env.SEPOLIA_RPC_URL // Use your Sepolia RPC URL from .env
      ),
      network_id: 11155111, // Sepolia's network ID
      gas: 4465030,         // Gas limit for transactions
      gasPrice: 10000000000, // 10 Gwei (adjust as needed
      confirmations: 2,     // Number of confirmations to wait between deployments
      timeoutBlocks: 200,   // Number of blocks before a deployment times out
    }
  },

  compilers: {
    solc: {
      version: "0.5.1",       // Match your Solidity version
    }
  },
  contracts_build_directory: "./src/abis", // Directory for compiled contracts
}