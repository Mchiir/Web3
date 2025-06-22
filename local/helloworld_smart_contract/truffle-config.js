module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Ganache or local blockchain port
      network_id: "*",       // Match any network id
    },
  },

  compilers: {
    solc: {
      version: "0.5.1",       // Match your Solidity version
    }
  },
  contracts_build_directory: "./src/abis", // Directory for compiled contracts
}