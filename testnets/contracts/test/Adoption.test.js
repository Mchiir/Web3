const { expect } = require("chai");
const hre = require("hardhat");

describe("Adoption contract", function () {
  let adoption;
  let deployer, addr1;

  beforeEach(async function () {
    [deployer, addr1] = await hre.ethers.getSigners();

    // Correct deployment using ethers.getContractFactory
    const Adoption = await hre.ethers.getContractFactory("Adoption");
    adoption = await Adoption.deploy();
    await adoption.deployed();
  });

  it("Should allow a user to adopt a pet", async function () {
    const petId = 5;
    await adoption.connect(addr1).adopt(petId);
    expect(await adoption.adopters(petId)).to.equal(addr1.address);
  });

  it("Should not allow adopting a pet twice", async function () {
    const petId = 3;
    await adoption.connect(addr1).adopt(petId);
    await expect(adoption.connect(deployer).adopt(petId))
      .to.be.revertedWith("Pet already adopted");
  });

  it("Should allow the adopter to unadopt a pet", async function () {
    const petId = 7;
    await adoption.connect(addr1).adopt(petId);
    await adoption.connect(addr1).unadopt(petId);
    expect(await adoption.adopters(petId)).to.equal(hre.ethers.constants.AddressZero);
  });

  it("Should not allow unadopt if not the adopter", async function () {
    const petId = 9;
    await adoption.connect(addr1).adopt(petId);
    await expect(adoption.connect(deployer).unadopt(petId))
      .to.be.revertedWith("You are not the adopter");
  });
});