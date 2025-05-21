require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const getPrivateKeys = () => {
  const role = process.env.ROLE || "";
  if (role === "alice") return [process.env.ALICE_PRIVATE_KEY].filter(Boolean);
  if (role === "bob") return [process.env.BOB_PRIVATE_KEY].filter(Boolean);
  if (role === "") return [process.env.GENERAL_PRIVATE_KEY].filter(Boolean);
  return [];
};

module.exports = {
  solidity: {
    version: "0.8.28", // Match your preferred version within pragma range
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: getPrivateKeys() // Remove 0x prefix if your key already has it
    }
  }
};