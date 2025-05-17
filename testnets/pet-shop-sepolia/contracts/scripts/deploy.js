const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Adoption = await hre.ethers.getContractFactory("Adoption");
  const adoption = await Adoption.deploy();

  await adoption.waitForDeployment();
  console.log("Contract deployed to address:", await adoption.getAddress());
  
  // Verify contract (optional)
  // await hre.run("verify:verify", {
  //   address: await adoption.getAddress(),
  //   constructorArguments: [],
  // });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });