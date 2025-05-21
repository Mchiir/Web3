const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const token1 = "0xAliceCoinAddress";
  const owner1 = "0xAliceAddress";
  const amount1 = hre.ethers.parseUnits("10", 18);

  const token2 = "0xBobCoinAddress";
  const owner2 = "0xBobAddress";
  const amount2 = hre.ethers.parseUnits("20", 18);

  const TokenSwap = await hre.ethers.getContractFactory("TokenSwap");
  const tokenSwap = await TokenSwap.deploy(token1, owner1, amount1, token2, owner2, amount2);

  await tokenSwap.waitForDeployment();
  console.log("TokenSwap deployed to:", await tokenSwap.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});