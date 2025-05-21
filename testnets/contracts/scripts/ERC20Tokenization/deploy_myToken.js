const hre = require("hardhat")

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // using env or CLI args
    const tokenName = process.env.TOKEN_NAME || "AliceCoin";
    const tokenSymbol = process.env.TOKEN_SYMBOL || "ALC";
    const tokenDecimals = 18;

    console.log(`Deploying ${tokenName} (${tokenSymbol}) with account:`, deployer.address);

    const Token = await hre.ethers.getContractFactory("MyToken");
    const token = await Token.deploy(tokenName, tokenSymbol, tokenDecimals);

    await token.waitForDeployment();

    console.log(`${tokenName} deployed to address:`, await token.getAddress());
}

main().catch((error)=> {
    console.error(error);
    process.exit(1);
});