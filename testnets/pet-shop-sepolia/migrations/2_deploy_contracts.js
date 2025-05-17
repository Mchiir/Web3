// Import the compiled contract artifact for the Adoption contract.
// `artifacts.require()` loads the contract's ABI and bytecode, making it available for deployment.
var Adoption = artifacts.require("Adoption");

// Export a deployment function to be run by Truffle.
// Truffle will automatically call this function when running `truffle migrate`.
module.exports = function (deployer) {

    // Use Truffle's deployer to deploy the Adoption contract to the blockchain.
    // This will deploy the contract to the current network specified in truffle-config.js
    deployer.deploy(Adoption);
};