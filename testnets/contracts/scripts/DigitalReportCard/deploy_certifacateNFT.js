const hre = require("hardhat")

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log(`Deploying CertificateNFT contract with account:`, deployer.address);

    const CertificateNFT = await hre.ethers.getContractFactory("CertificateNFT");
    const certificateNFT = await CertificateNFT.deploy();
    // await certificateNFT.deployed();

    await certificateNFT.waitForDeployment();

    console.log(`Contract deployed to address:`, await certificateNFT.getAddress());
}

main().catch((error)=> {
    console.error(error);
    process.exit(1);
});