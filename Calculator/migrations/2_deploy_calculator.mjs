const CalculatorWithMessage = artifacts.require("Calculator")

module.exports = function (deployer) {
    deployer.deploy(CalculatorWithMessage)
}