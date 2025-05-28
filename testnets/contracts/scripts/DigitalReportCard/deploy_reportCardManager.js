const hre = require("hardhat")

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log(`Deploying ReportCardManager contract with account:`, deployer.address);

    const certificateNFTAddress = "0xfbEB7147E22420F986B1738cBD9aC570cEdf81fb";

    const ReportCardManager = await ethers.getContractFactory("ReportCardManager");
    const reportManager = await ReportCardManager.deploy(certificateNFTAddress);
    // await reportManager.deployed();

    await reportManager.waitForDeployment();

    console.log(`Contract deployed to address:`, await reportManager.getAddress());
}

main().catch((error)=> {
    console.error(error);
    process.exit(1);
});